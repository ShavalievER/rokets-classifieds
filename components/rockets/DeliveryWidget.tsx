"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from 'components/cart/cart-context';
import { useProduct } from 'components/product/product-context';
import { Product } from 'lib/shopify/types';
import { getSellerById } from 'lib/demo/sellers';
import { DeliveryAddress } from 'lib/demo/user';

type Props = {
  listingId: string;
  product: Product;
  sellerId: string;
  declaredValueAed?: number;
  weightKg?: number;
  fragile?: boolean;
};

export default function DeliveryWidget(props: Props) {
  const seller = getSellerById(props.sellerId);
  const router = useRouter();
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, setMessage] = useState<string | null>(null);
  
  const [pickupArea, setPickupArea] = useState(seller?.address || seller?.location || "Dubai");
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [selectedTimeWindows, setSelectedTimeWindows] = useState<string[]>([]);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  
  // Time windows for delivery
  const timeWindows = [
    { value: "morning", label: "Morning (9:00 - 12:00)" },
    { value: "afternoon", label: "Afternoon (12:00 - 17:00)" },
    { value: "evening", label: "Evening (17:00 - 21:00)" }
  ];

  // Load user addresses
  useEffect(() => {
    async function loadAddresses() {
      try {
        const { fetchAddresses } = await import('lib/demo/client-api');
        const data = await fetchAddresses();
        setAddresses(data);
        // Auto-select default address if available
        const defaultAddr = data.find((addr: DeliveryAddress) => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
        } else if (data.length > 0) {
          const firstAddr = data[0];
          if (firstAddr) {
            setSelectedAddressId(firstAddr.id);
          }
        }
      } catch (error) {
        console.error('Failed to load addresses:', error);
      } finally {
        setLoadingAddresses(false);
      }
    }
    loadAddresses();
  }, []);

  // Get selected address
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
  const dropoffAddress = selectedAddress 
    ? `${selectedAddress.addressLine1}${selectedAddress.addressLine2 ? ', ' + selectedAddress.addressLine2 : ''}, ${selectedAddress.city}${selectedAddress.state ? ', ' + selectedAddress.state : ''} ${selectedAddress.postalCode}, ${selectedAddress.country}`
    : "";
  
  // Get selected variant
  const variant = props.product.variants.find((v) =>
    v.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = props.product.variants.length === 1 ? props.product.variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = props.product.variants.find(
    (v) => v.id === selectedVariantId
  );

  async function getQuote() {
    if (!dropoffAddress.trim()) {
      setQuote(null);
      return;
    }
    
    setLoading(true);
    try {
      // Try API route first, fallback to client calculation
      let quoteData;
      try {
        const res = await fetch("/api/rockets/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            listingId: props.listingId,
            pickupArea,
            dropoffArea: dropoffAddress,
            declaredValueAed: props.declaredValueAed ?? 300,
            weightKg: props.weightKg ?? 3,
            fragile: props.fragile ?? false
          })
        });
        if (res.ok) {
          quoteData = await res.json();
        } else {
          throw new Error('API route not available');
        }
      } catch (apiError) {
        // Fallback to client-side calculation
        const { getDeliveryQuote } = await import('lib/demo/client-api');
        quoteData = await getDeliveryQuote({
          pickupArea,
          dropoffArea: dropoffAddress,
          declaredValueAed: props.declaredValueAed ?? 300,
          weightKg: props.weightKg ?? 3,
          fragile: props.fragile ?? false
        });
      }
      setQuote(quoteData);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  }

  // Auto-load quote when selectedAddressId changes (with debounce)
  useEffect(() => {
    if (!selectedAddressId || loadingAddresses) {
      setQuote(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      if (dropoffAddress.trim()) {
        getQuote();
      } else {
        setQuote(null);
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddressId, dropoffAddress, pickupArea, props.listingId, props.declaredValueAed, props.weightKg, props.fragile, loadingAddresses]);

  // Handle time window selection
  const handleTimeWindowToggle = (value: string) => {
    setSelectedTimeWindows(prev => 
      prev.includes(value) 
        ? prev.filter(tw => tw !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="mt-6 rounded-2xl border border-neutral-200 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">🚚 Delivery by Rockets</div>
          <div className="text-xs text-neutral-600">Peer-to-peer item pickup → delivery to buyer</div>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        <label className="grid gap-1">
          <span className="text-xs text-neutral-600">Delivery Address <span className="text-red-500">*</span></span>
          {loadingAddresses ? (
            <div className="rounded-lg border px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 text-neutral-500">
              Loading addresses...
            </div>
          ) : addresses.length === 0 ? (
            <div className="space-y-2">
              <div className="rounded-lg border px-3 py-2 text-sm bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200">
                No addresses saved. <a href="/account#addresses" className="underline">Add address</a>
              </div>
            </div>
          ) : (
            <select
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-black dark:text-white"
              value={selectedAddressId}
              onChange={(e) => setSelectedAddressId(e.target.value)}
              disabled={loading}
              required
            >
              <option value="">Select delivery address</option>
              {addresses.map((addr) => (
                <option key={addr.id} value={addr.id}>
                  {addr.label} {addr.isDefault && '(Default)'} - {addr.addressLine1}, {addr.city}
                </option>
              ))}
            </select>
          )}
          {selectedAddress && (
            <div className="mt-1 rounded-lg border px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {selectedAddress.fullName} · {selectedAddress.phone}<br />
              {selectedAddress.addressLine1}
              {selectedAddress.addressLine2 && `, ${selectedAddress.addressLine2}`}<br />
              {selectedAddress.city}{selectedAddress.state && `, ${selectedAddress.state}`} {selectedAddress.postalCode}, {selectedAddress.country}
            </div>
          )}
        </label>

        <label className="grid gap-1">
          <span className="text-xs text-neutral-600">Delivery Time Windows <span className="text-red-500">*</span></span>
          <div className="space-y-2">
            {timeWindows.map((tw) => (
              <label key={tw.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTimeWindows.includes(tw.value)}
                  onChange={() => handleTimeWindowToggle(tw.value)}
                  disabled={loading}
                  className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{tw.label}</span>
              </label>
            ))}
          </div>
          {selectedTimeWindows.length === 0 && (
            <p className="text-xs text-red-500 mt-1">Please select at least one time window</p>
          )}
        </label>
      </div>

      {loading && selectedAddressId ? (
        <div className="mt-4 text-center text-sm text-neutral-600">Calculating delivery cost...</div>
      ) : quote ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border p-4 bg-neutral-50 dark:bg-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Delivery Cost</div>
                <div className="text-xs text-neutral-600">
                  ETA: {quote.eta_hours || '24-72'}h · Insurance: {quote.insurance_included ? "Included" : "Not included"}
                </div>
              </div>
              <div className="text-lg font-bold">{quote.price} {quote.currency}</div>
            </div>
          </div>

          {finalVariant && selectedVariantId ? (
            <form
              action={async () => {
                if (!selectedAddressId || selectedTimeWindows.length === 0) {
                  setMessage('Please select delivery address and at least one time window');
                  return;
                }
                
                try {
                  const deliveryPrice = Number(quote.price) || 0;
                  
                  // Always add to cart optimistically (client-side)
                  if (finalVariant) {
                    addCartItem(finalVariant, props.product, deliveryPrice);
                  }
                  
                  // Try server action, but don't fail if it's not available (static mode)
                  try {
                    const { addItem } = await import('components/cart/actions');
                    const formData = new FormData();
                    formData.set('variantId', selectedVariantId!);
                    formData.set('deliveryPrice', deliveryPrice.toString());
                    const result = await addItem(null, formData as any);
                    setMessage(result || 'Item added to cart');
                    router.refresh();
                  } catch (serverError) {
                    // Server action not available (static mode) - that's OK
                    console.log('Server action not available, using client-side cart only');
                    setMessage('Item added to cart');
                  }
                } catch (error) {
                  setMessage('Error adding item to cart');
                  console.error('Error:', error);
                }
              }}
            >
              <button
                type="submit"
                className="relative flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={loading || !selectedVariantId || !props.product.availableForSale || !selectedAddressId || selectedTimeWindows.length === 0}
              >
                <div className="absolute left-0 ml-4">
                  <PlusIcon className="h-5" />
                </div>
                Add to Cart with Delivery
              </button>
              <p aria-live="polite" className="sr-only" role="status">
                {message}
              </p>
              {message && (
                <p className={`mt-2 text-sm ${message.includes('Error') || message.includes('Please') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`} role="status">
                  {message}
                </p>
              )}
            </form>
          ) : (
            <button
              disabled
              className="relative flex w-full items-center justify-center rounded-xl bg-neutral-400 px-4 py-3 text-sm font-bold text-white cursor-not-allowed opacity-60"
            >
              <div className="absolute left-0 ml-4">
                <PlusIcon className="h-5" />
              </div>
              Please select variant
            </button>
          )}
          
          <div className="text-xs text-neutral-500">
            Total: {quote.price} {quote.currency} (delivery included)
          </div>

          {quote.disclaimer && (
            <div className="text-xs text-neutral-500">{quote.disclaimer}</div>
          )}
        </div>
      ) : selectedAddressId && !loading ? (
        <div className="mt-4 text-center text-sm text-neutral-600">Select delivery address to see pricing</div>
      ) : null}
    </div>
  );
}
