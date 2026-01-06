'use client';

import { Order } from 'lib/demo/orders';
import OrderCard from './order-card';

export default function OrderList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-12 text-center dark:border-neutral-700 dark:bg-neutral-900">
        <p className="text-neutral-600 dark:text-neutral-400">
          No orders found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

