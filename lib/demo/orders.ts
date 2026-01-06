import { getDemoProduct } from './products';
import { getSellerById } from './sellers';

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'paid'
  | 'pickup_scheduled'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type OrderItem = {
  id: string;
  productId: string;
  productHandle: string;
  productTitle: string;
  productImage?: string;
  variantId: string;
  quantity: number;
  unitPrice: string;
  deliveryPrice: string;
  totalPrice: string;
  currencyCode: string;
};

export type RoutePoint = {
  lat: number;
  lng: number;
  label: string;
  timestamp?: string; // ISO date string for when courier passed this point
};

export type OrderTracking = {
  trackingId: string;
  currentStatus: OrderStatus;
  estimatedDelivery?: string; // ISO date string
  timeline: Array<{
    ts: string; // ISO date string
    status: OrderStatus;
    note: string;
  }>;
  // Route information for map
  route?: {
    pickup: RoutePoint; // Where courier picked up the package
    delivery: RoutePoint; // Final delivery destination
    waypoints?: RoutePoint[]; // Intermediate points on the route
    currentLocation?: RoutePoint; // Current courier location (updates in real-time)
  };
};

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string; // ISO date string
  status: OrderStatus;
  items: OrderItem[];
  subtotal: string;
  tax: string;
  delivery: string;
  total: string;
  currencyCode: string;
  deliveryAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    country: string;
  };
  seller?: {
    id: string;
    name: string;
    location: string;
  };
  tracking?: OrderTracking;
  paymentMethod?: string;
};

// Generate mock orders
function generateMockOrders(): Order[] {
  const orders: Order[] = [];
  const now = new Date();
  
  // Current active order (paid, picked up, delivery in 1 hour)
  const currentOrderDate = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
  const deliveryDate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
  
  const currentProduct = getDemoProduct('furniture-sofas-1');
  const currentSeller = getSellerById('sara');
  
  orders.push({
    id: 'order-current',
    orderNumber: `ORD-${Date.now()}`,
    createdAt: currentOrderDate.toISOString(),
    status: 'picked_up',
    items: [
      {
        id: 'item-1',
        productId: currentProduct?.id || 'prod-1',
        productHandle: 'furniture-sofas-1',
        productTitle: currentProduct?.title || 'Modern Sofa',
        productImage: currentProduct?.featuredImage?.url,
        variantId: currentProduct?.variants[0]?.id || 'var-1',
        quantity: 1,
        unitPrice: currentProduct?.variants[0]?.price.amount || '500.00',
        deliveryPrice: '25.00',
        totalPrice: '525.00',
        currencyCode: 'AED'
      }
    ],
    subtotal: '500.00',
    tax: '25.00',
    delivery: '25.00',
    total: '550.00',
    currencyCode: 'AED',
    deliveryAddress: {
      fullName: 'John Doe',
      phone: '+971 50 123 4567',
      addressLine1: 'Villa 15, Al Barsha',
      addressLine2: 'Dubai Marina',
      city: 'Dubai',
      postalCode: '12345',
      country: 'UAE'
    },
    seller: currentSeller ? {
      id: currentSeller.id,
      name: currentSeller.name,
      location: currentSeller.location
    } : undefined,
    tracking: {
      trackingId: 'RKT-CURRENT-001',
      currentStatus: 'picked_up',
      estimatedDelivery: deliveryDate.toISOString(),
      timeline: [
        {
          ts: new Date(currentOrderDate.getTime() + 30 * 60 * 1000).toISOString(),
          status: 'confirmed',
          note: 'Order confirmed'
        },
        {
          ts: new Date(currentOrderDate.getTime() + 60 * 60 * 1000).toISOString(),
          status: 'paid',
          note: 'Payment received'
        },
        {
          ts: new Date(currentOrderDate.getTime() + 90 * 60 * 1000).toISOString(),
          status: 'pickup_scheduled',
          note: 'Pickup scheduled'
        },
        {
          ts: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
          status: 'picked_up',
          note: 'Picked up from seller by courier'
        }
      ],
      route: {
        pickup: {
          lat: 25.1124,
          lng: 55.1390,
          label: 'Pickup Location',
          timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString()
        },
        delivery: {
          lat: 25.0772,
          lng: 55.1394,
          label: 'Delivery Address'
        },
        waypoints: [
          {
            lat: 25.1000,
            lng: 55.1392,
            label: 'Distribution Hub'
          },
          {
            lat: 25.0886,
            lng: 55.1393,
            label: 'Sorting Center'
          }
        ],
        // Current location - simulates courier moving along the route
        currentLocation: {
          lat: 25.0950,
          lng: 55.13925,
          label: 'Courier Location',
          timestamp: new Date().toISOString()
        }
      }
    },
    paymentMethod: 'Visa ****4242'
  });

  // Generate 10 past orders
  const productHandles = [
    'electronics-smartphones-1',
    'electronics-laptops-2',
    'furniture-tables-3',
    'sporting-goods-bicycles-1',
    'toys-action-figures-2',
    'babies-strollers-1',
    'clothing-shirts-2',
    'home-garden-tools-3',
    'fashion-beauty-perfumes-1',
    'auto-parts-tires-2'
  ];

  const statuses: OrderStatus[] = ['delivered', 'delivered', 'delivered', 'cancelled'];
  
  for (let i = 0; i < 10; i++) {
    const daysAgo = i + 1;
    const orderDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const productHandle = productHandles[i % productHandles.length];
    const product = getDemoProduct(productHandle);
    // Get seller IDs from available sellers
    const sellerIds = ['sara', 'ahmed', 'maria', 'yousef', 'fatima'];
    const seller = getSellerById(sellerIds[i % sellerIds.length]);
    const status = statuses[i % statuses.length];
    
    const unitPrice = parseFloat(product?.variants[0]?.price.amount || '100.00');
    const deliveryPrice = 25.00;
    const quantity = 1;
    const subtotal = (unitPrice * quantity).toFixed(2);
    const tax = (parseFloat(subtotal) * 0.05).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(tax) + deliveryPrice).toFixed(2);
    
    const deliveredDate = status === 'delivered' 
      ? new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000)
      : undefined;
    
    orders.push({
      id: `order-${i + 1}`,
      orderNumber: `ORD-${Date.now() - (i * 86400000)}`,
      createdAt: orderDate.toISOString(),
      status,
      items: [
        {
          id: `item-${i + 1}`,
          productId: product?.id || `prod-${i + 1}`,
          productHandle,
          productTitle: product?.title || `Product ${i + 1}`,
          productImage: product?.featuredImage?.url,
          variantId: product?.variants[0]?.id || `var-${i + 1}`,
          quantity,
          unitPrice: unitPrice.toFixed(2),
          deliveryPrice: deliveryPrice.toFixed(2),
          totalPrice: (unitPrice + deliveryPrice).toFixed(2),
          currencyCode: 'AED'
        }
      ],
      subtotal,
      tax,
      delivery: deliveryPrice.toFixed(2),
      total,
      currencyCode: 'AED',
      deliveryAddress: {
        fullName: 'John Doe',
        phone: '+971 50 123 4567',
        addressLine1: 'Villa 15, Al Barsha',
        addressLine2: 'Dubai Marina',
        city: 'Dubai',
        postalCode: '12345',
        country: 'UAE'
      },
      seller: seller ? {
        id: seller.id,
        name: seller.name,
        location: seller.location
      } : undefined,
      tracking: status === 'delivered' && deliveredDate ? {
        trackingId: `RKT-${i + 1}-${Date.now()}`,
        currentStatus: 'delivered',
        estimatedDelivery: deliveredDate.toISOString(),
        timeline: [
          {
            ts: new Date(orderDate.getTime() + 30 * 60 * 1000).toISOString(),
            status: 'confirmed',
            note: 'Order confirmed'
          },
          {
            ts: new Date(orderDate.getTime() + 60 * 60 * 1000).toISOString(),
            status: 'paid',
            note: 'Payment received'
          },
          {
            ts: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000).toISOString(),
            status: 'pickup_scheduled',
            note: 'Pickup scheduled'
          },
          {
            ts: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000).toISOString(),
            status: 'picked_up',
            note: 'Picked up from seller'
          },
          {
            ts: new Date(orderDate.getTime() + 30 * 60 * 60 * 1000).toISOString(),
            status: 'in_transit',
            note: 'In transit to destination'
          },
          {
            ts: deliveredDate.toISOString(),
            status: 'delivered',
            note: 'Delivered successfully'
          }
        ]
      } : undefined,
      paymentMethod: i % 2 === 0 ? 'Visa ****4242' : 'Mastercard ****8888'
    });
  }

  return orders.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Store orders in memory (for demo)
let mockOrders = generateMockOrders();

export function getDemoOrders(): Order[] {
  return [...mockOrders];
}

export function getDemoOrderById(id: string): Order | undefined {
  return mockOrders.find(order => order.id === id);
}

export function getDemoOrderByNumber(orderNumber: string): Order | undefined {
  return mockOrders.find(order => order.orderNumber === orderNumber);
}

export function getActiveOrders(): Order[] {
  return mockOrders.filter(order => 
    order.status !== 'delivered' && order.status !== 'cancelled'
  );
}

export function getOrderTracking(trackingId: string): OrderTracking | undefined {
  const order = mockOrders.find(o => o.tracking?.trackingId === trackingId);
  return order?.tracking;
}

