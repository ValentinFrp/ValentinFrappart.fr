import type { LucideIcon } from 'lucide-react';

export interface NavigationLink {
    name: string;
    id: string;
}

export interface SocialLink {
    icon: LucideIcon;
    href: string;
    label: string;
}