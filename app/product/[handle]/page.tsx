import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

import DeliveryWidget from 'components/rockets/DeliveryWidget';
import SellerCard from 'components/p2p/seller-card';
import MessageWidget from 'components/p2p/message-widget';
import { getSellerIdForHandle } from 'lib/demo/listing-sellers';

import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import type { Image } from 'lib/shopify/types';
import { getDemoProducts } from 'lib/demo/products';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const products = getDemoProducts();
  return products.map((product) => ({
    handle: product.handle
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  // P2P seller mapping for demo
  const sellerId = getSellerIdForHandle(params.handle);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          {/* Left Column - Images and Product Info */}
          <div className="flex-1">
            {/* Gallery - Images */}
            <div className="mb-8">
              <Suspense
                fallback={
                  <div className="relative aspect-square w-full max-h-[550px] overflow-hidden" />
                }
              >
                <Gallery
                  images={product.images.slice(0, 5).map((image: Image) => ({
                    src: image.url,
                    altText: image.altText
                  }))}
                />
              </Suspense>
            </div>

            {/* Product Description - Title, Price, Description */}
            <div>
              <Suspense fallback={null}>
                <ProductDescription product={product} />
              </Suspense>
            </div>
          </div>

          {/* Right Column - Seller Information and Delivery */}
          <div className="mt-8 lg:mt-0 lg:w-96 lg:flex-shrink-0">
            {/* P2P seller block - Seller Information */}
            <div>
              <h3 className="mb-3 text-lg font-bold text-neutral-900 dark:text-white">Seller Information</h3>
              <SellerCard sellerId={sellerId} />
            </div>

            {/* Rockets delivery demo with Add to Cart */}
            <div className="mt-6">
              <DeliveryWidget
                listingId={product.handle}
                product={product}
                sellerId={sellerId}
                declaredValueAed={Number(product.priceRange?.maxVariantPrice?.amount ?? 300)}
                weightKg={3}
                fragile={false}
              />
            </div>
          </div>
        </div>

        <RelatedProducts id={product.id} />
      </div>

      <Footer />

      {/* Floating Message Widget */}
      <MessageWidget
        sellerId={sellerId}
        productTitle={product.title}
        productHandle={product.handle}
      />
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link className="relative h-full w-full" href={`/product/${product.handle}`} prefetch={true}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
