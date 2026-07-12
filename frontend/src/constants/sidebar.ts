import {
  LayoutDashboard,
  Truck,
  Users,
  Compass,
  Wrench,
  Fuel,
  CreditCard,
  BarChart3,
  Settings,
  User,
  Bell,
} from 'lucide-react';

export interface SidebarItem {
  title: string;
  href: string;
  icon: any; // LucideIcon type
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Vehicles',
    href: '/vehicles',
    icon: Truck,
  },
  {
    title: 'Drivers',
    href: '/drivers',
    icon: Users,
  },
  {
    title: 'Trips & Routes',
    href: '/trips',
    icon: Compass,
  },
  {
    title: 'Maintenance',
    href: '/maintenance',
    icon: Wrench,
  },
  {
    title: 'Fuel Logs',
    href: '/fuel',
    icon: Fuel,
  },
  {
    title: 'Expenses',
    href: '/expenses',
    icon: CreditCard,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3,
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];
