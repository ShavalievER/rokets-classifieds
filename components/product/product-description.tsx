import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 border-b pb-6 dark:border-neutral-700">
        <h1 className="text-3xl font-medium md:text-4xl lg:text-5xl">{product.title}</h1>
        <div className="w-auto rounded-full bg-blue-600 px-4 py-2 text-lg font-semibold text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-relaxed dark:text-white/[60%] md:text-base"
          html={product.descriptionHtml}
        />
      ) : null}
      <VariantSelector options={product.options} variants={product.variants} />
    </>
  );
}
