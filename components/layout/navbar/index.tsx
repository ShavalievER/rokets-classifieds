import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between gap-4 p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center gap-4">
        {/* Logo - fixed width on the left */}
        <Link
          href="/"
          prefetch={true}
          className="flex shrink-0 items-center"
        >
          <LogoSquare />
          <div className="ml-2 hidden text-sm font-medium uppercase lg:block">
            {SITE_NAME}
          </div>
        </Link>
        
        {/* Categories - shifted to the right */}
        {menu.length ? (
          <div className="hidden flex-1 overflow-x-auto md:block ml-4">
            <ul className="flex gap-4 text-sm md:gap-6 lg:gap-8">
              {menu.map((item: Menu) => (
                <li key={item.title} className="shrink-0">
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="whitespace-nowrap text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        
        {/* Search - moved to the right */}
        <div className="hidden shrink-0 md:flex md:w-64 lg:w-80">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        
        {/* Account, Orders and Cart - right side */}
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/account"
            prefetch={true}
            className="flex items-center justify-center rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
            aria-label="Account"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </Link>
          <Link
            href="/orders"
            prefetch={true}
            className="flex items-center justify-center rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
            aria-label="Orders"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h4.125M8.25 8.25l2.25-2.25m0 0l2.25 2.25m-2.25-2.25v11.25"
              />
            </svg>
          </Link>
          <Suspense fallback={null}>
            <CartModal />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
