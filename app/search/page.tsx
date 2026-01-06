import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import Pagination from 'components/layout/pagination';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';
import { Suspense } from 'react';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

const ITEMS_PER_PAGE = 24;

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue, page } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  // Get current page (default to 1)
  const currentPage = page ? parseInt(page, 10) : 1;
  const validPage = currentPage > 0 && !isNaN(currentPage) ? currentPage : 1;

  // Get all products
  const allProducts = await getProducts({ sortKey, reverse, query: searchValue });
  
  // Calculate pagination
  const totalItems = allProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  
  // Ensure valid page is within bounds
  const finalPage = Math.min(Math.max(1, validPage), totalPages);
  
  const startIndex = (finalPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  const resultsText = totalItems !== 1 ? 'results' : 'result';

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          {searchValue ? `Search Results` : 'All Categories'}
        </h1>
        {searchValue ? (
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {totalItems === 0
              ? `No results found for "${searchValue}"`
              : `${totalItems} ${resultsText} found for "${searchValue}"`}
          </p>
        ) : (
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {totalItems} {totalItems !== 1 ? 'listings' : 'listing'} available
          </p>
        )}
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProductGridItems products={paginatedProducts} />
          </Grid>
          
          {/* Pagination */}
          <Suspense fallback={null}>
            <Pagination
              currentPage={finalPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </Suspense>
        </>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-neutral-600 dark:text-neutral-400">No listings found</p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
            {searchValue
              ? 'Try adjusting your search terms'
              : 'Try adjusting your filters or browse categories'}
          </p>
        </div>
      )}
    </>
  );
}
