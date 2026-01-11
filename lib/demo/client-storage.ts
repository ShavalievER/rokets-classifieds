// Client-side storage utilities for static version
// Uses localStorage to persist data in browser

import { DeliveryAddress, PaymentMethod } from './user';

const STORAGE_KEYS = {
  ADDRESSES: 'rokets_addresses',
  PAYMENT_METHODS: 'rokets_payment_methods',
  CART: 'rokets_cart'
};

// Default demo data
const DEFAULT_ADDRESSES: DeliveryAddress[] = [
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

const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
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

// Addresses
export function getClientAddresses(): DeliveryAddress[] {
  if (typeof window === 'undefined') return DEFAULT_ADDRESSES;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure we have at least one address
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      // If parsed data is invalid, reinitialize
      setClientAddresses(DEFAULT_ADDRESSES);
      return DEFAULT_ADDRESSES;
    }
    // Initialize with default data if localStorage is empty
    setClientAddresses(DEFAULT_ADDRESSES);
    return DEFAULT_ADDRESSES;
  } catch (error) {
    console.error('Error loading addresses from localStorage:', error);
    // Reinitialize with default data on error
    try {
      setClientAddresses(DEFAULT_ADDRESSES);
    } catch (saveError) {
      console.error('Error saving default addresses to localStorage:', saveError);
    }
    return DEFAULT_ADDRESSES;
  }
}

export function setClientAddresses(addresses: DeliveryAddress[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
  } catch (error) {
    console.error('Error saving addresses to localStorage:', error);
  }
}

export function addClientAddress(address: Omit<DeliveryAddress, 'id'>): DeliveryAddress {
  const addresses = getClientAddresses();
  const newAddress: DeliveryAddress = {
    ...address,
    id: `addr-${Date.now()}`
  };
  
  // If this is default, remove default from others
  if (newAddress.isDefault) {
    addresses.forEach(addr => { addr.isDefault = false; });
  }
  
  addresses.push(newAddress);
  setClientAddresses(addresses);
  return newAddress;
}

export function updateClientAddress(id: string, updates: Partial<DeliveryAddress>): DeliveryAddress | null {
  const addresses = getClientAddresses();
  const index = addresses.findIndex(addr => addr.id === id);
  if (index === -1) return null;
  
  // If setting as default, remove default from others
  if (updates.isDefault) {
    addresses.forEach(addr => { addr.isDefault = false; });
  }
  
  addresses[index] = { ...addresses[index], ...updates } as DeliveryAddress;
  setClientAddresses(addresses);
  return addresses[index];
}

export function deleteClientAddress(id: string): boolean {
  const addresses = getClientAddresses();
  const index = addresses.findIndex(addr => addr.id === id);
  if (index === -1) return false;
  addresses.splice(index, 1);
  setClientAddresses(addresses);
  return true;
}

export function setDefaultClientAddress(id: string): boolean {
  const addresses = getClientAddresses();
  const index = addresses.findIndex(addr => addr.id === id);
  if (index === -1) return false;
  
  addresses.forEach(addr => { addr.isDefault = false; });
  addresses[index].isDefault = true;
  setClientAddresses(addresses);
  return true;
}

// Payment Methods
export function getClientPaymentMethods(): PaymentMethod[] {
  if (typeof window === 'undefined') return DEFAULT_PAYMENT_METHODS;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default data
    setClientPaymentMethods(DEFAULT_PAYMENT_METHODS);
    return DEFAULT_PAYMENT_METHODS;
  } catch (error) {
    console.error('Error loading payment methods from localStorage:', error);
    return DEFAULT_PAYMENT_METHODS;
  }
}

export function setClientPaymentMethods(methods: PaymentMethod[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(methods));
  } catch (error) {
    console.error('Error saving payment methods to localStorage:', error);
  }
}

export function addClientPaymentMethod(method: Omit<PaymentMethod, 'id'>): PaymentMethod {
  const methods = getClientPaymentMethods();
  const newMethod: PaymentMethod = {
    ...method,
    id: `pm-${Date.now()}`
  };
  
  // If this is default, remove default from others
  if (newMethod.isDefault) {
    methods.forEach(pm => { pm.isDefault = false; });
  }
  
  methods.push(newMethod);
  setClientPaymentMethods(methods);
  return newMethod;
}

export function updateClientPaymentMethod(id: string, updates: Partial<PaymentMethod>): PaymentMethod | null {
  const methods = getClientPaymentMethods();
  const index = methods.findIndex(pm => pm.id === id);
  if (index === -1) return null;
  
  // If setting as default, remove default from others
  if (updates.isDefault) {
    methods.forEach(pm => { pm.isDefault = false; });
  }
  
  methods[index] = { ...methods[index], ...updates } as PaymentMethod;
  setClientPaymentMethods(methods);
  return methods[index];
}

export function deleteClientPaymentMethod(id: string): boolean {
  const methods = getClientPaymentMethods();
  const index = methods.findIndex(pm => pm.id === id);
  if (index === -1) return false;
  methods.splice(index, 1);
  setClientPaymentMethods(methods);
  return true;
}

export function setDefaultClientPaymentMethod(id: string): boolean {
  const methods = getClientPaymentMethods();
  const index = methods.findIndex(pm => pm.id === id);
  if (index === -1) return false;
  
  methods.forEach(pm => { pm.isDefault = false; });
  methods[index].isDefault = true;
  setClientPaymentMethods(methods);
  return true;
}




