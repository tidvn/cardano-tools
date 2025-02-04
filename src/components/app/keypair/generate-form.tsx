/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { CopyIcon } from '@radix-ui/react-icons';
import * as bip39 from 'bip39';
import * as crypto from 'crypto';
import { toast } from '@/hooks/use-toast';
import { BlockfrostProvider, MeshWallet } from '@meshsdk/core';

const GenerateForm = ({ blockfrostkey }: any) => {
    const blockchainProvider = new BlockfrostProvider(blockfrostkey);

    const [result, setResult] = useState<{
        entropyByte: string;
        entropyHex: string;
        mnemonic: string;
        address: string[];
        utxos: any;
    }>({
        entropyByte: '',
        entropyHex: '',
        mnemonic: '',
        address: [],
        utxos: [],
    });

    async function onSubmit() {
        const entropy = crypto.randomBytes(32);
        const binaryString = entropy.reduce((acc, byte) => {
            return acc + byte.toString(2).padStart(8, '0');
        }, '');
        const entropyHex = entropy.toString('hex');
        const mnemonic = bip39.entropyToMnemonic(entropyHex);

        const wallet = new MeshWallet({
            networkId: blockfrostkey.startsWith('mainnet') ? 1 : 0,
            fetcher: blockchainProvider,
            submitter: blockchainProvider,
            key: {
                type: 'mnemonic',
                words: mnemonic.split(' '),
            },
        });
        const usedAddresses = await wallet.getUsedAddresses();
        const utxos = await wallet.getUtxos();
        setResult({
            entropyByte: binaryString,
            entropyHex: entropyHex,
            mnemonic: mnemonic,
            address: usedAddresses,
            utxos: utxos,
        });
    }

    return (
        <div className="space-y-8">
            <Button onClick={onSubmit}>Generate</Button>
            <div className="flex items-center space-x-2 pt-4">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link">entropyByte</Label>
                    <Textarea id="entropyByte" value={result.entropyByte} readOnly />
                </div>
                <Button
                    onClick={async () => {
                        await navigator.clipboard.writeText(result.entropyByte);
                        toast({ title: 'Copied' });
                    }}
                    size="sm"
                    className="px-3"
                ></Button>
            </div>
            <div className="flex items-center space-x-2 pt-4">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link">entropyHex</Label>
                    <Input id="entropyHex" value={result.entropyHex} readOnly className="h-15" />
                </div>
                <Button
                    onClick={async () => {
                        await navigator.clipboard.writeText(result.entropyHex);
                        toast({ title: 'Copied' });
                    }}
                    size="sm"
                    className="px-3"
                >
                    <CopyIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex items-center space-x-2 pt-4">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link">mnemonic</Label>
                    <Textarea id="mnemonic" value={result.mnemonic} readOnly />
                </div>
                <Button
                    onClick={async () => {
                        await navigator.clipboard.writeText(result.mnemonic);
                        toast({ title: 'Copied' });
                    }}
                    size="sm"
                    className="px-3"
                >
                    <CopyIcon className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex items-center space-x-2 pt-4">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link">Wallet Address</Label>
                    <Textarea
                        id="walletAddress"
                        value={JSON.stringify(result.address)}
                        className="h-15"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-2 pt-4">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link">UTXOs</Label>
                    <Textarea
                        id="keypairJson"
                        value={JSON.stringify(result.utxos, null, 2)}
                        readOnly
                        className="min-h-[200px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default GenerateForm;
