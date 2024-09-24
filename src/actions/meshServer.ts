'use server';

import { BlockfrostProvider } from '@meshsdk/core';
import { MeshWallet } from '@meshsdk/core';

export const someAction = async () => {
    const BLOCKFROST_API = process.env.BLOCKFROST_API!;

    const blockchainProvider = new BlockfrostProvider(BLOCKFROST_API);

    const wallet = new MeshWallet({
        networkId: 0, // 0: testnet, 1: mainnet
        fetcher: blockchainProvider,
        submitter: blockchainProvider,
        key: {
            type: 'mnemonic',
            words: [
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
                'solution',
            ],
        },
    });

    const address = wallet.getChangeAddress();
    console.log(address);
};
