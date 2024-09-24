import type { Metadata } from 'next';
import '@/styles/globals.css';
import { DM_Sans as FontSans } from 'next/font/google';
import { cn } from '@/utils';
import { PropsWithChildren } from 'react';
import Providers from '@/components/common/provider';
import { appConfig } from '@/constants';

export const metadata: Metadata = {
    title: appConfig.title,
    description: appConfig.description,
};

const fontSans = FontSans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-sans',
});

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en">
            <body className={cn(fontSans.variable)}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
