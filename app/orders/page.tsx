import { Metadata } from 'next';
import { getDemoOrders, getActiveOrders } from 'lib/demo/orders';
import Footer from 'components/layout/footer';
import OrderList from 'components/orders/order-list';

export const metadata: Metadata = {
  title: 'My Orders',
  description: 'Track your order history and status'
};

export default async function OrdersPage() {
  const allOrders = getDemoOrders();
  const activeOrders = getActiveOrders();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            My Orders
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Track your order history and current deliveries
          </p>
        </div>

        {/* Active Orders Section */}
        {activeOrders.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
              Active Orders
            </h2>
            <OrderList orders={activeOrders} />
          </div>
        )}

        {/* All Orders Section */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
            Order History
          </h2>
          <OrderList orders={allOrders} />
        </div>
      </div>
      <Footer />
    </>
  );
}

