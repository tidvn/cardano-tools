'use client';
import dynamic from 'next/dynamic';
const SubmitOnly = dynamic(() => import('@/components/app/home/only-submit-form'), {
    loading: () => <p>Loading...</p>,
});
const SignAndSubmit = dynamic(() => import('@/components/app/home/sign-and-submit-form'), {
    loading: () => <p>Loading...</p>,
});

export default function Page() {
    return (
        <>
            <div className="mb-2">
                <p className="text-lg font-bold">Sign and Submit</p>
                <SignAndSubmit />
            </div>
            <div className="mb-2">
                <p className="text-lg font-bold">Submit Only</p>
                <SubmitOnly />
            </div>
        </>
    );
}
