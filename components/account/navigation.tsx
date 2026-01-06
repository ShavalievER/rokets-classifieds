'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

const navigationItems = [
  { id: 'profile', label: 'Profile Settings', href: '#profile' },
  { id: 'addresses', label: 'Delivery Addresses', href: '#addresses' },
  { id: 'payments', label: 'Payment Methods', href: '#payments' }
];

export default function AccountNavigation() {
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    // Set initial hash
    setActiveHash(window.location.hash || '#profile');

    // Update on hash change
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#profile');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => {
        const isActive = activeHash === item.href;
        return (
          <a
            key={item.id}
            href={item.href}
            onClick={() => setActiveHash(item.href)}
            className={clsx(
              'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

