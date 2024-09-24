'use client';

import { cn } from '@/utils';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { Sidebar } from './sidebar';
import { Footer } from './footer';
import { Navbar } from './navbar';

export default function DesktopDashboardlLayout({ children }: { children: React.ReactNode }) {
    const sidebar = useSidebarToggle();

    if (!sidebar) return null;

    return (
        <>
            <Sidebar />
            <main
                className={cn(
                    'min-h-[calc(100vh_-_56px)] transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900',
                    sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-[300px]',
                )}
            >
                <Navbar />
                <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
            </main>
            <footer
                className={cn(
                    'transition-[margin-left] duration-300 ease-in-out',
                    sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-[300px]',
                )}
            >
                <Footer />
            </footer>
        </>
    );
}
