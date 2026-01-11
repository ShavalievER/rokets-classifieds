import { getCollections, getPages, getProducts } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { MetadataRoute } from 'next';

type Route = {
  url: string;
  lastModified: string;
};

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Note: validateEnvironmentVariables() is not called here
  // because the project works in demo mode without Shopify variables

  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt
    }))
  );

  // getPages() may fail in demo mode, so we catch the error
  const pagesPromise = getPages()
    .then((pages) =>
      pages.map((page) => ({
        url: `${baseUrl}/${page.handle}`,
        lastModified: page.updatedAt
      }))
    )
    .catch(() => []); // Return empty array if getPages fails (demo mode)

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise])
    ).flat();
  } catch (error) {
    // In demo mode, some functions may fail, so we return at least the base routes
    console.error('Error generating sitemap:', error);
    return routesMap;
  }

  return [...routesMap, ...fetchedRoutes];
}
