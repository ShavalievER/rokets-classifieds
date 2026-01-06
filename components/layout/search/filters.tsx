'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAllSubcategories } from 'lib/demo/categories';
import { SELLERS } from 'lib/demo/sellers';
import { sorting, defaultSort } from 'lib/constants';

type FilterState = {
  subcategory: string;
  minPrice: string;
  maxPrice: string;
  keywords: string;
  location: string;
  sort: string;
};

export default function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    subcategory: searchParams.get('subcategory') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    keywords: searchParams.get('keywords') || '',
    location: searchParams.get('location') || '',
    sort: searchParams.get('sort') || defaultSort.slug || ''
  });

  const subcategories = getAllSubcategories();
  const locations = Array.from(new Set(SELLERS.map(s => s.location))).sort();

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.subcategory) params.set('subcategory', filters.subcategory);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.keywords) params.set('keywords', filters.keywords);
    if (filters.location) params.set('location', filters.location);
    if (filters.sort && filters.sort !== (defaultSort.slug || '')) params.set('sort', filters.sort);

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      subcategory: '',
      minPrice: '',
      maxPrice: '',
      keywords: '',
      location: '',
      sort: defaultSort.slug || ''
    });
    router.push(pathname);
  };

  const hasActiveFilters = filters.subcategory || filters.minPrice || filters.maxPrice || filters.keywords || filters.location || (filters.sort && filters.sort !== (defaultSort.slug || ''));

  return (
    <div className="mb-4 border-b border-neutral-200 pb-4 dark:border-neutral-700">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
        >
          <svg className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
              {[
                filters.subcategory, 
                filters.minPrice, 
                filters.maxPrice, 
                filters.keywords, 
                filters.location,
                filters.sort && filters.sort !== (defaultSort.slug || '') ? filters.sort : null
              ].filter(Boolean).length}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Clear all
          </button>
        )}
      </div>

      {isOpen && (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Sort Filter */}
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Sort By
            </label>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
            >
              {sorting.map((item) => (
                <option key={item.slug || 'default'} value={item.slug || ''}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Subcategory
            </label>
            <select
              value={filters.subcategory}
              onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
            >
              <option value="">All Subcategories</option>
              {subcategories.map((sub) => (
                <option key={`${sub.parentHandle}-${sub.handle}`} value={sub.handle}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Price Range (AED)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
              />
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Keywords
            </label>
            <input
              type="text"
              placeholder="Search keywords..."
              value={filters.keywords}
              onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Seller Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={applyFilters}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}

