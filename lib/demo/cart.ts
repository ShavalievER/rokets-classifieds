import type { Cart, CartItem, Money } from 'lib/shopify/types';
import { getDemoProduct } from './products';
import { cookies } from 'next/headers';

/**
 * Демо-реализация функций корзины для работы без Shopify
 * Использует cookies для хранения данных корзины
 */

// Хранилище корзин в памяти (для демо)
// В реальном приложении это должно быть в базе данных
const cartStorage = new Map<string, Cart>();

function createEmptyCart(): Cart {
  const cartId = `demo-cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id: cartId,
    checkoutUrl: `/checkout?cart=${cartId}`,
    cost: {
      subtotalAmount: {
        amount: '0.00',
        currencyCode: 'AED'
      },
      totalAmount: {
        amount: '0.00',
        currencyCode: 'AED'
      },
      totalTaxAmount: {
        amount: '0.00',
        currencyCode: 'AED'
      }
    },
    lines: [],
    totalQuantity: 0
  };
}

function calculateCartTotals(items: CartItem[]): {
  subtotal: string;
  total: string;
  tax: string;
} {
  let subtotal = 0;
  
  items.forEach(item => {
    const price = parseFloat(item.cost.totalAmount.amount);
    subtotal += price;
  });
  
  const tax = subtotal * 0.05; // 5% налог для демо
  const total = subtotal + tax;
  
  return {
    subtotal: subtotal.toFixed(2),
    total: total.toFixed(2),
    tax: tax.toFixed(2)
  };
}

/**
 * Создать новую корзину
 */
export async function createDemoCart(): Promise<Cart> {
  const cart = createEmptyCart();
  cartStorage.set(cart.id!, cart);
  
  const cookieStore = await cookies();
  cookieStore.set('cartId', cart.id!);
  
  return cart;
}

/**
 * Получить корзину по ID
 */
export async function getDemoCart(cartId: string): Promise<Cart | undefined> {
  return cartStorage.get(cartId);
}

/**
 * Добавить товар в корзину
 */
export async function addToDemoCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
  deliveryPrice?: number
): Promise<Cart> {
  let cart = cartStorage.get(cartId);
  
  if (!cart) {
    cart = createEmptyCart();
    cart.id = cartId;
    cartStorage.set(cartId, cart);
  }
  
  // Добавляем товары в корзину
  for (const line of lines) {
    // Извлекаем handle из merchandiseId (может быть полный ID или handle)
    let handle = line.merchandiseId;
    if (handle.includes('/')) {
      // Если это полный ID типа "gid://shopify/ProductVariant/handle-variant"
      const parts = handle.split('/');
      const lastPart = parts[parts.length - 1];
      // Убираем суффикс "-variant" если есть
      handle = lastPart.replace(/-variant$/, '');
    }
    
    const product = getDemoProduct(handle);
    
    if (!product) {
      console.warn(`Product not found for handle: ${handle}`);
      continue;
    }
    
    const variant = product.variants[0];
    const existingItem = cart.lines.find(
      item => item.merchandise.id === variant.id
    );
    
    const basePrice = parseFloat(variant.price.amount);
    const deliveryCost = deliveryPrice || 0;
    const itemPriceWithDelivery = basePrice + deliveryCost;
    
    if (existingItem) {
      // Увеличиваем количество
      existingItem.quantity += line.quantity;
      // Пересчитываем цену с учетом доставки
      existingItem.cost.totalAmount.amount = (itemPriceWithDelivery * existingItem.quantity).toFixed(2);
    } else {
      // Добавляем новый товар
      const totalPrice = (itemPriceWithDelivery * line.quantity).toFixed(2);
      
      const cartItem: CartItem = {
        id: `demo-line-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        quantity: line.quantity,
        cost: {
          totalAmount: {
            amount: totalPrice,
            currencyCode: variant.price.currencyCode
          }
        },
        merchandise: {
          id: variant.id,
          title: variant.title,
          selectedOptions: variant.selectedOptions,
          product: {
            id: product.id,
            handle: product.handle,
            title: product.title,
            featuredImage: product.featuredImage
          }
        }
      };
      
      cart.lines.push(cartItem);
    }
  }
  
  // Пересчитываем итоги
  const totals = calculateCartTotals(cart.lines);
  cart.cost.subtotalAmount.amount = totals.subtotal;
  cart.cost.totalAmount.amount = totals.total;
  cart.cost.totalTaxAmount.amount = totals.tax;
  cart.totalQuantity = cart.lines.reduce((sum, item) => sum + item.quantity, 0);
  
  cartStorage.set(cartId, cart);
  return cart;
}

/**
 * Удалить товар из корзины
 */
export async function removeFromDemoCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const cart = cartStorage.get(cartId);
  
  if (!cart) {
    throw new Error('Cart not found');
  }
  
  cart.lines = cart.lines.filter(item => !lineIds.includes(item.id || ''));
  
  // Пересчитываем итоги
  const totals = calculateCartTotals(cart.lines);
  cart.cost.subtotalAmount.amount = totals.subtotal;
  cart.cost.totalAmount.amount = totals.total;
  cart.cost.totalTaxAmount.amount = totals.tax;
  cart.totalQuantity = cart.lines.reduce((sum, item) => sum + item.quantity, 0);
  
  cartStorage.set(cartId, cart);
  return cart;
}

/**
 * Обновить корзину
 */
export async function updateDemoCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cart = cartStorage.get(cartId);
  
  if (!cart) {
    throw new Error('Cart not found');
  }
  
  // Обновляем товары
  for (const line of lines) {
    const item = cart.lines.find(i => i.id === line.id);
    
    if (item) {
      if (line.quantity === 0) {
        // Удаляем товар
        cart.lines = cart.lines.filter(i => i.id !== line.id);
      } else {
        // Обновляем количество
        // Сохраняем цену за единицу (включая доставку) из текущей стоимости
        const currentTotal = parseFloat(item.cost.totalAmount.amount);
        const pricePerUnit = currentTotal / item.quantity;
        item.quantity = line.quantity;
        item.cost.totalAmount.amount = (pricePerUnit * line.quantity).toFixed(2);
      }
    }
  }
  
  // Пересчитываем итоги
  const totals = calculateCartTotals(cart.lines);
  cart.cost.subtotalAmount.amount = totals.subtotal;
  cart.cost.totalAmount.amount = totals.total;
  cart.cost.totalTaxAmount.amount = totals.tax;
  cart.totalQuantity = cart.lines.reduce((sum, item) => sum + item.quantity, 0);
  
  cartStorage.set(cartId, cart);
  return cart;
}

