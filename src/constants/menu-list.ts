import { NavItem } from '@/types';

export const mainMenu: NavItem[] = [
    {
        title: 'Sign And Sumbit',
        href: '/',
        icon: 'dashboard',
        disabled: false,
    },
    {
        title: 'Mint',
        href: '/mint',
        icon: 'user',
        disabled: false,
    },
    {
        title: 'KeyPair',
        href: '/keypair',
        icon: 'employee',
        disabled: false,
    },
];
export const expandMenu: NavItem[] = [
    {
        title: 'Profile',
        href: '/profile',
        icon: 'profile',
        disabled: false,
    },
    {
        title: 'Kanban',
        href: '/kanban',
        icon: 'kanban',
        disabled: false,
    },
    {
        title: 'Login',
        href: '/',
        icon: 'login',
        disabled: false,
    },
];
