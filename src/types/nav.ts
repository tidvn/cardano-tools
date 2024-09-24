import { Icons } from '@/components/common/icons';

export interface NavItem {
    title: string;
    href: string;
    disabled: boolean;
    icon?: keyof typeof Icons;
}
