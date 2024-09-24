'use server';

import { ApplicationBlockfrostProvider } from './blockfrost';

export const getAssetsByAddress = async (address: string) => {
    const BLOCKFROST_API = process.env.BLOCKFROST_API!;
    const blockchainProvider = new ApplicationBlockfrostProvider(BLOCKFROST_API);
    return await blockchainProvider.fetchAssetsByAddress(address);
};
