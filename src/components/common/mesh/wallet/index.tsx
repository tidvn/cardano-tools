/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import Loading from '@/components/common/loading';
import { isNil } from 'lodash';

export const Wallet = () => {
    const [Wallet, setWallet] = useState<any>(null!);
    useEffect(() => {
        (async () => {
            try {
                const { CardanoWallet } = await import('./wallet-connect');
                setWallet(() => CardanoWallet);
            } catch (error) {
                console.error('Error importing MeshProvider:', error);
            }
        })();
    }, [setWallet]);

    if (isNil(Wallet)) {
        return <Loading />;
    }
    return <Wallet />;
};
