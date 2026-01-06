'use client';

import { Order, OrderStatus } from 'lib/demo/orders';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import OrderMap from './order-map';

function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
  return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
}

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  paid: 'Paid',
  pickup_scheduled: 'Pickup Scheduled',
  picked_up: 'Picked Up',
  in_transit: 'In Transit',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  pickup_scheduled: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  picked_up: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  in_transit: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  out_for_delivery: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
};

export default function OrderCard({ order }: { order: Order }) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const orderDate = new Date(order.createdAt);
  const isActive = order.status !== 'delivered' && order.status !== 'cancelled';
  const estimatedDelivery = order.tracking?.estimatedDelivery
    ? new Date(order.tracking.estimatedDelivery)
    : null;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        {/* Left: Order Info */}
        <div className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Order {order.orderNumber}
              </h3>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Placed {formatDistanceToNow(orderDate)}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}
            >
              {statusLabels[order.status]}
            </span>
          </div>

          {/* Items */}
          <div className="mb-4 space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                {item.productImage && (
                  <Link href={`/product/${item.productHandle}`}>
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                      <Image
                        src={item.productImage}
                        alt={item.productTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                )}
                <div className="flex-1">
                  <Link
                    href={`/product/${item.productHandle}`}
                    className="font-medium text-neutral-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                  >
                    {item.productTitle}
                  </Link>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Quantity: {item.quantity}
                  </p>
                  {order.seller && (
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                      Seller: {order.seller.name} • {order.seller.location}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {parseFloat(item.totalPrice).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}{' '}
                    {item.currencyCode}
                  </p>
                  {parseFloat(item.deliveryPrice) > 0 && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      + {parseFloat(item.deliveryPrice).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}{' '}
                      {item.currencyCode} delivery
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Info */}
          {isActive && estimatedDelivery && (
            <div className="mb-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                Estimated Delivery: {formatDistanceToNow(estimatedDelivery)}
              </p>
              {order.tracking?.currentStatus === 'picked_up' && (
                <p className="mt-1 text-xs text-blue-700 dark:text-blue-400">
                  Courier has picked up your order and is on the way
                </p>
              )}
              {order.tracking?.route && (
                <button
                  onClick={() => setIsMapOpen(true)}
                  className="mt-3 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6.75V15m6-6v8.25m.513 3.58C15.53 15.494 20.55 12.5 20.55 8.25c0-4.5-4.05-8.25-9-8.25S2.55 3.75 2.55 8.25c0 4.25 5.02 7.244 9.037 8.33m0 0a18.18 18.18 0 003.963-.33m-3.963.33a18.18 18.18 0 01-3.963-.33m0 0c-4.01-1.086-9.037-4.08-9.037-8.33 0-4.5 4.05-8.25 9-8.25s9 3.75 9 8.25c0 4.25-5.027 7.244-9.037 8.33z"
                    />
                  </svg>
                  View Live Map
                </button>
              )}
            </div>
          )}

          {/* Tracking Timeline */}
          {order.tracking && order.tracking.timeline.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Tracking: {order.tracking.trackingId}
              </p>
              <div className="space-y-2">
                {order.tracking.timeline.slice(-3).map((event, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {event.note}
                      </p>
                      <p className="text-neutral-400 dark:text-neutral-500">
                        {formatDistanceToNow(new Date(event.ts))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-64 lg:shrink-0">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                <span className="text-neutral-900 dark:text-white">
                  {parseFloat(order.subtotal).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}{' '}
                  {order.currencyCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
                <span className="text-neutral-900 dark:text-white">
                  {parseFloat(order.tax).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}{' '}
                  {order.currencyCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Delivery</span>
                <span className="text-neutral-900 dark:text-white">
                  {parseFloat(order.delivery).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}{' '}
                  {order.currencyCode}
                </span>
              </div>
              <div className="border-t border-neutral-200 pt-2 dark:border-neutral-700">
                <div className="flex justify-between font-semibold">
                  <span className="text-neutral-900 dark:text-white">Total</span>
                  <span className="text-neutral-900 dark:text-white">
                    {parseFloat(order.total).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}{' '}
                    {order.currencyCode}
                  </span>
                </div>
              </div>
            </div>
            {order.paymentMethod && (
              <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                Paid with {order.paymentMethod}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {order.tracking?.route && (
        <OrderMap
          order={order}
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
        />
      )}
    </div>
  );
}

