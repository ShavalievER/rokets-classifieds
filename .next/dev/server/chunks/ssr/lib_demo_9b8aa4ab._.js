module.exports = [
"[project]/lib/demo/products.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_PRODUCTS",
    ()=>DEMO_PRODUCTS,
    "getDemoCollectionProducts",
    ()=>getDemoCollectionProducts,
    "getDemoProduct",
    ()=>getDemoProduct,
    "getDemoProductRecommendations",
    ()=>getDemoProductRecommendations,
    "getDemoProducts",
    ()=>getDemoProducts
]);
// Product to category and subcategory mapping
// Using new category structure from Google Sheets: https://docs.google.com/spreadsheets/d/1Z8D7fMD_Nyo2BOj6Ua3PYdJI4LTFo5h5q9e3SdDogPc/edit
const PRODUCT_CATEGORIES = {
    // Furniture - Sofas & Couches
    'sofa-modern': {
        category: 'furniture',
        subcategory: 'sofas-couches',
        location: 'Dubai'
    },
    // Furniture - Dining Tables
    'dining-table': {
        category: 'furniture',
        subcategory: 'dining-tables',
        location: 'Abu Dhabi'
    },
    // Furniture - Office Chairs
    'office-chair': {
        category: 'furniture',
        subcategory: 'office-chairs',
        location: 'Sharjah'
    },
    // Toys - Educational & Learning Toys
    'lego-set': {
        category: 'toys',
        subcategory: 'educational-learning-toys',
        location: 'Ajman'
    },
    // Toys - Preschool Toys
    'doll-house': {
        category: 'toys',
        subcategory: 'preschool-toys-4-6-years',
        location: 'RAK'
    },
    // Toys - Toddler Toys
    'bicycle-kids': {
        category: 'toys',
        subcategory: 'toddler-toys-2-4-years',
        location: 'Dubai'
    }
};
/**
 * Demo product data for working without Shopify
 * Based on sellers from listing-sellers.ts
 */ const createImage = (url, alt = '')=>({
        url,
        altText: alt,
        width: 800,
        height: 800
    });
const createVariant = (id, title, price, available = true)=>({
        id,
        title,
        availableForSale: available,
        selectedOptions: [],
        price: {
            amount: price,
            currencyCode: 'AED'
        }
    });
const createProduct = (handle, title, description, price, imageUrl, sellerLocation, additionalImageQueries)=>{
    const variantId = `gid://shopify/ProductVariant/${handle}-variant`;
    const productId = `gid://shopify/Product/${handle}`;
    // Create additional images with different views
    const additionalImages = additionalImageQueries ? additionalImageQueries.map((query, index)=>{
        // If query is already a full URL, use it; otherwise use it as-is
        const url = query.startsWith('http') ? query : query;
        return createImage(url, `${title} - View ${index + 1}`);
    }) : [
        createImage(imageUrl, `${title} - View 1`),
        createImage(imageUrl, `${title} - View 2`)
    ];
    return {
        id: productId,
        handle,
        availableForSale: true,
        title,
        description,
        descriptionHtml: `<p>${description}</p>`,
        options: [
            {
                id: `${productId}-option`,
                name: 'Size',
                values: [
                    'Default'
                ]
            }
        ],
        priceRange: {
            maxVariantPrice: {
                amount: price,
                currencyCode: 'AED'
            },
            minVariantPrice: {
                amount: price,
                currencyCode: 'AED'
            }
        },
        variants: [
            createVariant(variantId, 'Default', price)
        ],
        featuredImage: createImage(imageUrl, title),
        images: (()=>{
            // Create unique images array, removing duplicates
            const allImages = [
                createImage(imageUrl, `${title} - Main`),
                ...additionalImages
            ];
            const uniqueImages = [];
            const seenUrls = new Set();
            for (const img of allImages){
                if (!seenUrls.has(img.url)) {
                    seenUrls.add(img.url);
                    uniqueImages.push(img);
                }
            }
            return uniqueImages;
        })(),
        seo: {
            title: `${title} | Next.js Commerce`,
            description
        },
        tags: [
            PRODUCT_CATEGORIES[handle]?.category || '',
            PRODUCT_CATEGORIES[handle]?.subcategory || '',
            PRODUCT_CATEGORIES[handle]?.location || ''
        ].filter(Boolean),
        // Store metadata for filtering
        metafields: [
            {
                id: `${productId}-category`,
                namespace: 'custom',
                key: 'category',
                value: PRODUCT_CATEGORIES[handle]?.category || '',
                type: 'single_line_text_field'
            },
            {
                id: `${productId}-subcategory`,
                namespace: 'custom',
                key: 'subcategory',
                value: PRODUCT_CATEGORIES[handle]?.subcategory || '',
                type: 'single_line_text_field'
            },
            {
                id: `${productId}-sellerLocation`,
                namespace: 'custom',
                key: 'sellerLocation',
                value: PRODUCT_CATEGORIES[handle]?.location || sellerLocation,
                type: 'single_line_text_field'
            }
        ],
        updatedAt: new Date().toISOString()
    };
};
const DEMO_PRODUCTS = [
    // Clothing
    createProduct('winter-jacket-mens', 'Men\'s Winter Jacket', 'Warm winter jacket in excellent condition. Size L.', '450.00', 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Dubai', [
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ]),
    createProduct('designer-dress', 'Designer Dress', 'Elegant dress, worn once. Size M.', '350.00', 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Abu Dhabi', [
        'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ]),
    createProduct('sneakers-nike', 'Nike Sneakers', 'Nike sneakers in good condition. Size 42.', '280.00', 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Sharjah', [
        'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ]),
    // Kids Toys
    createProduct('lego-set', 'LEGO Set', 'Large LEGO set with all pieces included. For children 6+ years.', '150.00', 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Ajman', [
        'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/1606312619150-4c643af16b2e/pexels-photo-1606312619150-4c643af16b2e.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ]),
    createProduct('doll-house', 'Doll House', 'Beautiful doll house with furniture. In excellent condition.', '200.00', 'https://images.pexels.com/photos/1606312619070-df48d6a8e480/pexels-photo-1606312619070-df48d6a8e480.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'RAK', [
        'https://images.pexels.com/photos/1606312619070-df48d6a8e480/pexels-photo-1606312619070-df48d6a8e480.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ]),
    createProduct('bicycle-kids', 'Kids Bicycle', 'Children\'s bicycle suitable for ages 5-8. Good condition.', '180.00', 'https://images.pexels.com/photos/2909077/pexels-photo-2909077.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Dubai', [
        'https://images.pexels.com/photos/2909077/pexels-photo-2909077.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/2909077/pexels-photo-2909077.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop&q=80'
    ]),
    // Furniture
    createProduct('sofa-modern', 'Modern Sofa', 'Comfortable sofa in excellent condition. Perfect for living room.', '1200.00', 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Dubai', [
        'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ]),
    createProduct('dining-table', 'Dining Table', 'Wooden dining table for 6 people. Classic design.', '800.00', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Abu Dhabi', [
        'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop&q=80'
    ]),
    createProduct('office-chair', 'Office Chair', 'Ergonomic office chair. Excellent condition.', '350.00', 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Sharjah', [
        'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop&q=80'
    ]),
    // Electronics
    createProduct('laptop-macbook', 'MacBook Pro', 'MacBook Pro 13", 2020. In excellent condition, everything works.', '2500.00', 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Ajman', [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ]),
    createProduct('iphone-12', 'iPhone 12', 'iPhone 12, 128GB. Excellent condition, all accessories included.', '1800.00', 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'RAK', [
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop&q=80'
    ]),
    createProduct('tv-samsung', 'Samsung TV', 'Samsung Smart TV 55", 4K. In excellent condition.', '2200.00', 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Dubai', [
        'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/1522869636450-0fe4ec6fa804/pexels-photo-1522869636450-0fe4ec6fa804.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ]),
    // Auto Parts
    createProduct('car-battery', 'Car Battery', 'New car battery 12V 60Ah. Suitable for most passenger cars.', '350.00', 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Dubai', [
        'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/163945/pexels-photo-163945.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ]),
    createProduct('tires-set', 'Tire Set', 'Set of tires 205/55 R16. Tread remaining 70%.', '600.00', 'https://images.pexels.com/photos/163945/pexels-photo-163945.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Abu Dhabi', [
        'https://images.pexels.com/photos/163945/pexels-photo-163945.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/163945/pexels-photo-163945.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop&q=80'
    ]),
    createProduct('headlights-led', 'LED Headlights', 'LED headlights for Toyota Camry. New, in original packaging.', '450.00', 'https://images.pexels.com/photos/1549317661-b28c40b685ca/pexels-photo-1549317661-b28c40b685ca.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop', 'Sharjah', [
        'https://images.pexels.com/photos/1549317661-b28c40b685ca/pexels-photo-1549317661-b28c40b685ca.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ])
];
function getDemoProduct(handle) {
    return DEMO_PRODUCTS.find((p)=>p.handle === handle);
}
function getDemoProducts() {
    return DEMO_PRODUCTS;
}
function getDemoCollectionProducts(collection, filters) {
    // Special collections for homepage
    if (collection === 'hidden-homepage-featured-items') {
        return DEMO_PRODUCTS.slice(0, 3);
    }
    if (collection === 'hidden-homepage-carousel') {
        return DEMO_PRODUCTS.slice(0, 5);
    }
    let products = DEMO_PRODUCTS;
    // Filter by category or subcategory
    // Check if collection is a main category or subcategory
    const isMainCategory = Object.values(PRODUCT_CATEGORIES).some((info)=>info.category === collection);
    const isSubcategory = Object.values(PRODUCT_CATEGORIES).some((info)=>info.subcategory === collection);
    if (isSubcategory) {
        // Filter by subcategory
        products = products.filter((p)=>{
            const productInfo = PRODUCT_CATEGORIES[p.handle];
            return productInfo?.subcategory === collection;
        });
    } else if (isMainCategory) {
        // Filter by main category
        products = products.filter((p)=>{
            const productInfo = PRODUCT_CATEGORIES[p.handle];
            return productInfo?.category === collection;
        });
    } else if (collection && collection !== 'hidden-homepage-featured-items' && collection !== 'hidden-homepage-carousel') {
        // If collection doesn't match any category, return empty or all products
        // For now, return all products if collection doesn't match
        products = DEMO_PRODUCTS;
    }
    // Apply additional filters
    if (filters) {
        if (filters.subcategory) {
            products = products.filter((p)=>{
                const productInfo = PRODUCT_CATEGORIES[p.handle];
                return productInfo?.subcategory === filters.subcategory;
            });
        }
        if (filters.minPrice || filters.maxPrice) {
            products = products.filter((p)=>{
                const price = parseFloat(p.priceRange.maxVariantPrice.amount);
                if (filters.minPrice && price < parseFloat(filters.minPrice)) return false;
                if (filters.maxPrice && price > parseFloat(filters.maxPrice)) return false;
                return true;
            });
        }
        if (filters.keywords) {
            const keywordLower = filters.keywords.toLowerCase();
            products = products.filter((p)=>p.title.toLowerCase().includes(keywordLower) || p.description.toLowerCase().includes(keywordLower));
        }
        if (filters.location) {
            products = products.filter((p)=>{
                const productInfo = PRODUCT_CATEGORIES[p.handle];
                return productInfo?.location === filters.location;
            });
        }
    }
    return products;
}
function getDemoProductRecommendations(productId) {
    // Return random products excluding current one
    const currentProduct = DEMO_PRODUCTS.find((p)=>p.id === productId);
    if (!currentProduct) return DEMO_PRODUCTS.slice(0, 4);
    return DEMO_PRODUCTS.filter((p)=>p.id !== productId).slice(0, 4);
}
}),
"[project]/lib/demo/cart.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToDemoCart",
    ()=>addToDemoCart,
    "createDemoCart",
    ()=>createDemoCart,
    "getDemoCart",
    ()=>getDemoCart,
    "removeFromDemoCart",
    ()=>removeFromDemoCart,
    "updateDemoCart",
    ()=>updateDemoCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo/products.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
/**
 * Демо-реализация функций корзины для работы без Shopify
 * Использует cookies для хранения данных корзины
 */ // Хранилище корзин в памяти (для демо)
// В реальном приложении это должно быть в базе данных
const cartStorage = new Map();
function createEmptyCart() {
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
function calculateCartTotals(items) {
    let subtotal = 0;
    items.forEach((item)=>{
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
async function createDemoCart() {
    const cart = createEmptyCart();
    cartStorage.set(cart.id, cart);
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('cartId', cart.id);
    return cart;
}
async function getDemoCart(cartId) {
    return cartStorage.get(cartId);
}
async function addToDemoCart(cartId, lines, deliveryPrice) {
    let cart = cartStorage.get(cartId);
    if (!cart) {
        cart = createEmptyCart();
        cart.id = cartId;
        cartStorage.set(cartId, cart);
    }
    // Добавляем товары в корзину
    for (const line of lines){
        // Извлекаем handle из merchandiseId (может быть полный ID или handle)
        let handle = line.merchandiseId;
        if (handle.includes('/')) {
            // Если это полный ID типа "gid://shopify/ProductVariant/handle-variant"
            const parts = handle.split('/');
            const lastPart = parts[parts.length - 1];
            // Убираем суффикс "-variant" если есть
            handle = lastPart.replace(/-variant$/, '');
        }
        const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDemoProduct"])(handle);
        if (!product) {
            console.warn(`Product not found for handle: ${handle}`);
            continue;
        }
        const variant = product.variants[0];
        const existingItem = cart.lines.find((item)=>item.merchandise.id === variant.id);
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
            const cartItem = {
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
    cart.totalQuantity = cart.lines.reduce((sum, item)=>sum + item.quantity, 0);
    cartStorage.set(cartId, cart);
    return cart;
}
async function removeFromDemoCart(cartId, lineIds) {
    const cart = cartStorage.get(cartId);
    if (!cart) {
        throw new Error('Cart not found');
    }
    cart.lines = cart.lines.filter((item)=>!lineIds.includes(item.id || ''));
    // Пересчитываем итоги
    const totals = calculateCartTotals(cart.lines);
    cart.cost.subtotalAmount.amount = totals.subtotal;
    cart.cost.totalAmount.amount = totals.total;
    cart.cost.totalTaxAmount.amount = totals.tax;
    cart.totalQuantity = cart.lines.reduce((sum, item)=>sum + item.quantity, 0);
    cartStorage.set(cartId, cart);
    return cart;
}
async function updateDemoCart(cartId, lines) {
    const cart = cartStorage.get(cartId);
    if (!cart) {
        throw new Error('Cart not found');
    }
    // Обновляем товары
    for (const line of lines){
        const item = cart.lines.find((i)=>i.id === line.id);
        if (item) {
            if (line.quantity === 0) {
                // Удаляем товар
                cart.lines = cart.lines.filter((i)=>i.id !== line.id);
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
    cart.totalQuantity = cart.lines.reduce((sum, item)=>sum + item.quantity, 0);
    cartStorage.set(cartId, cart);
    return cart;
}
}),
];

//# sourceMappingURL=lib_demo_9b8aa4ab._.js.map