/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { SunIcon } from '@radix-ui/react-icons';
import * as bip39 from 'bip39';
import { BlockfrostProvider, MeshWallet } from '@meshsdk/core';

const ConvertForm = ({ blockfrostkey }: any) => {
    const blockchainProvider = new BlockfrostProvider(blockfrostkey);

    const [wallet, setWallet] = useState<{
        walletAddress: string[];
        utxos: any[];
    }>({
        walletAddress: [],
        utxos: [],
    });
    const [error, setError] = useState('');

    const [input, setInput] = useState({
        entropyByte: '',
        entropyHex: '',
        mnemonic: '',
    });
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    async function onSubmit(name: string, value: string) {
        try {
            let entropyByte = '';
            let entropyHex = '';
            let mnemonic = '';
            if (name == 'entropyByte') {
                entropyByte = value;
                entropyHex = BigInt(`0b${value}`).toString(16);
                mnemonic = bip39.entropyToMnemonic(entropyHex);
            } else if (name == 'entropyHex') {
                entropyByte = BigInt(`0x${value}`).toString(2);
                entropyHex = value;
                mnemonic = bip39.entropyToMnemonic(entropyHex);
            } else if (name == 'mnemonic') {
                entropyHex = bip39.mnemonicToEntropy(value);
                entropyByte = BigInt(`0x${entropyHex}`).toString(2);
                mnemonic = value;
            }

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
            setInput({
                entropyByte: entropyByte,
                entropyHex: entropyHex,
                mnemonic: mnemonic,
            });
            setWallet({
                walletAddress: usedAddresses,
                utxos: utxos,
            });
        } catch (e: any) {
            setError(e.message);
        }
    }

    return (
        <>
            {error}
            <div className="space-y-8">
                <div className="flex items-center space-x-2 pt-4">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link">entropyByte</Label>
                        <Textarea
                            id="entropyByte"
                            name="entropyByte"
                            value={input.entropyByte}
                            onChange={handleChange}
                        />
                    </div>
                    <Button
                        onClick={() => onSubmit('entropyByte', input.entropyByte)}
                        size="sm"
                        className="px-3"
                    >
                        <SunIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link">entropyHex</Label>
                        <Input
                            id="entropyHex"
                            name="entropyHex"
                            value={input.entropyHex}
                            onChange={handleChange}
                            className="h-15"
                        />
                    </div>
                    <Button
                        onClick={() => onSubmit('entropyHex', input.entropyHex)}
                        size="sm"
                        className="px-3"
                    >
                        <SunIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link">mnemonic</Label>
                        <Textarea
                            id="mnemonic"
                            name="mnemonic"
                            value={input.mnemonic}
                            onChange={handleChange}
                        />
                    </div>
                    <Button
                        onClick={() => onSubmit('mnemonic', input.mnemonic)}
                        size="sm"
                        className="px-3"
                    >
                        <SunIcon className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link">address</Label>
                        <Input
                            id="publicKey"
                            value={JSON.stringify(wallet.walletAddress, null, 2)}
                            readOnly
                            className="h-15"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link">UTXOs</Label>
                        <Textarea
                            id="keypairJson"
                            value={JSON.stringify(wallet.utxos, null, 2)}
                            readOnly
                            className="min-h-[200px]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConvertForm;
