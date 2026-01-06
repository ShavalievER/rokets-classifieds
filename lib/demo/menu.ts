import type { Menu } from 'lib/shopify/types';

/**
 * Demo menu for navigation (header and footer)
 */

import { CATEGORY_STRUCTURE } from './categories';

export const DEMO_HEADER_MENU: Menu[] = [
  {
    title: 'All Categories',
    path: '/search'
  },
  ...CATEGORY_STRUCTURE.map(category => ({
    title: category.name,
    path: `/search/${category.handle}`
  }))
];

export const DEMO_FOOTER_MENU: Menu[] = [
  {
    title: 'About',
    path: '/about'
  },
  {
    title: 'Terms',
    path: '/terms'
  },
  {
    title: 'Shipping',
    path: '/shipping'
  },
  {
    title: 'Privacy',
    path: '/privacy'
  },
  {
    title: 'Returns',
    path: '/returns'
  },
  {
    title: 'FAQ',
    path: '/faq'
  }
];

/**
 * Get demo menu by handle
 */
export function getDemoMenu(handle: string): Menu[] {
  if (handle === 'next-js-frontend-header-menu') {
    return DEMO_HEADER_MENU;
  }
  if (handle === 'next-js-frontend-footer-menu') {
    return DEMO_FOOTER_MENU;
  }
  return [];
}

