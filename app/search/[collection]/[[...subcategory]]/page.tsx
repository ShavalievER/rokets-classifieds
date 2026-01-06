import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryByHandle, getSubcategoryByHandle } from 'lib/demo/categories';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import Pagination from 'components/layout/pagination';
import Filters from 'components/layout/search/filters';
import { defaultSort, sorting } from 'lib/constants';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ collection: string; subcategory?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);
  const subcategoryHandle = params.subcategory?.[0];

  if (!collection) return notFound();

  let title = collection.seo?.title || collection.title;
  let description = collection.seo?.description || collection.description;

  if (subcategoryHandle) {
    const category = getCategoryByHandle(params.collection);
    const subcategory = getSubcategoryByHandle(params.collection, subcategoryHandle);
    if (subcategory) {
      title = subcategory.name;
      description = `${subcategory.name} in ${category?.name || ''}`;
    }
  }

  return {
    title,
    description: description || `${title} listings`
  };
}

const ITEMS_PER_PAGE = 24;

export default async function CategoryPage(props: {
  params: Promise<{ collection: string; subcategory?: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const subcategoryHandle = params.subcategory?.[0];
  
  const { sort, subcategory: filterSubcategory, minPrice, maxPrice, keywords, location, page } = searchParams as { 
    [key: string]: string;
  };
  
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  
  // Get current page (default to 1)
  const currentPage = page ? parseInt(page, 10) : 1;
  const validPage = currentPage > 0 && !isNaN(currentPage) ? currentPage : 1;
  
  // Determine collection handle (subcategory takes priority)
  const collectionHandle = subcategoryHandle || params.collection;
  
  // Get all products with filters
  const allProducts = await getCollectionProducts({ 
    collection: collectionHandle, 
    sortKey, 
    reverse,
    filters: {
      subcategory: filterSubcategory,
      minPrice,
      maxPrice,
      keywords,
      location
    }
  });
  
  // Calculate pagination
  const totalItems = allProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const finalPage = Math.min(Math.max(1, validPage), totalPages);
  
  const startIndex = (finalPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  const category = getCategoryByHandle(params.collection);
  const subcategory = subcategoryHandle ? getSubcategoryByHandle(params.collection, subcategoryHandle) : null;

  return (
    <section>
      {/* Category Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          {subcategory ? subcategory.name : category?.name || 'Category'}
        </h1>
        {subcategory && category && (
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {category.name} &gt; {subcategory.name}
          </p>
        )}
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {totalItems} {totalItems === 1 ? 'listing' : 'listings'} found
        </p>
      </div>

      {/* Filters */}
      <Filters />

      {/* Products Grid */}
      {paginatedProducts.length === 0 ? (
        <div className="mt-8 py-12 text-center">
          <p className="text-lg text-neutral-600 dark:text-neutral-400">No listings found</p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
            Try adjusting your filters or browse other categories
          </p>
        </div>
      ) : (
        <>
          <Grid className="mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      )}
    </section>
  );
}

