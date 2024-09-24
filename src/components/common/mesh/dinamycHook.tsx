/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { isNil } from 'lodash';
// import { someAction } from "@/actions/meshServer";
import { useEffect, useState } from 'react';
import Loading from '@/components/common/loading';

export const DynamicHookComponent = () => {
    const [useWalletHook, setUseWalletHook] = useState<any>(null);

    useEffect(() => {
        const loadHook = async () => {
            try {
                const { useWallet } = await import('@meshsdk/react');
                const { BrowserWallet } = await import('@meshsdk/core');
                setUseWalletHook(() => useWallet);
                const wallet = await BrowserWallet.enable('eternl');
                const balance = await wallet.getBalance();
                console.log('balance', balance);
                // await someAction();
            } catch (error) {
                console.error('Error loading hook:', error);
            }
        };

        loadHook();
    }, []);

    if (isNil(useWalletHook)) {
        return <Loading />;
    }

    const result = useWalletHook();
    return (
        <div>
            <div>Hook Result: {result.connected.toString()}</div>
        </div>
    );
};
