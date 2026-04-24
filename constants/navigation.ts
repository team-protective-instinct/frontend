export enum RouteName {
  OVERVIEW = 'index',
  INCIDENTS = 'incidents',
  ASSETS = 'assets',
  PLAYBOOKS = 'playbooks',
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
    id: RouteName.OVERVIEW,
    name: 'Overview',
    icon: 'grid-outline',
    href: '/',
  },
  {
    id: RouteName.INCIDENTS,
    name: 'Incidents',
    icon: 'alert-circle-outline',
    href: '/incidents',
  },
  {
    id: RouteName.ASSETS,
    name: 'Assets',
    icon: 'server-outline',
    href: '/assets',
  },
  {
    id: RouteName.PLAYBOOKS,
    name: 'Playbooks',
    icon: 'book-outline',
    href: '/playbooks',
  },
];

export const SETTINGS_NAV_ITEM: NavItem = {
  id: RouteName.SETTINGS,
  name: 'Settings',
  icon: 'settings-outline',
  href: '/settings',
};
