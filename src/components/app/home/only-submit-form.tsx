'use client';
import { useWallet } from '@meshsdk/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/styled/button';
import { useState } from 'react';

const FormSchema = z.object({
    signedTx: z.string(),
});

export default function SubmitOnly() {
    const { connected, wallet } = useWallet();
    const [txhash, setTxhash] = useState<string>('');

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!connected || !wallet) return;
        try {
            // const unsignedTx = data.unsignedTx;
            // const signedTx = await wallet.signTx(unsignedTx, true);
            const signedTx = data.signedTx;
            const txHash = await wallet.submitTx(signedTx);
            setTxhash(txHash);
            toast({
                title: 'Done',
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    name="signedTx"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea className="min-h-[200px] bg-slate-800" {...field} />
                            </FormControl>
                            <FormDescription>{txhash}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="bg-gradient" type="submit" disabled={!connected}>
                    Submit
                </Button>
            </form>
        </Form>
    );
}
