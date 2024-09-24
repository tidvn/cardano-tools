'use client';
import DesktopDashboardlLayout from '@/components/common/layout/DesktopDashboard';
import MobileDashboardlLayout from '@/components/common/layout/MobileDashboard';
import useWindowSize from '@/hooks/useWindowSize';
import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
    const isMobile: boolean = useWindowSize();
    const Layout = isMobile ? MobileDashboardlLayout : DesktopDashboardlLayout;
    return <Layout>{children}</Layout>;
}
