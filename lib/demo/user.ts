export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
};

export type DeliveryAddress = {
  id: string;
  label: string; // Home, Work, etc.
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export type PaymentMethod = {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  label: string; // Last 4 digits for card, or method name
  isDefault: boolean;
  expiryDate?: string; // For cards: MM/YY
  cardholderName?: string;
  brand?: string; // Visa, Mastercard, etc.
};

// Demo user data
let demoUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+971 50 123 4567',
  avatar: 'https://i.pravatar.cc/160?img=1'
};

let demoAddresses: DeliveryAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    fullName: 'John Doe',
    phone: '+971 50 123 4567',
    addressLine1: 'Villa 15, Al Barsha',
    addressLine2: 'Dubai Marina',
    city: 'Dubai',
    state: 'Dubai',
    postalCode: '12345',
    country: 'UAE',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Work',
    fullName: 'John Doe',
    phone: '+971 50 123 4567',
    addressLine1: 'Office Tower, Business Bay',
    city: 'Dubai',
    state: 'Dubai',
    postalCode: '67890',
    country: 'UAE',
    isDefault: false
  }
];

let demoPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'card',
    label: '**** **** **** 4242',
    isDefault: true,
    expiryDate: '12/25',
    cardholderName: 'John Doe',
    brand: 'Visa'
  },
  {
    id: 'pm-2',
    type: 'card',
    label: '**** **** **** 8888',
    isDefault: false,
    expiryDate: '06/26',
    cardholderName: 'John Doe',
    brand: 'Mastercard'
  }
];

export function getDemoUser(): User {
  return { ...demoUser };
}

export function updateDemoUser(updates: Partial<User>): User {
  demoUser = { ...demoUser, ...updates };
  return demoUser;
}

export function getDemoAddresses(): DeliveryAddress[] {
  return [...demoAddresses];
}

export function getDemoAddressById(id: string): DeliveryAddress | undefined {
  return demoAddresses.find(addr => addr.id === id);
}

export function addDemoAddress(address: Omit<DeliveryAddress, 'id'>): DeliveryAddress {
  const newAddress: DeliveryAddress = {
    ...address,
    id: `addr-${Date.now()}`
  };
  demoAddresses.push(newAddress);
  return newAddress;
}

export function updateDemoAddress(id: string, updates: Partial<DeliveryAddress>): DeliveryAddress | null {
  const index = demoAddresses.findIndex(addr => addr.id === id);
  if (index === -1) return null;
  
  demoAddresses[index] = { ...demoAddresses[index], ...updates };
  return demoAddresses[index];
}

export function deleteDemoAddress(id: string): boolean {
  const index = demoAddresses.findIndex(addr => addr.id === id);
  if (index === -1) return false;
  demoAddresses.splice(index, 1);
  return true;
}

export function setDefaultAddress(id: string): boolean {
  const index = demoAddresses.findIndex(addr => addr.id === id);
  if (index === -1) return false;
  
  // Remove default from all addresses
  demoAddresses.forEach(addr => {
    addr.isDefault = false;
  });
  
  // Set new default
  demoAddresses[index].isDefault = true;
  return true;
}

export function getDemoPaymentMethods(): PaymentMethod[] {
  return [...demoPaymentMethods];
}

export function getDemoPaymentMethodById(id: string): PaymentMethod | undefined {
  return demoPaymentMethods.find(pm => pm.id === id);
}

export function addDemoPaymentMethod(method: Omit<PaymentMethod, 'id'>): PaymentMethod {
  const newMethod: PaymentMethod = {
    ...method,
    id: `pm-${Date.now()}`
  };
  demoPaymentMethods.push(newMethod);
  return newMethod;
}

export function updateDemoPaymentMethod(id: string, updates: Partial<PaymentMethod>): PaymentMethod | null {
  const index = demoPaymentMethods.findIndex(pm => pm.id === id);
  if (index === -1) return null;
  
  demoPaymentMethods[index] = { ...demoPaymentMethods[index], ...updates };
  return demoPaymentMethods[index];
}

export function deleteDemoPaymentMethod(id: string): boolean {
  const index = demoPaymentMethods.findIndex(pm => pm.id === id);
  if (index === -1) return false;
  demoPaymentMethods.splice(index, 1);
  return true;
}

export function setDefaultPaymentMethod(id: string): boolean {
  const index = demoPaymentMethods.findIndex(pm => pm.id === id);
  if (index === -1) return false;
  
  // Remove default from all methods
  demoPaymentMethods.forEach(pm => {
    pm.isDefault = false;
  });
  
  // Set new default
  demoPaymentMethods[index].isDefault = true;
  return true;
}

