/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useWallet } from '@meshsdk/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/styled/button';
import { useState } from 'react';
import { AssetMetadata, ForgeScript, Mint, Transaction } from '@meshsdk/core';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
    assetName: z.string(),
    metadata: z.string(),
});

export default function MintForm() {
    const { connected, wallet } = useWallet();
    const [txhash, setTxhash] = useState<string>('');

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            metadata: JSON.stringify(
                {
                    name: 'Mesh Token',
                    image: 'ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua',
                    mediaType: 'image/jpg',
                    description: 'This NFT was minted by Mesh (https://meshjs.dev/).',
                },
                null,
                2,
            ),
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!connected || !wallet) return;
        try {
            const metadataInput = JSON.parse(data.metadata);
            const address = (await wallet.getUsedAddresses())[0];
            const forgingScript = ForgeScript.withOneSignature(address);
            const assetMetadata: AssetMetadata = metadataInput;

            const asset: Mint = {
                assetName: data.assetName,
                assetQuantity: '1',
                metadata: assetMetadata,
                label: '721',
                recipient: address,
            };
            const tx = new Transaction({ initiator: wallet });
            tx.mintAsset(forgingScript, asset);

            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            const txHash = await wallet.submitTx(signedTx);
            setTxhash(txHash);
        } catch (e: any) {
            toast({
                title: 'Error',
                description: e.message,
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="assetName"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>assetName</FormLabel> */}
                            <FormControl>
                                <Input placeholder="assetName" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="metadata"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                {/* <FormLabel>metadata</FormLabel> */}
                                <Textarea
                                    placeholder="metadata"
                                    className="min-h-[200px] bg-slate-800"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="bg-gradient" type="submit" disabled={!connected}>
                    Submit
                </Button>
                {txhash}
            </form>
        </Form>
    );
}
