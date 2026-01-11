// Server actions disabled for static export
// 'use server'; // Commented out for static export compatibility

// Placeholder functions for static export - these are not actually used
// Components use client-side cart instead

export async function addItem(prevState: any, formData: FormData | string | undefined) {
  // No-op for static export
  return null;
}

export async function removeItem(prevState: any, merchandiseId: string) {
  // No-op for static export
  return null;
}

export async function updateItemQuantity(prevState: any, payload: { merchandiseId: string; quantity: number }) {
  // No-op for static export
  return null;
}

export async function createCartAndSetCookie() {
  // No-op for static export
  return null;
}

export async function redirectToCheckout() {
  // No-op for static export
  // Components handle checkout redirect client-side
}
