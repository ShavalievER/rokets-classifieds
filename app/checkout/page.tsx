import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Footer from 'components/layout/footer';
import { getCart } from 'lib/shopify';

export const metadata = {
  title: 'Order Confirmation',
  description: 'Your order has been received and is being processed.'
};

export default async function CheckoutPage({
  searchParams
}: {
  searchParams?: Promise<{ cart?: string }>;
}) {
  const params = await searchParams;
  const cartId = params?.cart;

  // If no cart ID, redirect to home
  if (!cartId) {
    redirect('/');
  }

  // Get cart to verify it exists
  const cart = await getCart();

  // Clear cart after checkout
  if (cart) {
    const cookieStore = await cookies();
    cookieStore.delete('cartId');
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center dark:border-neutral-700 dark:bg-neutral-900">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
            Order Received
          </h1>

          {/* Message */}
          <p className="mb-2 text-lg text-neutral-700 dark:text-neutral-300">
            Your order has been taken into work.
          </p>
          <p className="mb-8 text-neutral-600 dark:text-neutral-400">
            We will inform you about the status of its completion.
          </p>

          {/* Order Details (if cart exists) */}
          {cart && cart.lines.length > 0 && (
            <div className="mb-8 rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-left dark:border-neutral-700 dark:bg-neutral-800">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Order Summary
              </h2>
              <div className="space-y-2">
                {cart.lines.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-neutral-200 pb-2 dark:border-neutral-700"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {item.merchandise.product.title}
                      </p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="ml-4 font-semibold text-neutral-900 dark:text-white">
                      {parseFloat(item.cost.totalAmount.amount).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}{' '}
                      {item.cost.totalAmount.currencyCode}
                    </p>
                  </div>
                ))}
                <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-neutral-700">
                  <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Total
                  </p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">
                    {parseFloat(cart.cost.totalAmount.amount).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}{' '}
                    {cart.cost.totalAmount.currencyCode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              View Account
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

