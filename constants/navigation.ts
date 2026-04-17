export enum RouteName {
  DASHBOARD = 'index',
  INCIDENTS = 'incidents',
  REPORTS = 'reports',
  SETTINGS = 'settings',
}

export interface NavItem {
  id: RouteName;
  name: string;
  icon: string; // Ionicons glyph name
  href: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: RouteName.DASHBOARD,
    name: 'Dashboard',
    icon: 'shield-checkmark-outline',
    href: '/',
  },
  {
    id: RouteName.INCIDENTS,
    name: 'Incidents',
    icon: 'flash-outline',
    href: '/incidents',
  },
  {
    id: RouteName.REPORTS,
    name: 'Reports',
    icon: 'document-text-outline',
    href: '/reports',
  },
  {
    id: RouteName.SETTINGS,
    name: 'Settings',
    icon: 'settings-outline',
    href: '/settings',
  },
];
