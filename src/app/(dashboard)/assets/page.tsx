'use client';
import { getAssetsByAddress } from '@/actions/getAssets';
import { Button } from '@/components/styled/button';
import { Asset, ForgeScript, Transaction } from '@meshsdk/core';
import { useWallet } from '@meshsdk/react';
import { isNil } from 'lodash';
import { useEffect, useState } from 'react';
export default function Page() {
    const { wallet } = useWallet();
    const [assets, setAssets] = useState<Asset[]>();
    useEffect(() => {
        if (isNil(wallet)) return;
        (async () => {
            const usedAddress = await wallet.getUsedAddresses()!;
            const address = usedAddress[0];
            getAssetsByAddress(address).then((assets) => {
                setAssets(assets);
            });
        })();
    }, [wallet]);

    const burnAsset = async (asset: Asset) => {
        if (!wallet) return;
        const usedAddress = await wallet.getUsedAddresses();
        const address = usedAddress[0];
        const forgingScript = ForgeScript.withOneSignature(address);
        const tx = new Transaction({ initiator: wallet });
        tx.burnAsset(forgingScript, asset);
        tx.sendLovelace(forgingScript, '1_000_000');
        tx.burnAsset(forgingScript, asset);
        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        console.log(txHash);
    };
    return (
        <>
            {assets?.map((asset: Asset) => (
                <div key={asset.unit}>
                    <div>{asset.unit}</div>
                    <div>{asset.quantity}</div>
                    <Button onClick={() => burnAsset(asset)}>Burn</Button>
                </div>
            ))}
        </>
    );
}
