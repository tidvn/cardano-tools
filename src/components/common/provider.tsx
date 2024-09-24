'use client';
import { PropsWithChildren } from 'react';
import { MeshProvider } from '@/components/common/mesh/provider';
import { Toaster } from '../ui/toaster';

export default function AppProviders({ children }: Readonly<PropsWithChildren>) {
    return (
        <>
            <Toaster />
            <MeshProvider>{children}</MeshProvider>
        </>
    );
}
