// Client-side API simulation for static version
// Provides the same interface as API routes but uses localStorage

import {
  getClientAddresses,
  addClientAddress,
  updateClientAddress,
  deleteClientAddress,
  setDefaultClientAddress,
  getClientPaymentMethods,
  addClientPaymentMethod,
  updateClientPaymentMethod,
  deleteClientPaymentMethod,
  setDefaultClientPaymentMethod
} from './client-storage';
import { DeliveryAddress, PaymentMethod } from './user';

// Check if we're in static mode (no API routes available)
export function isStaticMode(): boolean {
  if (typeof window === 'undefined') return false;
  // Try to detect if API routes are available
  // In static export, API routes return 404
  return true; // Assume static mode for now, can be enhanced with actual check
}

// Addresses API
export async function fetchAddresses(): Promise<DeliveryAddress[]> {
  if (isStaticMode()) {
    return getClientAddresses();
  }
  
  // Try API route, fallback to localStorage
  try {
    const response = await fetch('/api/account/addresses');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('API route not available, using localStorage:', error);
  }
  
  return getClientAddresses();
}

export async function createAddress(address: Omit<DeliveryAddress, 'id'>): Promise<DeliveryAddress> {
  if (isStaticMode()) {
    return addClientAddress(address);
  }
  
  try {
    const response = await fetch('/api/account/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(address)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('API route not available, using localStorage:', error);
  }
  
  return addClientAddress(address);
}

export async function updateAddress(id: string, updates: Partial<DeliveryAddress>): Promise<DeliveryAddress | null> {
  if (isStaticMode()) {
    return updateClientAddress(id, updates);
  }
  
  try {
    const response = await fetch(`/api/account/addresses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('API route not available, using localStorage:', error);
  }
  
  return updateClientAddress(id, updates);
}

export async function removeAddress(id: string): Promise<boolean> {
  if (isStaticMode()) {
    return deleteClientAddress(id);
  }
  
  try {
    const response = await fetch(`/api/account/addresses/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.warn('API route not available, using localStorage:', error);
  }
  
  return deleteClientAddress(id);
}

export async function setDefaultAddress(id: string): Promise<boolean> {
  if (isStaticMode()) {
    return setDefaultClientAddress(id);
  }
  
  try {
    const response = await fetch(`/api/account/addresses/${id}/default`, {
      method: 'POST'
    });
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.warn('API route not available, using localStorage:', error);
  }
  
  return setDefaultClientAddress(id);
}

// Payment Methods API
export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  if (isStaticMode()) {
    return getClientPaymentMethods();
  }
  
  try {
    const response = await fetch('/api/account/payment-methods');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('API route not available, using localStorage:', error);
  }
  
  return getClientPaymentMethods();
}

export async function createPaymentMethod(method: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
  if (isStaticMode()) {
    return addClientPaymentMethod(method);
  }
  
  try {
    const response = await fetch('/api/account/payment-methods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(method)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('API route not available, using localStorage:', error);
  }
  
  return addClientPaymentMethod(method);
}

export async function updatePaymentMethod(id: string, updates: Partial<PaymentMethod>): Promise<PaymentMethod | null> {
  if (isStaticMode()) {
    return updateClientPaymentMethod(id, updates);
  }
  
  try {
    const response = await fetch(`/api/account/payment-methods/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('API route not available, using localStorage:', error);
  }
  
  return updateClientPaymentMethod(id, updates);
}

export async function removePaymentMethod(id: string): Promise<boolean> {
  if (isStaticMode()) {
    return deleteClientPaymentMethod(id);
  }
  
  try {
    const response = await fetch(`/api/account/payment-methods/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.warn('API route not available, using localStorage:', error);
  }
  
  return deleteClientPaymentMethod(id);
}

export async function setDefaultPaymentMethod(id: string): Promise<boolean> {
  if (isStaticMode()) {
    return setDefaultClientPaymentMethod(id);
  }
  
  try {
    const response = await fetch(`/api/account/payment-methods/${id}/default`, {
      method: 'POST'
    });
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.warn('API route not available, using localStorage:', error);
  }
  
  return setDefaultClientPaymentMethod(id);
}

// Delivery quote (mock calculation)
export async function getDeliveryQuote(params: {
  pickupArea: string;
  dropoffArea: string;
  declaredValueAed: number;
  weightKg: number;
  fragile: boolean;
}): Promise<{
  price: string;
  currency: string;
  eta_hours: number;
  insurance_included: boolean;
}> {
  // Mock calculation for static version
  // In real version, this would call /api/rockets/quote
  
  const basePrice = 25; // Base delivery price
  const weightMultiplier = params.weightKg > 5 ? 1.5 : 1;
  const valueMultiplier = params.declaredValueAed > 1000 ? 1.2 : 1;
  const fragileMultiplier = params.fragile ? 1.3 : 1;
  
  const calculatedPrice = basePrice * weightMultiplier * valueMultiplier * fragileMultiplier;
  
  return {
    price: calculatedPrice.toFixed(2),
    currency: 'AED',
    eta_hours: 24,
    insurance_included: params.declaredValueAed > 500
  };
}










