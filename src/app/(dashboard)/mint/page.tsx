'use client';
import dynamic from 'next/dynamic';
const MintForm = dynamic(() => import('@/components/app/mint/mint-form'), {
    loading: () => <p>Loading...</p>,
});

export default function Page() {
    return (
        <>
            <div className="mb-2">
                <p className="text-lg font-bold">Mint NFT</p>
                <MintForm />
            </div>
        </>
    );
}
