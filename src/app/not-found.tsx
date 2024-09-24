/* eslint-disable react/no-unescaped-entities */
'use client';
import Link from 'next/link';
import { Button } from '@/components/styled/button';

const Page404 = () => {
    return (
        <div className="flex flex-col-reverse items-center justify-center gap-16 px-4 py-24 md:gap-28 md:px-44 md:py-20 lg:flex-row lg:px-24 lg:py-24">
            <div className="relative w-full pb-12 lg:pb-0 xl:w-1/2 xl:pt-24">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <Link href="/">
                                <Button color="blue" className="mt-8 bg-primary text-white">
                                    Take me home
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-9xl font-bold text-gray-300">404</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page404;
