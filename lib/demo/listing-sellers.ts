/**
 * Mapping product.handle -> sellerId
 * Используется для P2P demo в vercel/commerce
 * Если handle не найден — используется дефолтный продавец (sara)
 * 
 * Связывает демо-продукты из lib/demo/products.ts с продавцами из lib/demo/sellers.ts
 * 
 * Новый формат handles: {category}-{subcategory}-{index}
 * Например: 'furniture-sofas-couches-1', 'auto-parts-accessories-1', 'clothing-accessories-1'
 */

// Список всех продавцов для распределения
const SELLERS = ['sara', 'maria', 'ahmed', 'yousef', 'fatima'] as const;

/**
 * Возвращает sellerId по handle товара
 * Использует детерминированное распределение на основе handle для консистентности
 * @param handle - handle продукта (например, 'furniture-sofas-couches-1')
 * @returns ID продавца из lib/demo/sellers.ts
 */
export function getSellerIdForHandle(handle: string): string {
  // Используем хеш handle для детерминированного распределения продавцов
  // Это гарантирует, что один и тот же handle всегда получит одного и того же продавца
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    const char = handle.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Используем абсолютное значение хеша для выбора продавца
  const sellerIndex = Math.abs(hash) % SELLERS.length;
  return SELLERS[sellerIndex] || 'sara'; // Fallback на случай ошибки
}
  24 