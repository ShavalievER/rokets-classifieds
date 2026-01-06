'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from 'lib/shopify/types';

interface ClassifiedProductCardProps {
  product: Product;
}

// Default delivery price for display in product cards
// This is an estimated price; actual price is calculated on product page
const DEFAULT_DELIVERY_PRICE = '25.00';

export default function ClassifiedProductCard({ product }: ClassifiedProductCardProps) {
  return (
    <Link
      href={`/product/${product.handle}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-black"
      prefetch={true}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {product.featuredImage?.url && (
          <Image
            src={product.featuredImage.url}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-neutral-900 dark:text-white">
          {product.title}
        </h3>

        {/* Price and Delivery */}
        <div className="mt-auto space-y-1.5">
          {/* Product Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Price:</span>
            <span className="text-base font-bold text-blue-600 dark:text-blue-400">
              {parseFloat(product.priceRange.maxVariantPrice.amount).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">AED</span>
          </div>

          {/* Delivery Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-neutral-600 dark:text-neutral-400">🚀 Delivery:</span>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {parseFloat(DEFAULT_DELIVERY_PRICE).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">AED</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

