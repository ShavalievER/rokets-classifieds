'use server';

import { TAGS } from 'lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from 'lib/shopify';
import { revalidateTag, revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: any,
  formData: FormData | string | undefined
) {
  // Handle both old API (string) and new API (FormData)
  let selectedVariantId: string | undefined;
  let deliveryPrice: number | undefined;
  
  if (formData instanceof FormData) {
    selectedVariantId = formData.get('variantId') as string | undefined;
    const deliveryPriceStr = formData.get('deliveryPrice') as string | undefined;
    deliveryPrice = deliveryPriceStr ? Number(deliveryPriceStr) : undefined;
  } else {
    // Backward compatibility with old API
    selectedVariantId = formData as string | undefined;
  }
  
  if (!selectedVariantId) {
    return 'Error adding item to cart';
  }

  try {
    let cart = await getCart();
    
    // If cart doesn't exist, create one
    if (!cart) {
      cart = await createCart();
      (await cookies()).set('cartId', cart.id!);
    }
    
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }], deliveryPrice);
    revalidateTag(TAGS.cart, 'seconds');
    revalidatePath('/', 'layout'); // Revalidate the root layout to update cart
  } catch (e) {
    console.error('Error adding item to cart:', e);
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart, 'seconds');
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart, 'seconds');
  } catch (e) {
    console.error(e);
    return 'Error updating item quantity';
  }
}

export async function redirectToCheckout() {
  const cart = await getCart();
  
  if (!cart || !cart.checkoutUrl) {
    // If no cart, redirect to home
    redirect('/');
    return;
  }
  
  redirect(cart.checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set('cartId', cart.id!);
}
