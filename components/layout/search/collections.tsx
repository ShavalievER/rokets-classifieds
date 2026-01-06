'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CATEGORY_STRUCTURE } from 'lib/demo/categories';

function CategoryList() {
  const pathname = usePathname();
  const currentPath = pathname.split('/').filter(Boolean);
  const currentCategory = currentPath[1];
  const currentSubcategory = currentPath[2];

  return (
    <div className="space-y-1">
      <div className="mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
        Categories
      </div>
      {CATEGORY_STRUCTURE.map((category) => {
        const isCategoryActive = currentCategory === category.handle;
        const hasActiveSubcategory = isCategoryActive && currentSubcategory;
        
        return (
          <div key={category.id} className="space-y-1">
            <Link
              href={`/search/${category.handle}`}
              className={clsx(
                'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isCategoryActive && !hasActiveSubcategory
                  ? 'bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
              )}
            >
              {category.name}
            </Link>
            
            {/* Show subcategories when category is active */}
            {isCategoryActive && category.subcategories && category.subcategories.length > 0 && (
              <div className="ml-4 space-y-1 border-l border-neutral-200 pl-3 dark:border-neutral-700">
                {category.subcategories.map((sub) => {
                  const isSubcategoryActive = currentSubcategory === sub.handle;
                  return (
                    <Link
                      key={`${category.id}-${sub.id}`}
                      href={`/search/${category.handle}/${sub.handle}`}
                      className={clsx(
                        'block rounded-lg px-3 py-1.5 text-xs transition-colors',
                        isSubcategoryActive
                          ? 'bg-blue-50 font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                      )}
                    >
                      {sub.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded-sm';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function Collections() {
  return (
    <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
      <CategoryList />
    </div>
  );
}
