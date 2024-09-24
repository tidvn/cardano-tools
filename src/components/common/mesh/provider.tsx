'use client';

import Loading from '@/components/common/loading';
import { isNil } from 'lodash';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import '@meshsdk/react/styles.css';

export const MeshProvider = ({ children }: PropsWithChildren) => {
    const [MeshProviderState, setMeshProviderState] = useState<
        FC<{
            children: React.ReactNode;
        }>
    >(null!);
    useEffect(() => {
        const run = async () => {
            try {
                const { MeshProvider } = await import('@meshsdk/react');
                setMeshProviderState(() => MeshProvider);
            } catch (error) {
                console.error('Error importing MeshProvider:', error);
            }
        };
        run();
    }, [setMeshProviderState]);

    if (isNil(MeshProviderState)) {
        return <Loading />;
    }
    return <MeshProviderState>{children}</MeshProviderState>;
};
