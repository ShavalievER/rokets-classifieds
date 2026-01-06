module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/opengraph-image--metadata.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/opengraph-image--metadata.js [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/error.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/error.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/demo/categories.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORY_NAMES",
    ()=>CATEGORY_NAMES,
    "CATEGORY_STRUCTURE",
    ()=>CATEGORY_STRUCTURE,
    "DEMO_COLLECTIONS",
    ()=>DEMO_COLLECTIONS,
    "getAllSubcategories",
    ()=>getAllSubcategories,
    "getCategoryByHandle",
    ()=>getCategoryByHandle,
    "getCategoryName",
    ()=>getCategoryName,
    "getSubcategoryByHandle",
    ()=>getSubcategoryByHandle
]);
/**
 * Two-level category structure for classifieds
 * Based on: https://docs.google.com/spreadsheets/d/1Z8D7fMD_Nyo2BOj6Ua3PYdJI4LTFo5h5q9e3SdDogPc/edit
 */ // Helper function to create handle from name
function createHandle(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
const CATEGORY_STRUCTURE = [
    {
        id: 'furniture',
        name: 'Furniture',
        handle: 'furniture',
        subcategories: [
            {
                id: 'sofas-couches',
                name: 'Sofas & Couches',
                handle: 'sofas-couches'
            },
            {
                id: 'armchairs',
                name: 'Armchairs',
                handle: 'armchairs'
            },
            {
                id: 'recliners',
                name: 'Recliners',
                handle: 'recliners'
            },
            {
                id: 'sofa-beds',
                name: 'Sofa Beds',
                handle: 'sofa-beds'
            },
            {
                id: 'living-room-sets',
                name: 'Living Room Sets',
                handle: 'living-room-sets'
            },
            {
                id: 'tv-stands-media-units',
                name: 'TV Stands & Media Units',
                handle: 'tv-stands-media-units'
            },
            {
                id: 'coffee-tables',
                name: 'Coffee Tables',
                handle: 'coffee-tables'
            },
            {
                id: 'side-tables',
                name: 'Side Tables',
                handle: 'side-tables'
            },
            {
                id: 'dining-tables',
                name: 'Dining Tables',
                handle: 'dining-tables'
            },
            {
                id: 'dining-chairs',
                name: 'Dining Chairs',
                handle: 'dining-chairs'
            },
            {
                id: 'dining-sets',
                name: 'Dining Sets',
                handle: 'dining-sets'
            },
            {
                id: 'beds',
                name: 'Beds',
                handle: 'beds'
            },
            {
                id: 'mattresses',
                name: 'Mattresses',
                handle: 'mattresses'
            },
            {
                id: 'bed-frames',
                name: 'Bed Frames',
                handle: 'bed-frames'
            },
            {
                id: 'wardrobes',
                name: 'Wardrobes',
                handle: 'wardrobes'
            },
            {
                id: 'dressers-chests',
                name: 'Dressers & Chests',
                handle: 'dressers-chests'
            },
            {
                id: 'nightstands',
                name: 'Nightstands',
                handle: 'nightstands'
            },
            {
                id: 'bedroom-sets',
                name: 'Bedroom Sets',
                handle: 'bedroom-sets'
            },
            {
                id: 'office-desks',
                name: 'Office Desks',
                handle: 'office-desks'
            },
            {
                id: 'office-chairs',
                name: 'Office Chairs',
                handle: 'office-chairs'
            },
            {
                id: 'bookcases-shelves',
                name: 'Bookcases & Shelves',
                handle: 'bookcases-shelves'
            },
            {
                id: 'cabinets-sideboards',
                name: 'Cabinets & Sideboards',
                handle: 'cabinets-sideboards'
            },
            {
                id: 'shoe-racks',
                name: 'Shoe Racks',
                handle: 'shoe-racks'
            },
            {
                id: 'storage-units',
                name: 'Storage Units',
                handle: 'storage-units'
            },
            {
                id: 'kids-furniture',
                name: 'Kids Furniture',
                handle: 'kids-furniture'
            },
            {
                id: 'outdoor-furniture',
                name: 'Outdoor Furniture',
                handle: 'outdoor-furniture'
            },
            {
                id: 'garden-tables-chairs',
                name: 'Garden Tables & Chairs',
                handle: 'garden-tables-chairs'
            },
            {
                id: 'balcony-furniture',
                name: 'Balcony Furniture',
                handle: 'balcony-furniture'
            },
            {
                id: 'bar-furniture',
                name: 'Bar Furniture',
                handle: 'bar-furniture'
            },
            {
                id: 'mirrors',
                name: 'Mirrors',
                handle: 'mirrors'
            }
        ]
    },
    {
        id: 'sporting-goods',
        name: 'Sporting Goods',
        handle: 'sporting-goods',
        subcategories: [
            {
                id: 'scooters-skateboards',
                name: 'Scooters & Skateboards',
                handle: 'scooters-skateboards'
            },
            {
                id: 'running-athletics',
                name: 'Running & Athletics',
                handle: 'running-athletics'
            },
            {
                id: 'swimming-water-sports',
                name: 'Swimming & Water Sports',
                handle: 'swimming-water-sports'
            },
            {
                id: 'diving-snorkeling',
                name: 'Diving & Snorkeling',
                handle: 'diving-snorkeling'
            },
            {
                id: 'surfing-paddleboarding',
                name: 'Surfing & Paddleboarding',
                handle: 'surfing-paddleboarding'
            },
            {
                id: 'fishing',
                name: 'Fishing',
                handle: 'fishing'
            },
            {
                id: 'hunting-archery',
                name: 'Hunting & Archery',
                handle: 'hunting-archery'
            },
            {
                id: 'outdoor-camping',
                name: 'Outdoor & Camping',
                handle: 'outdoor-camping'
            },
            {
                id: 'hiking-trekking',
                name: 'Hiking & Trekking',
                handle: 'hiking-trekking'
            },
            {
                id: 'climbing-mountaineering',
                name: 'Climbing & Mountaineering',
                handle: 'climbing-mountaineering'
            },
            {
                id: 'winter-sports',
                name: 'Winter Sports',
                handle: 'winter-sports'
            },
            {
                id: 'skiing',
                name: 'Skiing',
                handle: 'skiing'
            },
            {
                id: 'snowboarding',
                name: 'Snowboarding',
                handle: 'snowboarding'
            },
            {
                id: 'golf-equipment',
                name: 'Golf Equipment',
                handle: 'golf-equipment'
            },
            {
                id: 'equestrian-sports',
                name: 'Equestrian Sports',
                handle: 'equestrian-sports'
            },
            {
                id: 'motorsports-gear',
                name: 'Motorsports Gear',
                handle: 'motorsports-gear'
            },
            {
                id: 'accessories-protection',
                name: 'Accessories & Protection',
                handle: 'accessories-protection'
            },
            {
                id: 'sports-bags',
                name: 'Sports Bags',
                handle: 'sports-bags'
            },
            {
                id: 'sports-nutrition',
                name: 'Sports Nutrition',
                handle: 'sports-nutrition'
            },
            {
                id: 'recovery-physiotherapy',
                name: 'Recovery & Physiotherapy',
                handle: 'recovery-physiotherapy'
            },
            {
                id: 'kids-sports-equipment',
                name: 'Kids Sports Equipment',
                handle: 'kids-sports-equipment'
            },
            {
                id: 'refurbished-used-equipment',
                name: 'Refurbished / Used Equipment',
                handle: 'refurbished-used-equipment'
            },
            {
                id: 'professional-commercial-equipment',
                name: 'Professional / Commercial Equipment',
                handle: 'professional-commercial-equipment'
            },
            {
                id: 'other-sporting-goods',
                name: 'Other Sporting Goods',
                handle: 'other-sporting-goods'
            }
        ]
    },
    {
        id: 'toys',
        name: 'Toys',
        handle: 'toys',
        subcategories: [
            {
                id: 'baby-toys-0-2-years',
                name: 'Baby Toys (0–2 years)',
                handle: 'baby-toys-0-2-years'
            },
            {
                id: 'toddler-toys-2-4-years',
                name: 'Toddler Toys (2–4 years)',
                handle: 'toddler-toys-2-4-years'
            },
            {
                id: 'preschool-toys-4-6-years',
                name: 'Preschool Toys (4–6 years)',
                handle: 'preschool-toys-4-6-years'
            },
            {
                id: 'educational-learning-toys',
                name: 'Educational & Learning Toys',
                handle: 'educational-learning-toys'
            },
            {
                id: 'montessori-toys',
                name: 'Montessori Toys',
                handle: 'montessori-toys'
            }
        ]
    },
    {
        id: 'auto-parts',
        name: 'Auto Parts',
        handle: 'auto-parts',
        subcategories: [
            {
                id: 'engine-parts',
                name: 'Engine Parts',
                handle: 'engine-parts'
            },
            {
                id: 'body-parts',
                name: 'Body Parts',
                handle: 'body-parts'
            },
            {
                id: 'interior-parts',
                name: 'Interior Parts',
                handle: 'interior-parts'
            },
            {
                id: 'tires-wheels',
                name: 'Tires & Wheels',
                handle: 'tires-wheels'
            },
            {
                id: 'electronics-parts',
                name: 'Electronics & Parts',
                handle: 'electronics-parts'
            },
            {
                id: 'accessories',
                name: 'Accessories',
                handle: 'accessories'
            }
        ]
    },
    {
        id: 'babies',
        name: 'Babies',
        handle: 'babies',
        subcategories: [
            {
                id: 'baby-clothing',
                name: 'Baby Clothing',
                handle: 'baby-clothing'
            },
            {
                id: 'baby-gear',
                name: 'Baby Gear',
                handle: 'baby-gear'
            },
            {
                id: 'nursery-furniture',
                name: 'Nursery Furniture',
                handle: 'nursery-furniture'
            },
            {
                id: 'feeding',
                name: 'Feeding',
                handle: 'feeding'
            },
            {
                id: 'strollers-carriers',
                name: 'Strollers & Carriers',
                handle: 'strollers-carriers'
            },
            {
                id: 'baby-safety',
                name: 'Baby Safety',
                handle: 'baby-safety'
            }
        ]
    },
    {
        id: 'clothing',
        name: 'Clothing',
        handle: 'clothing',
        subcategories: [
            {
                id: 'mens-clothing',
                name: "Men's Clothing",
                handle: 'mens-clothing'
            },
            {
                id: 'womens-clothing',
                name: "Women's Clothing",
                handle: 'womens-clothing'
            },
            {
                id: 'kids-clothing',
                name: "Kids' Clothing",
                handle: 'kids-clothing'
            },
            {
                id: 'shoes',
                name: 'Shoes',
                handle: 'shoes'
            },
            {
                id: 'accessories',
                name: 'Accessories',
                handle: 'accessories'
            },
            {
                id: 'bags-luggage',
                name: 'Bags & Luggage',
                handle: 'bags-luggage'
            }
        ]
    },
    {
        id: 'electronics',
        name: 'Electronics',
        handle: 'electronics',
        subcategories: [
            {
                id: 'mobile-phones',
                name: 'Mobile Phones',
                handle: 'mobile-phones'
            },
            {
                id: 'computers',
                name: 'Computers & Tablets',
                handle: 'computers'
            },
            {
                id: 'tv-video',
                name: 'TV, Audio & Video',
                handle: 'tv-video'
            },
            {
                id: 'cameras',
                name: 'Cameras',
                handle: 'cameras'
            },
            {
                id: 'gaming',
                name: 'Gaming',
                handle: 'gaming'
            },
            {
                id: 'audio',
                name: 'Audio Equipment',
                handle: 'audio'
            }
        ]
    },
    {
        id: 'home-garden',
        name: 'Home & Garden',
        handle: 'home-garden',
        subcategories: [
            {
                id: 'home-decor',
                name: 'Home Decor',
                handle: 'home-decor'
            },
            {
                id: 'kitchen-dining',
                name: 'Kitchen & Dining',
                handle: 'kitchen-dining'
            },
            {
                id: 'bedding-bath',
                name: 'Bedding & Bath',
                handle: 'bedding-bath'
            },
            {
                id: 'garden-tools',
                name: 'Garden Tools',
                handle: 'garden-tools'
            },
            {
                id: 'outdoor-living',
                name: 'Outdoor Living',
                handle: 'outdoor-living'
            },
            {
                id: 'home-improvement',
                name: 'Home Improvement',
                handle: 'home-improvement'
            }
        ]
    },
    {
        id: 'fashion-beauty',
        name: 'Fashion & Beauty',
        handle: 'fashion-beauty',
        subcategories: [
            {
                id: 'cosmetics',
                name: 'Cosmetics',
                handle: 'cosmetics'
            },
            {
                id: 'skincare',
                name: 'Skincare',
                handle: 'skincare'
            },
            {
                id: 'fragrances',
                name: 'Fragrances',
                handle: 'fragrances'
            },
            {
                id: 'hair-care',
                name: 'Hair Care',
                handle: 'hair-care'
            },
            {
                id: 'jewelry',
                name: 'Jewelry',
                handle: 'jewelry'
            },
            {
                id: 'watches',
                name: 'Watches',
                handle: 'watches'
            }
        ]
    }
];
const CATEGORY_NAMES = {};
// Populate CATEGORY_NAMES from CATEGORY_STRUCTURE
CATEGORY_STRUCTURE.forEach((category)=>{
    CATEGORY_NAMES[category.handle] = category.name;
    category.subcategories?.forEach((sub)=>{
        CATEGORY_NAMES[sub.handle] = sub.name;
    });
});
const DEMO_COLLECTIONS = CATEGORY_STRUCTURE.flatMap((category)=>{
    const collections = [];
    // Add main category
    collections.push({
        handle: category.handle,
        title: category.name,
        description: `${category.name} category`,
        seo: {
            title: category.name,
            description: `${category.name} category`
        },
        path: `/search/${category.handle}`,
        updatedAt: new Date().toISOString()
    });
    // Add subcategories
    if (category.subcategories) {
        category.subcategories.forEach((sub)=>{
            collections.push({
                handle: sub.handle,
                title: sub.name,
                description: `${sub.name} in ${category.name}`,
                seo: {
                    title: sub.name,
                    description: `${sub.name} in ${category.name}`
                },
                path: `/search/${category.handle}/${sub.handle}`,
                updatedAt: new Date().toISOString()
            });
        });
    }
    return collections;
});
function getCategoryName(handle) {
    return CATEGORY_NAMES[handle] || handle;
}
function getCategoryByHandle(handle) {
    return CATEGORY_STRUCTURE.find((cat)=>cat.handle === handle);
}
function getSubcategoryByHandle(categoryHandle, subcategoryHandle) {
    const category = getCategoryByHandle(categoryHandle);
    return category?.subcategories?.find((sub)=>sub.handle === subcategoryHandle);
}
function getAllSubcategories() {
    return CATEGORY_STRUCTURE.flatMap((category)=>(category.subcategories || []).map((sub)=>({
                ...sub,
                parentHandle: category.handle
            })));
}
}),
"[project]/lib/demo/products.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_PRODUCTS",
    ()=>DEMO_PRODUCTS,
    "PRODUCT_CATEGORIES",
    ()=>PRODUCT_CATEGORIES,
    "getDemoCollectionProducts",
    ()=>getDemoCollectionProducts,
    "getDemoProduct",
    ()=>getDemoProduct,
    "getDemoProductRecommendations",
    ()=>getDemoProductRecommendations,
    "getDemoProducts",
    ()=>getDemoProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo/categories.ts [app-rsc] (ecmascript)");
;
/**
 * Demo product data for working without Shopify
 * Generated products: 10 per subcategory
 */ const LOCATIONS = [
    'Dubai',
    'Sharjah',
    'Abu Dhabi',
    'Ajman',
    'RAK'
];
// Helper function to get random location
function getRandomLocation() {
    return LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
}
// Helper function to get random price in range
function getRandomPrice(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(2);
}
const createImage = (url, alt = '')=>({
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
const createProduct = (handle, title, description, price, imageUrl, sellerLocation, category, subcategory, additionalImageQueries)=>{
    const variantId = `gid://shopify/ProductVariant/${handle}-variant`;
    const productId = `gid://shopify/Product/${handle}`;
    // Create additional images with different views
    const additionalImages = additionalImageQueries ? additionalImageQueries.map((query, index)=>{
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
            title: `${title} | Rockets Classifieds`,
            description
        },
        tags: [
            category,
            subcategory,
            sellerLocation
        ].filter(Boolean),
        metafields: [
            {
                id: `${productId}-category`,
                namespace: 'custom',
                key: 'category',
                value: category,
                type: 'single_line_text_field'
            },
            {
                id: `${productId}-subcategory`,
                namespace: 'custom',
                key: 'subcategory',
                value: subcategory,
                type: 'single_line_text_field'
            },
            {
                id: `${productId}-location`,
                namespace: 'custom',
                key: 'location',
                value: sellerLocation,
                type: 'single_line_text_field'
            }
        ]
    };
};
// Product templates for different subcategories
const PRODUCT_TEMPLATES = {
    // Furniture
    'sofas-couches': {
        titles: [
            'Modern 3-Seater Sofa',
            'Leather Sectional Sofa',
            'Fabric Corner Sofa',
            'L-Shaped Sofa',
            'Reclining Sofa Set',
            'Velvet Sofa',
            'Chesterfield Sofa',
            'Sleeper Sofa',
            'Modular Sofa',
            'Contemporary Sofa'
        ],
        descriptions: [
            'Beautiful modern 3-seater sofa in excellent condition. Upholstered in premium fabric, perfect for any living room. Comfortable cushions, sturdy frame. No stains or damage. Dimensions: 220cm x 90cm. Pickup available or delivery can be arranged.',
            'Premium leather sectional sofa, well-maintained and in great condition. Genuine leather upholstery, comfortable seating for 5-6 people. Includes corner piece and chaise. Some minor wear on armrests but overall excellent condition. Perfect for large living spaces.',
            'Spacious fabric corner sofa in excellent condition. Soft, comfortable cushions, neutral color that matches any decor. Great for family rooms. No pets, no smoking. Dimensions: 280cm x 200cm. Ready for immediate pickup.',
            'Modern L-shaped sofa with built-in storage compartments. Contemporary design, perfect for small to medium living rooms. Fabric upholstery in excellent condition. Includes throw pillows. Great space-saving solution.',
            'Reclining sofa set with 3 seats, all with individual reclining mechanisms. Power recliners with USB charging ports. Like new condition, barely used. Includes remote controls. Perfect for home theater or living room.',
            'Luxurious velvet sofa in emerald green color. Premium quality velvet fabric, deep comfortable seating. Modern design with elegant brass legs. Excellent condition, no stains or marks. Adds sophistication to any room.',
            'Classic Chesterfield sofa in vintage style. Button-tufted back, rolled arms, genuine leather. Timeless design, well-maintained. Some patina adds character. Perfect for traditional or eclectic interiors. Dimensions: 200cm x 95cm.',
            'Convertible sleeper sofa, perfect for guests. Pulls out into full-size bed. Comfortable seating and sleeping. Neutral beige fabric, easy to clean. Includes mattress. Great for studio apartments or guest rooms.',
            'Modular sofa with customizable configuration. Can be arranged in multiple ways. Includes 3 base pieces and corner connector. Premium fabric, excellent condition. Perfect for flexible living spaces. All pieces included.',
            'Contemporary design sofa, like new condition. Modern minimalist style with clean lines. High-quality fabric upholstery, comfortable cushions. Neutral gray color. Barely used, still has original tags. Perfect for modern homes.'
        ],
        priceRange: [
            800,
            3500
        ],
        imageBase: 'sofa'
    },
    'armchairs': {
        titles: [
            'Leather Armchair',
            'Recliner Armchair',
            'Wingback Armchair',
            'Modern Armchair',
            'Vintage Armchair',
            'Reading Chair',
            'Swivel Armchair',
            'Accent Chair',
            'Rocking Chair',
            'Executive Armchair'
        ],
        descriptions: [
            'Premium leather armchair in excellent condition. Genuine leather upholstery, comfortable deep seating. Sturdy wooden frame, well-maintained. Perfect for living room or study. No scratches or damage. Dimensions: 85cm x 90cm x 100cm.',
            'Reclining armchair with built-in footrest. Power recliner mechanism, smooth operation. Premium fabric upholstery, excellent condition. Includes remote control. Perfect for relaxation. USB charging port included.',
            'Classic wingback armchair in traditional style. High backrest for excellent support. Premium fabric upholstery, well-maintained. Elegant design, perfect for reading or relaxing. Excellent condition, no damage.',
            'Modern design armchair with sleek lines. Contemporary style, neutral color. High-quality fabric, comfortable cushions. Perfect for modern interiors. Like new condition, barely used.',
            'Vintage style armchair with character. Antique-inspired design, well-preserved. Some patina adds charm. Solid construction, comfortable seating. Perfect for eclectic or traditional decor.',
            'Perfect reading chair with matching ottoman. Ergonomic design for long reading sessions. Premium fabric, excellent condition. Includes throw pillow. Great for home library or living room.',
            'Swivel armchair perfect for office or living room. 360-degree rotation, smooth mechanism. Modern design, comfortable seating. Adjustable height. Excellent condition, fully functional.',
            'Stylish accent chair to complement any room. Unique design, eye-catching style. High-quality materials, excellent condition. Perfect for adding character to your space. Like new.',
            'Traditional rocking chair in excellent condition. Smooth rocking motion, comfortable seating. Solid wood construction, well-maintained. Perfect for nursery or living room. No damage.',
            'Executive office armchair, premium quality. Ergonomic design, excellent support. High-quality leather, professional appearance. Adjustable features. Perfect for home office. Excellent condition.'
        ],
        priceRange: [
            200,
            1200
        ],
        imageBase: 'armchair'
    },
    'recliners': {
        titles: [
            'Electric Recliner',
            'Manual Recliner',
            'Massage Recliner',
            'Leather Recliner',
            'Power Recliner',
            'Wall-Hugger Recliner',
            'Zero Gravity Recliner',
            'Rocking Recliner',
            'Lift Chair Recliner',
            'Theater Recliner'
        ],
        descriptions: [
            'Electric recliner with remote control',
            'Manual recliner in excellent condition',
            'Massage recliner with heat function',
            'Premium leather recliner',
            'Power recliner with USB charging',
            'Space-saving wall-hugger recliner',
            'Zero gravity recliner for ultimate comfort',
            'Rocking recliner chair',
            'Lift chair recliner for elderly',
            'Theater-style recliner'
        ],
        priceRange: [
            400,
            2500
        ],
        imageBase: 'recliner'
    },
    'sofa-beds': {
        titles: [
            'Convertible Sofa Bed',
            'Pull-Out Sofa Bed',
            'Futon Sofa Bed',
            'Daybed Sofa',
            'Trundle Sofa Bed',
            'Sectional Sofa Bed',
            'Modern Sofa Bed',
            'Compact Sofa Bed',
            'Leather Sofa Bed',
            'Sleeper Sofa'
        ],
        descriptions: [
            'Convertible sofa that transforms into bed',
            'Pull-out sofa bed mechanism',
            'Futon-style sofa bed',
            'Daybed that works as sofa',
            'Trundle bed with sofa function',
            'Sectional with sleeper function',
            'Modern design sofa bed',
            'Space-saving compact sofa bed',
            'Leather sofa bed',
            'Comfortable sleeper sofa'
        ],
        priceRange: [
            600,
            2800
        ],
        imageBase: 'sofa-bed'
    },
    'living-room-sets': {
        titles: [
            'Complete Living Room Set',
            '3-Piece Living Room Set',
            '5-Piece Living Room Set',
            'Modern Living Room Set',
            'Traditional Living Room Set',
            'Sectional Living Room Set',
            'Leather Living Room Set',
            'Fabric Living Room Set',
            'Contemporary Living Room Set',
            'Luxury Living Room Set'
        ],
        descriptions: [
            'Complete living room furniture set',
            '3-piece set: sofa, coffee table, TV stand',
            '5-piece set with all furniture',
            'Modern style living room set',
            'Traditional design living room set',
            'Sectional sofa with matching pieces',
            'Leather living room set',
            'Fabric living room set',
            'Contemporary style set',
            'Luxury living room furniture set'
        ],
        priceRange: [
            2000,
            8000
        ],
        imageBase: 'living-room'
    },
    'tv-stands-media-units': {
        titles: [
            'TV Stand with Storage',
            'Wall-Mounted TV Stand',
            'Corner TV Stand',
            'Modern TV Stand',
            'Entertainment Center',
            'TV Console Table',
            'Floating TV Stand',
            'TV Cabinet',
            'Media Console',
            'TV Stand with Fireplace'
        ],
        descriptions: [
            'TV stand with ample storage space',
            'Wall-mounted TV stand',
            'Corner TV stand for space saving',
            'Modern design TV stand',
            'Complete entertainment center',
            'Console table for TV',
            'Floating TV stand design',
            'TV cabinet with doors',
            'Media console with shelves',
            'TV stand with electric fireplace'
        ],
        priceRange: [
            150,
            1200
        ],
        imageBase: 'tv-stand'
    },
    'coffee-tables': {
        titles: [
            'Glass Coffee Table',
            'Wooden Coffee Table',
            'Nesting Coffee Tables',
            'Lift-Top Coffee Table',
            'Round Coffee Table',
            'Oval Coffee Table',
            'Coffee Table with Storage',
            'Modern Coffee Table',
            'Vintage Coffee Table',
            'Coffee Table Set'
        ],
        descriptions: [
            'Glass top coffee table',
            'Solid wood coffee table',
            'Set of nesting coffee tables',
            'Lift-top coffee table with storage',
            'Round coffee table',
            'Oval coffee table',
            'Coffee table with hidden storage',
            'Modern design coffee table',
            'Vintage style coffee table',
            'Coffee table with matching side tables'
        ],
        priceRange: [
            100,
            800
        ],
        imageBase: 'coffee-table'
    },
    'side-tables': {
        titles: [
            'End Table',
            'Side Table with Drawer',
            'Nesting Side Tables',
            'Round Side Table',
            'Square Side Table',
            'Bedside Table',
            'Accent Table',
            'C-table',
            'Modern Side Table',
            'Vintage Side Table'
        ],
        descriptions: [
            'Classic end table',
            'Side table with drawer storage',
            'Set of nesting side tables',
            'Round side table',
            'Square side table',
            'Bedside table for bedroom',
            'Decorative accent table',
            'C-shaped side table',
            'Modern design side table',
            'Vintage style side table'
        ],
        priceRange: [
            50,
            400
        ],
        imageBase: 'side-table'
    },
    'dining-tables': {
        titles: [
            'Dining Table for 6',
            'Extendable Dining Table',
            'Round Dining Table',
            'Rectangular Dining Table',
            'Farmhouse Dining Table',
            'Modern Dining Table',
            'Glass Dining Table',
            'Wooden Dining Table',
            'Dining Table Set',
            'Outdoor Dining Table'
        ],
        descriptions: [
            'Dining table seats 6 people',
            'Extendable dining table for flexibility',
            'Round dining table',
            'Rectangular dining table',
            'Farmhouse style dining table',
            'Modern design dining table',
            'Glass top dining table',
            'Solid wood dining table',
            'Complete dining table with chairs',
            'Weather-resistant outdoor dining table'
        ],
        priceRange: [
            300,
            2500
        ],
        imageBase: 'dining-table'
    },
    'dining-chairs': {
        titles: [
            'Dining Chair Set of 4',
            'Dining Chair Set of 6',
            'Upholstered Dining Chairs',
            'Wooden Dining Chairs',
            'Modern Dining Chairs',
            'Vintage Dining Chairs',
            'Folding Dining Chairs',
            'Bar Stools',
            'Dining Bench',
            'Ergonomic Dining Chairs'
        ],
        descriptions: [
            'Set of 4 dining chairs',
            'Set of 6 matching dining chairs',
            'Comfortable upholstered dining chairs',
            'Classic wooden dining chairs',
            'Modern design dining chairs',
            'Vintage style dining chairs',
            'Space-saving folding chairs',
            'Bar height stools',
            'Dining bench for table',
            'Ergonomic dining chairs'
        ],
        priceRange: [
            150,
            1200
        ],
        imageBase: 'dining-chair'
    },
    'dining-sets': {
        titles: [
            'Complete Dining Set',
            '6-Piece Dining Set',
            '8-Piece Dining Set',
            'Modern Dining Set',
            'Traditional Dining Set',
            'Extendable Dining Set',
            'Round Dining Set',
            'Farmhouse Dining Set',
            'Contemporary Dining Set',
            'Luxury Dining Set'
        ],
        descriptions: [
            'Complete dining room set',
            '6-piece dining set with table and chairs',
            '8-piece dining set',
            'Modern style dining set',
            'Traditional design dining set',
            'Extendable table dining set',
            'Round table dining set',
            'Farmhouse style dining set',
            'Contemporary dining set',
            'Luxury dining room set'
        ],
        priceRange: [
            800,
            5000
        ],
        imageBase: 'dining-set'
    },
    'beds': {
        titles: [
            'Queen Size Bed',
            'King Size Bed',
            'Double Bed',
            'Single Bed',
            'Bunk Bed',
            'Loft Bed',
            'Platform Bed',
            'Storage Bed',
            'Canopy Bed',
            'Sleigh Bed'
        ],
        descriptions: [
            'Queen size bed frame',
            'King size bed frame',
            'Double bed frame',
            'Single bed frame',
            'Bunk bed for kids',
            'Loft bed with desk',
            'Modern platform bed',
            'Bed with storage drawers',
            'Elegant canopy bed',
            'Classic sleigh bed'
        ],
        priceRange: [
            400,
            3000
        ],
        imageBase: 'bed'
    },
    'mattresses': {
        titles: [
            'Memory Foam Mattress',
            'Spring Mattress',
            'Hybrid Mattress',
            'Orthopedic Mattress',
            'Queen Mattress',
            'King Mattress',
            'Double Mattress',
            'Single Mattress',
            'Pillow Top Mattress',
            'Cooling Mattress'
        ],
        descriptions: [
            'Memory foam mattress for comfort',
            'Traditional spring mattress',
            'Hybrid mattress with foam and springs',
            'Orthopedic mattress for back support',
            'Queen size mattress',
            'King size mattress',
            'Double size mattress',
            'Single size mattress',
            'Pillow top mattress',
            'Cooling gel memory foam mattress'
        ],
        priceRange: [
            300,
            2000
        ],
        imageBase: 'mattress'
    },
    'bed-frames': {
        titles: [
            'Metal Bed Frame',
            'Wooden Bed Frame',
            'Upholstered Bed Frame',
            'Platform Bed Frame',
            'Storage Bed Frame',
            'Adjustable Bed Frame',
            'Canopy Bed Frame',
            'Sleigh Bed Frame',
            'Modern Bed Frame',
            'Vintage Bed Frame'
        ],
        descriptions: [
            'Sturdy metal bed frame',
            'Solid wood bed frame',
            'Upholstered headboard bed frame',
            'Low profile platform bed frame',
            'Bed frame with storage',
            'Adjustable height bed frame',
            'Canopy bed frame',
            'Sleigh style bed frame',
            'Modern design bed frame',
            'Vintage style bed frame'
        ],
        priceRange: [
            200,
            1500
        ],
        imageBase: 'bed-frame'
    },
    'wardrobes': {
        titles: [
            'Sliding Door Wardrobe',
            'Mirror Wardrobe',
            'Walk-In Wardrobe',
            'Built-In Wardrobe',
            '3-Door Wardrobe',
            '4-Door Wardrobe',
            'Corner Wardrobe',
            'Modern Wardrobe',
            'Vintage Wardrobe',
            'Kids Wardrobe'
        ],
        descriptions: [
            'Sliding door wardrobe',
            'Wardrobe with mirror doors',
            'Walk-in wardrobe system',
            'Built-in wardrobe unit',
            '3-door wardrobe',
            '4-door wardrobe',
            'Corner wardrobe',
            'Modern design wardrobe',
            'Vintage style wardrobe',
            'Kids wardrobe'
        ],
        priceRange: [
            500,
            3500
        ],
        imageBase: 'wardrobe'
    },
    'dressers-chests': {
        titles: [
            '6-Drawer Dresser',
            '5-Drawer Dresser',
            'Chest of Drawers',
            'Tallboy Dresser',
            'Wide Dresser',
            'Mirror Dresser',
            'Modern Dresser',
            'Vintage Dresser',
            'Antique Dresser',
            'Kids Dresser'
        ],
        descriptions: [
            '6-drawer dresser',
            '5-drawer dresser',
            'Chest of drawers',
            'Tallboy dresser',
            'Wide dresser',
            'Dresser with mirror',
            'Modern design dresser',
            'Vintage style dresser',
            'Antique dresser',
            'Kids dresser'
        ],
        priceRange: [
            200,
            1200
        ],
        imageBase: 'dresser'
    },
    'nightstands': {
        titles: [
            'Bedside Table',
            'Nightstand with Drawer',
            'Modern Nightstand',
            'Vintage Nightstand',
            'Nesting Nightstands',
            'Floating Nightstand',
            'Storage Nightstand',
            'Round Nightstand',
            'Square Nightstand',
            'Lamp Nightstand'
        ],
        descriptions: [
            'Classic bedside table',
            'Nightstand with drawer',
            'Modern design nightstand',
            'Vintage style nightstand',
            'Set of nesting nightstands',
            'Wall-mounted nightstand',
            'Nightstand with storage',
            'Round nightstand',
            'Square nightstand',
            'Nightstand with built-in lamp'
        ],
        priceRange: [
            80,
            400
        ],
        imageBase: 'nightstand'
    },
    'bedroom-sets': {
        titles: [
            'Complete Bedroom Set',
            '5-Piece Bedroom Set',
            '7-Piece Bedroom Set',
            'Modern Bedroom Set',
            'Traditional Bedroom Set',
            'Master Bedroom Set',
            'Kids Bedroom Set',
            'Luxury Bedroom Set',
            'Contemporary Bedroom Set',
            'Minimalist Bedroom Set'
        ],
        descriptions: [
            'Complete bedroom furniture set',
            '5-piece bedroom set',
            '7-piece bedroom set',
            'Modern style bedroom set',
            'Traditional design bedroom set',
            'Master bedroom furniture set',
            'Kids bedroom furniture set',
            'Luxury bedroom set',
            'Contemporary bedroom set',
            'Minimalist bedroom set'
        ],
        priceRange: [
            1500,
            8000
        ],
        imageBase: 'bedroom-set'
    },
    'office-desks': {
        titles: [
            'Office Desk',
            'L-Shaped Desk',
            'Standing Desk',
            'Computer Desk',
            'Writing Desk',
            'Executive Desk',
            'Corner Desk',
            'Modern Desk',
            'Vintage Desk',
            'Adjustable Desk'
        ],
        descriptions: [
            'Standard office desk',
            'L-shaped desk for corner',
            'Adjustable standing desk',
            'Computer desk with cable management',
            'Classic writing desk',
            'Executive office desk',
            'Corner desk',
            'Modern design desk',
            'Vintage style desk',
            'Height-adjustable desk'
        ],
        priceRange: [
            200,
            1500
        ],
        imageBase: 'desk'
    },
    'office-chairs': {
        titles: [
            'Ergonomic Office Chair',
            'Executive Office Chair',
            'Gaming Chair',
            'Mesh Office Chair',
            'Leather Office Chair',
            'Task Chair',
            'Conference Chair',
            'Swivel Chair',
            'Modern Office Chair',
            'Adjustable Office Chair'
        ],
        descriptions: [
            'Ergonomic office chair',
            'Executive leather office chair',
            'Gaming chair with lumbar support',
            'Mesh back office chair',
            'Leather office chair',
            'Task chair for office',
            'Conference room chair',
            'Swivel office chair',
            'Modern design office chair',
            'Fully adjustable office chair'
        ],
        priceRange: [
            150,
            1200
        ],
        imageBase: 'office-chair'
    },
    'bookcases-shelves': {
        titles: [
            'Bookcase',
            'Bookshelf',
            'Wall Shelf',
            'Floating Shelf',
            'Corner Shelf',
            'Ladder Shelf',
            'Cube Shelf',
            'Modern Bookshelf',
            'Vintage Bookcase',
            'Kids Bookshelf'
        ],
        descriptions: [
            'Tall bookcase',
            'Bookshelf with multiple shelves',
            'Wall-mounted shelf',
            'Floating wall shelf',
            'Corner shelf unit',
            'Ladder-style bookshelf',
            'Cube storage shelf',
            'Modern design bookshelf',
            'Vintage style bookcase',
            'Kids bookshelf'
        ],
        priceRange: [
            100,
            800
        ],
        imageBase: 'bookshelf'
    },
    'cabinets-sideboards': {
        titles: [
            'Sideboard',
            'Display Cabinet',
            'Buffet Cabinet',
            'TV Cabinet',
            'Storage Cabinet',
            'Modern Sideboard',
            'Vintage Cabinet',
            'Corner Cabinet',
            'Bar Cabinet',
            'China Cabinet'
        ],
        descriptions: [
            'Dining room sideboard',
            'Display cabinet with glass doors',
            'Buffet cabinet for dining',
            'TV cabinet',
            'Storage cabinet',
            'Modern design sideboard',
            'Vintage style cabinet',
            'Corner cabinet',
            'Bar cabinet',
            'China display cabinet'
        ],
        priceRange: [
            300,
            2000
        ],
        imageBase: 'cabinet'
    },
    'shoe-racks': {
        titles: [
            'Shoe Rack',
            'Shoe Organizer',
            'Shoe Storage',
            'Over-Door Shoe Rack',
            'Shoe Cabinet',
            'Modern Shoe Rack',
            'Bamboo Shoe Rack',
            'Metal Shoe Rack',
            'Wooden Shoe Rack',
            'Shoe Bench'
        ],
        descriptions: [
            'Standard shoe rack',
            'Shoe organizer',
            'Shoe storage unit',
            'Over-door shoe rack',
            'Shoe cabinet with doors',
            'Modern design shoe rack',
            'Bamboo shoe rack',
            'Metal shoe rack',
            'Wooden shoe rack',
            'Shoe bench with storage'
        ],
        priceRange: [
            50,
            300
        ],
        imageBase: 'shoe-rack'
    },
    'storage-units': {
        titles: [
            'Storage Unit',
            'Storage Cabinet',
            'Storage Box',
            'Cube Storage',
            'Plastic Storage',
            'Wooden Storage',
            'Metal Storage',
            'Under-Bed Storage',
            'Storage Ottoman',
            'Storage Bench'
        ],
        descriptions: [
            'Multi-purpose storage unit',
            'Storage cabinet',
            'Storage box set',
            'Cube storage organizer',
            'Plastic storage containers',
            'Wooden storage unit',
            'Metal storage cabinet',
            'Under-bed storage boxes',
            'Storage ottoman',
            'Storage bench'
        ],
        priceRange: [
            80,
            600
        ],
        imageBase: 'storage'
    },
    'kids-furniture': {
        titles: [
            'Kids Bed',
            'Kids Desk',
            'Kids Chair',
            'Kids Table',
            'Kids Wardrobe',
            'Kids Bookshelf',
            'Kids Storage',
            'Bunk Bed',
            'Toddler Bed',
            'Kids Furniture Set'
        ],
        descriptions: [
            'Kids single bed',
            'Kids study desk',
            'Kids chair set',
            'Kids play table',
            'Kids wardrobe',
            'Kids bookshelf',
            'Kids storage unit',
            'Bunk bed for kids',
            'Toddler bed',
            'Complete kids furniture set'
        ],
        priceRange: [
            150,
            1500
        ],
        imageBase: 'kids-furniture'
    },
    'outdoor-furniture': {
        titles: [
            'Outdoor Sofa',
            'Outdoor Dining Set',
            'Outdoor Chairs',
            'Patio Furniture',
            'Garden Furniture',
            'Outdoor Table',
            'Outdoor Lounge',
            'Outdoor Bar Set',
            'Outdoor Storage',
            'Outdoor Furniture Set'
        ],
        descriptions: [
            'Weather-resistant outdoor sofa',
            'Outdoor dining set',
            'Outdoor chairs',
            'Patio furniture set',
            'Garden furniture',
            'Outdoor table',
            'Outdoor lounge set',
            'Outdoor bar furniture',
            'Outdoor storage box',
            'Complete outdoor furniture set'
        ],
        priceRange: [
            300,
            4000
        ],
        imageBase: 'outdoor-furniture'
    },
    'garden-tables-chairs': {
        titles: [
            'Garden Table',
            'Garden Chairs',
            'Garden Dining Set',
            'Patio Table',
            'Patio Chairs',
            'Garden Bench',
            'Garden Lounge',
            'Outdoor Table Set',
            'Garden Furniture',
            'Patio Set'
        ],
        descriptions: [
            'Garden dining table',
            'Garden chairs set',
            'Garden dining set',
            'Patio table',
            'Patio chairs',
            'Garden bench',
            'Garden lounge set',
            'Outdoor table and chairs',
            'Garden furniture',
            'Complete patio set'
        ],
        priceRange: [
            200,
            2500
        ],
        imageBase: 'garden-furniture'
    },
    'balcony-furniture': {
        titles: [
            'Balcony Table',
            'Balcony Chairs',
            'Balcony Set',
            'Balcony Lounge',
            'Compact Balcony Furniture',
            'Folding Balcony Set',
            'Balcony Storage',
            'Balcony Bench',
            'Small Balcony Table',
            'Balcony Furniture Set'
        ],
        descriptions: [
            'Compact balcony table',
            'Balcony chairs',
            'Balcony furniture set',
            'Balcony lounge',
            'Space-saving balcony furniture',
            'Folding balcony set',
            'Balcony storage unit',
            'Balcony bench',
            'Small balcony table',
            'Complete balcony furniture set'
        ],
        priceRange: [
            100,
            800
        ],
        imageBase: 'balcony-furniture'
    },
    'bar-furniture': {
        titles: [
            'Bar Stools',
            'Bar Table',
            'Bar Cabinet',
            'Home Bar',
            'Bar Cart',
            'Bar Set',
            'Modern Bar Stools',
            'Vintage Bar Stools',
            'Bar Counter',
            'Bar Furniture Set'
        ],
        descriptions: [
            'Set of bar stools',
            'Bar height table',
            'Bar cabinet',
            'Home bar unit',
            'Bar cart',
            'Complete bar set',
            'Modern design bar stools',
            'Vintage style bar stools',
            'Bar counter',
            'Complete bar furniture set'
        ],
        priceRange: [
            200,
            2000
        ],
        imageBase: 'bar-furniture'
    },
    'mirrors': {
        titles: [
            'Wall Mirror',
            'Full-Length Mirror',
            'Bathroom Mirror',
            'Dressing Mirror',
            'Decorative Mirror',
            'Round Mirror',
            'Square Mirror',
            'Vintage Mirror',
            'Modern Mirror',
            'Mirror Set'
        ],
        descriptions: [
            'Wall-mounted mirror',
            'Full-length mirror',
            'Bathroom mirror',
            'Dressing table mirror',
            'Decorative wall mirror',
            'Round mirror',
            'Square mirror',
            'Vintage style mirror',
            'Modern design mirror',
            'Set of mirrors'
        ],
        priceRange: [
            50,
            500
        ],
        imageBase: 'mirror'
    },
    // Sporting Goods
    'scooters-skateboards': {
        titles: [
            'Electric Scooter',
            'Kick Scooter',
            'Skateboard',
            'Longboard',
            'Scooter for Kids',
            'Adult Scooter',
            'Folding Scooter',
            'Mountain Scooter',
            'Electric Skateboard',
            'Scooter Accessories'
        ],
        descriptions: [
            'Electric scooter for adults',
            'Kick scooter',
            'Professional skateboard',
            'Longboard for cruising',
            'Kids scooter',
            'Adult kick scooter',
            'Folding scooter',
            'Mountain scooter',
            'Electric skateboard',
            'Scooter accessories and parts'
        ],
        priceRange: [
            80,
            800
        ],
        imageBase: 'scooter'
    },
    'running-athletics': {
        titles: [
            'Running Shoes',
            'Running Watch',
            'Running Shorts',
            'Running Shirt',
            'Running Jacket',
            'Running Belt',
            'Running Socks',
            'Athletic Gear',
            'Track Equipment',
            'Running Accessories'
        ],
        descriptions: [
            'Professional running shoes',
            'GPS running watch',
            'Running shorts',
            'Moisture-wicking running shirt',
            'Running jacket',
            'Running belt for phone',
            'Compression running socks',
            'Complete athletic gear',
            'Track and field equipment',
            'Running accessories'
        ],
        priceRange: [
            50,
            500
        ],
        imageBase: 'running'
    },
    'swimming-water-sports': {
        titles: [
            'Swimming Goggles',
            'Swimming Cap',
            'Swim Fins',
            'Swim Board',
            'Water Polo Gear',
            'Swimming Accessories',
            'Pool Equipment',
            'Swimwear',
            'Snorkel Set',
            'Swimming Gear'
        ],
        descriptions: [
            'Anti-fog swimming goggles',
            'Silicone swimming cap',
            'Swim fins',
            'Kickboard for training',
            'Water polo equipment',
            'Swimming accessories',
            'Pool maintenance equipment',
            'Swimwear set',
            'Snorkel and mask set',
            'Complete swimming gear'
        ],
        priceRange: [
            30,
            300
        ],
        imageBase: 'swimming'
    },
    'diving-snorkeling': {
        titles: [
            'Diving Mask',
            'Snorkel Set',
            'Diving Fins',
            'Wetsuit',
            'Diving Computer',
            'BCD',
            'Regulator',
            'Diving Gear',
            'Snorkeling Gear',
            'Diving Accessories'
        ],
        descriptions: [
            'Professional diving mask',
            'Complete snorkel set',
            'Diving fins',
            'Wetsuit for diving',
            'Diving computer',
            'Buoyancy control device',
            'Diving regulator',
            'Complete diving gear',
            'Snorkeling equipment',
            'Diving accessories'
        ],
        priceRange: [
            100,
            2000
        ],
        imageBase: 'diving'
    },
    'surfing-paddleboarding': {
        titles: [
            'Surfboard',
            'Paddle Board',
            'Surfboard Leash',
            'Wetsuit',
            'Surfboard Bag',
            'Paddle',
            'SUP Board',
            'Surfing Accessories',
            'Paddle Board Accessories',
            'Surfing Gear'
        ],
        descriptions: [
            'Professional surfboard',
            'Stand-up paddle board',
            'Surfboard leash',
            'Surfing wetsuit',
            'Surfboard travel bag',
            'Paddle for SUP',
            'Inflatable SUP board',
            'Surfing accessories',
            'Paddle board accessories',
            'Complete surfing gear'
        ],
        priceRange: [
            200,
            1500
        ],
        imageBase: 'surfing'
    },
    'fishing': {
        titles: [
            'Fishing Rod',
            'Fishing Reel',
            'Fishing Tackle',
            'Fishing Line',
            'Fishing Lures',
            'Fishing Bag',
            'Fishing Chair',
            'Fishing Gear',
            'Tackle Box',
            'Fishing Accessories'
        ],
        descriptions: [
            'Professional fishing rod',
            'Fishing reel',
            'Fishing tackle set',
            'Fishing line',
            'Fishing lures',
            'Fishing gear bag',
            'Fishing chair',
            'Complete fishing gear',
            'Tackle box',
            'Fishing accessories'
        ],
        priceRange: [
            50,
            800
        ],
        imageBase: 'fishing'
    },
    'hunting-archery': {
        titles: [
            'Bow',
            'Arrows',
            'Archery Set',
            'Hunting Gear',
            'Hunting Knife',
            'Hunting Backpack',
            'Archery Target',
            'Bow Case',
            'Hunting Accessories',
            'Archery Equipment'
        ],
        descriptions: [
            'Compound bow',
            'Archery arrows',
            'Complete archery set',
            'Hunting equipment',
            'Hunting knife',
            'Hunting backpack',
            'Archery target',
            'Bow carrying case',
            'Hunting accessories',
            'Complete archery equipment'
        ],
        priceRange: [
            150,
            1200
        ],
        imageBase: 'archery'
    },
    'outdoor-camping': {
        titles: [
            'Camping Tent',
            'Sleeping Bag',
            'Camping Chair',
            'Camping Table',
            'Camping Stove',
            'Camping Lantern',
            'Camping Gear',
            'Camping Backpack',
            'Camping Accessories',
            'Camping Set'
        ],
        descriptions: [
            'Family camping tent',
            'Warm sleeping bag',
            'Folding camping chair',
            'Portable camping table',
            'Camping stove',
            'LED camping lantern',
            'Complete camping gear',
            'Camping backpack',
            'Camping accessories',
            'Complete camping set'
        ],
        priceRange: [
            100,
            800
        ],
        imageBase: 'camping'
    },
    'hiking-trekking': {
        titles: [
            'Hiking Boots',
            'Hiking Backpack',
            'Hiking Poles',
            'Hiking Gear',
            'Trekking Poles',
            'Hiking Clothes',
            'Hiking Accessories',
            'Hiking Bag',
            'Trekking Gear',
            'Hiking Equipment'
        ],
        descriptions: [
            'Waterproof hiking boots',
            'Hiking backpack',
            'Trekking poles',
            'Complete hiking gear',
            'Adjustable trekking poles',
            'Hiking clothes set',
            'Hiking accessories',
            'Hiking daypack',
            'Trekking equipment',
            'Complete hiking equipment'
        ],
        priceRange: [
            80,
            600
        ],
        imageBase: 'hiking'
    },
    'climbing-mountaineering': {
        titles: [
            'Climbing Rope',
            'Climbing Harness',
            'Climbing Shoes',
            'Carabiners',
            'Climbing Gear',
            'Mountaineering Boots',
            'Ice Axe',
            'Climbing Helmet',
            'Climbing Accessories',
            'Climbing Equipment'
        ],
        descriptions: [
            'Dynamic climbing rope',
            'Climbing harness',
            'Climbing shoes',
            'Climbing carabiners set',
            'Complete climbing gear',
            'Mountaineering boots',
            'Ice axe',
            'Climbing helmet',
            'Climbing accessories',
            'Complete climbing equipment'
        ],
        priceRange: [
            100,
            1000
        ],
        imageBase: 'climbing'
    },
    'winter-sports': {
        titles: [
            'Ski Boots',
            'Ski Poles',
            'Ski Goggles',
            'Winter Sports Gear',
            'Ski Gloves',
            'Ski Helmet',
            'Winter Jacket',
            'Ski Accessories',
            'Winter Sports Equipment',
            'Ski Gear'
        ],
        descriptions: [
            'Ski boots',
            'Ski poles',
            'Ski goggles',
            'Complete winter sports gear',
            'Ski gloves',
            'Ski helmet',
            'Winter sports jacket',
            'Ski accessories',
            'Winter sports equipment',
            'Complete ski gear'
        ],
        priceRange: [
            80,
            800
        ],
        imageBase: 'skiing'
    },
    'skiing': {
        titles: [
            'Skis',
            'Ski Boots',
            'Ski Bindings',
            'Ski Poles',
            'Ski Helmet',
            'Ski Goggles',
            'Ski Gear',
            'Ski Accessories',
            'Ski Equipment',
            'Complete Ski Set'
        ],
        descriptions: [
            'Professional skis',
            'Ski boots',
            'Ski bindings',
            'Ski poles',
            'Ski helmet',
            'Ski goggles',
            'Complete ski gear',
            'Ski accessories',
            'Ski equipment',
            'Complete ski set'
        ],
        priceRange: [
            300,
            2000
        ],
        imageBase: 'skiing'
    },
    'snowboarding': {
        titles: [
            'Snowboard',
            'Snowboard Boots',
            'Snowboard Bindings',
            'Snowboard Helmet',
            'Snowboard Goggles',
            'Snowboard Gear',
            'Snowboard Accessories',
            'Snowboard Bag',
            'Snowboard Equipment',
            'Complete Snowboard Set'
        ],
        descriptions: [
            'Professional snowboard',
            'Snowboard boots',
            'Snowboard bindings',
            'Snowboard helmet',
            'Snowboard goggles',
            'Complete snowboard gear',
            'Snowboard accessories',
            'Snowboard travel bag',
            'Snowboard equipment',
            'Complete snowboard set'
        ],
        priceRange: [
            300,
            1800
        ],
        imageBase: 'snowboarding'
    },
    'golf-equipment': {
        titles: [
            'Golf Clubs',
            'Golf Bag',
            'Golf Balls',
            'Golf Shoes',
            'Golf Gloves',
            'Golf Cart',
            'Golf Accessories',
            'Golf Equipment',
            'Golf Set',
            'Golf Gear'
        ],
        descriptions: [
            'Set of golf clubs',
            'Golf bag',
            'Golf balls',
            'Golf shoes',
            'Golf gloves',
            'Golf cart',
            'Golf accessories',
            'Complete golf equipment',
            'Complete golf set',
            'Golf gear'
        ],
        priceRange: [
            200,
            2500
        ],
        imageBase: 'golf'
    },
    'equestrian-sports': {
        titles: [
            'Riding Helmet',
            'Riding Boots',
            'Riding Gear',
            'Saddle',
            'Bridle',
            'Equestrian Equipment',
            'Horse Tack',
            'Riding Accessories',
            'Equestrian Gear',
            'Riding Equipment'
        ],
        descriptions: [
            'Safety riding helmet',
            'Riding boots',
            'Complete riding gear',
            'English saddle',
            'Horse bridle',
            'Equestrian equipment',
            'Horse tack',
            'Riding accessories',
            'Equestrian gear',
            'Complete riding equipment'
        ],
        priceRange: [
            150,
            1500
        ],
        imageBase: 'equestrian'
    },
    'motorsports-gear': {
        titles: [
            'Racing Helmet',
            'Racing Suit',
            'Racing Gloves',
            'Racing Boots',
            'Motorsports Gear',
            'Racing Accessories',
            'Motorsports Equipment',
            'Racing Gear',
            'Motorsports Clothing',
            'Racing Equipment'
        ],
        descriptions: [
            'Racing helmet',
            'Racing suit',
            'Racing gloves',
            'Racing boots',
            'Complete motorsports gear',
            'Racing accessories',
            'Motorsports equipment',
            'Racing gear',
            'Motorsports clothing',
            'Complete racing equipment'
        ],
        priceRange: [
            200,
            2000
        ],
        imageBase: 'motorsports'
    },
    'accessories-protection': {
        titles: [
            'Sports Helmet',
            'Knee Pads',
            'Elbow Pads',
            'Protective Gear',
            'Sports Gloves',
            'Sports Accessories',
            'Protection Equipment',
            'Safety Gear',
            'Sports Protection',
            'Protective Equipment'
        ],
        descriptions: [
            'Sports safety helmet',
            'Knee protection pads',
            'Elbow protection pads',
            'Complete protective gear',
            'Sports gloves',
            'Sports accessories',
            'Protection equipment',
            'Safety gear',
            'Sports protection',
            'Protective equipment'
        ],
        priceRange: [
            30,
            300
        ],
        imageBase: 'protection'
    },
    'sports-bags': {
        titles: [
            'Sports Bag',
            'Gym Bag',
            'Duffel Bag',
            'Sports Backpack',
            'Equipment Bag',
            'Training Bag',
            'Sports Tote',
            'Gear Bag',
            'Sports Luggage',
            'Athletic Bag'
        ],
        descriptions: [
            'Large sports bag',
            'Gym duffel bag',
            'Sports duffel bag',
            'Sports backpack',
            'Equipment carrying bag',
            'Training bag',
            'Sports tote bag',
            'Gear storage bag',
            'Sports luggage',
            'Athletic bag'
        ],
        priceRange: [
            40,
            200
        ],
        imageBase: 'sports-bag'
    },
    'sports-nutrition': {
        titles: [
            'Protein Powder',
            'Energy Bars',
            'Sports Drinks',
            'Supplements',
            'Pre-Workout',
            'Post-Workout',
            'Sports Nutrition',
            'Protein Shakes',
            'Energy Gels',
            'Sports Supplements'
        ],
        descriptions: [
            'Whey protein powder',
            'Energy bars',
            'Sports drinks',
            'Sports supplements',
            'Pre-workout supplement',
            'Post-workout recovery',
            'Sports nutrition products',
            'Protein shake mix',
            'Energy gels',
            'Complete sports supplements'
        ],
        priceRange: [
            20,
            150
        ],
        imageBase: 'nutrition'
    },
    'recovery-physiotherapy': {
        titles: [
            'Foam Roller',
            'Massage Ball',
            'Resistance Bands',
            'Recovery Equipment',
            'Physiotherapy Tools',
            'Stretching Equipment',
            'Recovery Gear',
            'Therapy Equipment',
            'Recovery Accessories',
            'Physiotherapy Equipment'
        ],
        descriptions: [
            'Foam roller for recovery',
            'Massage ball',
            'Resistance bands set',
            'Recovery equipment',
            'Physiotherapy tools',
            'Stretching equipment',
            'Recovery gear',
            'Therapy equipment',
            'Recovery accessories',
            'Complete physiotherapy equipment'
        ],
        priceRange: [
            30,
            200
        ],
        imageBase: 'recovery'
    },
    'kids-sports-equipment': {
        titles: [
            'Kids Bike',
            'Kids Helmet',
            'Kids Sports Gear',
            'Kids Basketball',
            'Kids Football',
            'Kids Sports Equipment',
            'Kids Training Gear',
            'Kids Sports Accessories',
            'Kids Athletic Gear',
            'Kids Sports Set'
        ],
        descriptions: [
            'Kids bicycle',
            'Kids safety helmet',
            'Complete kids sports gear',
            'Kids basketball',
            'Kids football',
            'Kids sports equipment',
            'Kids training gear',
            'Kids sports accessories',
            'Kids athletic gear',
            'Complete kids sports set'
        ],
        priceRange: [
            50,
            400
        ],
        imageBase: 'kids-sports'
    },
    'refurbished-used-equipment': {
        titles: [
            'Used Sports Equipment',
            'Refurbished Gear',
            'Second-Hand Equipment',
            'Pre-Owned Sports Gear',
            'Used Athletic Equipment',
            'Refurbished Sports Equipment',
            'Second-Hand Gear',
            'Pre-Owned Equipment',
            'Used Sports Gear',
            'Refurbished Athletic Equipment'
        ],
        descriptions: [
            'Used sports equipment in good condition',
            'Refurbished sports gear',
            'Second-hand sports equipment',
            'Pre-owned sports gear',
            'Used athletic equipment',
            'Refurbished sports equipment',
            'Second-hand gear',
            'Pre-owned equipment',
            'Used sports gear',
            'Refurbished athletic equipment'
        ],
        priceRange: [
            50,
            500
        ],
        imageBase: 'used-equipment'
    },
    'professional-commercial-equipment': {
        titles: [
            'Commercial Gym Equipment',
            'Professional Sports Equipment',
            'Commercial Training Equipment',
            'Professional Gear',
            'Commercial Sports Gear',
            'Gym Equipment',
            'Professional Training Gear',
            'Commercial Athletic Equipment',
            'Professional Equipment',
            'Commercial Gear'
        ],
        descriptions: [
            'Commercial gym equipment',
            'Professional sports equipment',
            'Commercial training equipment',
            'Professional sports gear',
            'Commercial sports gear',
            'Gym equipment',
            'Professional training gear',
            'Commercial athletic equipment',
            'Professional equipment',
            'Commercial gear'
        ],
        priceRange: [
            500,
            5000
        ],
        imageBase: 'commercial-equipment'
    },
    'other-sporting-goods': {
        titles: [
            'Sports Equipment',
            'Athletic Gear',
            'Sports Gear',
            'Training Equipment',
            'Sports Accessories',
            'Athletic Equipment',
            'Sports Supplies',
            'Training Gear',
            'Sports Items',
            'Athletic Supplies'
        ],
        descriptions: [
            'Various sports equipment',
            'Athletic gear',
            'Sports gear',
            'Training equipment',
            'Sports accessories',
            'Athletic equipment',
            'Sports supplies',
            'Training gear',
            'Sports items',
            'Athletic supplies'
        ],
        priceRange: [
            30,
            400
        ],
        imageBase: 'sports'
    },
    // Toys
    'baby-toys-0-2-years': {
        titles: [
            'Baby Rattle',
            'Teething Toy',
            'Baby Mobile',
            'Soft Toys',
            'Baby Gym',
            'Musical Toy',
            'Baby Blocks',
            'Sensory Toy',
            'Baby Play Mat',
            'Infant Toy'
        ],
        descriptions: [
            'Colorful baby rattle',
            'Safe teething toy',
            'Musical baby mobile',
            'Soft plush toys',
            'Baby activity gym',
            'Musical baby toy',
            'Baby building blocks',
            'Sensory development toy',
            'Baby play mat',
            'Infant development toy'
        ],
        priceRange: [
            15,
            100
        ],
        imageBase: 'baby-toy'
    },
    'toddler-toys-2-4-years': {
        titles: [
            'Toddler Bike',
            'Building Blocks',
            'Puzzle Toy',
            'Toddler Car',
            'Musical Toy',
            'Educational Toy',
            'Toddler Play Set',
            'Toy Truck',
            'Toddler Games',
            'Play Kitchen'
        ],
        descriptions: [
            'Balance bike for toddlers',
            'Large building blocks',
            'Age-appropriate puzzle',
            'Ride-on toy car',
            'Musical toddler toy',
            'Educational learning toy',
            'Toddler play set',
            'Toy truck',
            'Toddler board games',
            'Play kitchen set'
        ],
        priceRange: [
            25,
            200
        ],
        imageBase: 'toddler-toy'
    },
    'preschool-toys-4-6-years': {
        titles: [
            'LEGO Set',
            'Action Figures',
            'Doll House',
            'Board Game',
            'Art Supplies',
            'Puzzle Set',
            'Science Kit',
            'Musical Instrument',
            'Play Set',
            'Educational Game'
        ],
        descriptions: [
            'LEGO building set',
            'Action figure collection',
            'Doll house with furniture',
            'Board game for kids',
            'Art and craft supplies',
            'Jigsaw puzzle set',
            'Science experiment kit',
            'Kids musical instrument',
            'Imaginative play set',
            'Educational board game'
        ],
        priceRange: [
            30,
            250
        ],
        imageBase: 'preschool-toy'
    },
    'educational-learning-toys': {
        titles: [
            'STEM Kit',
            'Learning Tablet',
            'Educational Puzzle',
            'Science Kit',
            'Math Learning Toy',
            'Language Learning Toy',
            'Coding Toy',
            'Educational Game',
            'Learning Board',
            'Educational Set'
        ],
        descriptions: [
            'STEM learning kit',
            'Kids learning tablet',
            'Educational puzzle',
            'Science experiment kit',
            'Math learning toy',
            'Language learning toy',
            'Coding robot toy',
            'Educational board game',
            'Learning activity board',
            'Complete educational set'
        ],
        priceRange: [
            40,
            300
        ],
        imageBase: 'educational-toy'
    },
    'montessori-toys': {
        titles: [
            'Montessori Blocks',
            'Montessori Puzzle',
            'Sensory Toy',
            'Montessori Board',
            'Wooden Toy',
            'Montessori Set',
            'Learning Toy',
            'Montessori Material',
            'Educational Toy',
            'Montessori Activity'
        ],
        descriptions: [
            'Montessori wooden blocks',
            'Montessori puzzle',
            'Sensory development toy',
            'Montessori activity board',
            'Natural wooden toy',
            'Complete Montessori set',
            'Montessori learning toy',
            'Montessori educational material',
            'Montessori educational toy',
            'Montessori activity set'
        ],
        priceRange: [
            30,
            200
        ],
        imageBase: 'montessori-toy'
    },
    // Auto Parts
    'engine-parts': {
        titles: [
            'Engine Oil Filter',
            'Spark Plugs Set',
            'Air Filter',
            'Timing Belt',
            'Water Pump',
            'Radiator',
            'Alternator',
            'Starter Motor',
            'Engine Mount',
            'Oil Pump'
        ],
        descriptions: [
            'High-quality engine oil filter',
            'Set of spark plugs',
            'Air filter replacement',
            'Timing belt for engine',
            'Water pump assembly',
            'Car radiator',
            'Alternator unit',
            'Starter motor',
            'Engine mount',
            'Oil pump'
        ],
        priceRange: [
            50,
            800
        ],
        imageBase: 'engine'
    },
    'body-parts': {
        titles: [
            'Car Bumper',
            'Headlight Assembly',
            'Side Mirror',
            'Door Panel',
            'Hood',
            'Trunk Lid',
            'Fender',
            'Grille',
            'Windshield',
            'Body Kit'
        ],
        descriptions: [
            'Front or rear car bumper',
            'Complete headlight assembly',
            'Side mirror replacement',
            'Door panel',
            'Car hood',
            'Trunk lid',
            'Car fender',
            'Front grille',
            'Windshield glass',
            'Body kit set'
        ],
        priceRange: [
            100,
            2000
        ],
        imageBase: 'car-parts'
    },
    'interior-parts': {
        titles: [
            'Car Seat',
            'Dashboard',
            'Steering Wheel',
            'Center Console',
            'Door Handle',
            'Window Switch',
            'Floor Mat',
            'Headliner',
            'Sun Visor',
            'Interior Trim'
        ],
        descriptions: [
            'Car seat replacement',
            'Dashboard panel',
            'Steering wheel',
            'Center console',
            'Door handle',
            'Window switch',
            'Car floor mats',
            'Headliner',
            'Sun visor',
            'Interior trim pieces'
        ],
        priceRange: [
            80,
            1500
        ],
        imageBase: 'car-interior'
    },
    'tires-wheels': {
        titles: [
            'Car Tires Set',
            'Alloy Wheels',
            'Steel Wheels',
            'Tire Pressure Sensor',
            'Wheel Cover',
            'Wheel Spacers',
            'Lug Nuts',
            'Tire Chains',
            'Spare Tire',
            'Wheel Rim'
        ],
        descriptions: [
            'Set of 4 car tires',
            'Alloy wheels set',
            'Steel wheels',
            'TPMS sensors',
            'Wheel covers',
            'Wheel spacers',
            'Lug nuts set',
            'Tire chains',
            'Spare tire',
            'Wheel rim'
        ],
        priceRange: [
            200,
            2500
        ],
        imageBase: 'tires'
    },
    'electronics-parts': {
        titles: [
            'Car Battery',
            'Car Stereo',
            'GPS Navigation',
            'Backup Camera',
            'Bluetooth Module',
            'LED Headlights',
            'Fog Lights',
            'Turn Signal',
            'Brake Light',
            'Car Alarm'
        ],
        descriptions: [
            '12V car battery',
            'Car stereo system',
            'GPS navigation unit',
            'Backup camera',
            'Bluetooth module',
            'LED headlight kit',
            'Fog lights',
            'Turn signal light',
            'Brake light',
            'Car alarm system'
        ],
        priceRange: [
            100,
            1200
        ],
        imageBase: 'car-electronics'
    },
    'accessories': {
        titles: [
            'Car Cover',
            'Seat Covers',
            'Phone Mount',
            'Dash Cam',
            'Car Charger',
            'Roof Rack',
            'Cargo Organizer',
            'Sun Shade',
            'Car Mat',
            'Air Freshener'
        ],
        descriptions: [
            'Car cover for protection',
            'Seat covers set',
            'Phone mount for car',
            'Dashboard camera',
            'Car phone charger',
            'Roof rack system',
            'Cargo organizer',
            'Sun shade',
            'Car floor mats',
            'Air freshener'
        ],
        priceRange: [
            20,
            400
        ],
        imageBase: 'car-accessories'
    },
    // Babies
    'baby-clothing': {
        titles: [
            'Baby Onesie',
            'Baby Romper',
            'Baby Pajamas',
            'Baby Dress',
            'Baby Outfit',
            'Baby Socks',
            'Baby Hat',
            'Baby Bib',
            'Baby Swaddle',
            'Baby Set'
        ],
        descriptions: [
            'Soft baby onesie',
            'Comfortable baby romper',
            'Cozy baby pajamas',
            'Cute baby dress',
            'Complete baby outfit',
            'Baby socks set',
            'Baby hat',
            'Baby bib',
            'Baby swaddle blanket',
            'Baby clothing set'
        ],
        priceRange: [
            15,
            150
        ],
        imageBase: 'baby-clothing'
    },
    'baby-gear': {
        titles: [
            'Baby Stroller',
            'Baby Carrier',
            'Baby Swing',
            'Baby Bouncer',
            'Baby Playpen',
            'Baby High Chair',
            'Baby Walker',
            'Baby Rocker',
            'Baby Bassinet',
            'Baby Gear Set'
        ],
        descriptions: [
            'Lightweight baby stroller',
            'Ergonomic baby carrier',
            'Baby swing chair',
            'Baby bouncer',
            'Baby playpen',
            'Baby high chair',
            'Baby walker',
            'Baby rocker',
            'Baby bassinet',
            'Complete baby gear set'
        ],
        priceRange: [
            80,
            600
        ],
        imageBase: 'baby-gear'
    },
    'nursery-furniture': {
        titles: [
            'Baby Crib',
            'Changing Table',
            'Nursery Dresser',
            'Baby Wardrobe',
            'Nursery Chair',
            'Baby Bookshelf',
            'Nursery Storage',
            'Baby Nightstand',
            'Nursery Set',
            'Baby Furniture'
        ],
        descriptions: [
            'Safe baby crib',
            'Changing table',
            'Nursery dresser',
            'Baby wardrobe',
            'Nursery rocking chair',
            'Baby bookshelf',
            'Nursery storage unit',
            'Baby nightstand',
            'Complete nursery set',
            'Baby furniture'
        ],
        priceRange: [
            200,
            1500
        ],
        imageBase: 'nursery'
    },
    'feeding': {
        titles: [
            'Baby Bottle',
            'Baby Formula',
            'Baby Food',
            'Bottle Warmer',
            'High Chair',
            'Feeding Set',
            'Baby Spoon',
            'Baby Bowl',
            'Sippy Cup',
            'Feeding Accessories'
        ],
        descriptions: [
            'Baby bottle set',
            'Baby formula',
            'Organic baby food',
            'Bottle warmer',
            'Baby high chair',
            'Complete feeding set',
            'Baby spoon set',
            'Baby bowl',
            'Sippy cup',
            'Feeding accessories'
        ],
        priceRange: [
            10,
            200
        ],
        imageBase: 'feeding'
    },
    'strollers-carriers': {
        titles: [
            'Baby Stroller',
            'Umbrella Stroller',
            'Jogging Stroller',
            'Baby Carrier',
            'Wrap Carrier',
            'Stroller Accessories',
            'Stroller Organizer',
            'Stroller Rain Cover',
            'Car Seat Stroller',
            'Travel Stroller'
        ],
        descriptions: [
            'Full-size baby stroller',
            'Compact umbrella stroller',
            'Jogging stroller',
            'Ergonomic baby carrier',
            'Baby wrap carrier',
            'Stroller accessories',
            'Stroller organizer',
            'Stroller rain cover',
            'Car seat compatible stroller',
            'Travel stroller'
        ],
        priceRange: [
            100,
            800
        ],
        imageBase: 'stroller'
    },
    'baby-safety': {
        titles: [
            'Baby Gate',
            'Outlet Covers',
            'Corner Guards',
            'Cabinet Locks',
            'Baby Monitor',
            'Safety Harness',
            'Car Seat',
            'Baby Proofing Kit',
            'Safety Rail',
            'Baby Safety Set'
        ],
        descriptions: [
            'Baby safety gate',
            'Electrical outlet covers',
            'Corner guards',
            'Cabinet safety locks',
            'Baby monitor',
            'Safety harness',
            'Car safety seat',
            'Complete baby proofing kit',
            'Safety rail',
            'Baby safety set'
        ],
        priceRange: [
            30,
            400
        ],
        imageBase: 'baby-safety'
    },
    // Clothing
    'mens-clothing': {
        titles: [
            'Men\'s T-Shirt',
            'Men\'s Jeans',
            'Men\'s Shirt',
            'Men\'s Jacket',
            'Men\'s Shorts',
            'Men\'s Pants',
            'Men\'s Sweater',
            'Men\'s Hoodie',
            'Men\'s Suit',
            'Men\'s Outfit'
        ],
        descriptions: [
            'Cotton men\'s t-shirt',
            'Classic men\'s jeans',
            'Men\'s dress shirt',
            'Men\'s jacket',
            'Men\'s shorts',
            'Men\'s pants',
            'Men\'s sweater',
            'Men\'s hoodie',
            'Men\'s suit',
            'Complete men\'s outfit'
        ],
        priceRange: [
            30,
            500
        ],
        imageBase: 'mens-clothing'
    },
    'womens-clothing': {
        titles: [
            'Women\'s Dress',
            'Women\'s Blouse',
            'Women\'s Jeans',
            'Women\'s Skirt',
            'Women\'s Jacket',
            'Women\'s Top',
            'Women\'s Pants',
            'Women\'s Blazer',
            'Women\'s Outfit',
            'Women\'s Set'
        ],
        descriptions: [
            'Elegant women\'s dress',
            'Women\'s blouse',
            'Women\'s jeans',
            'Women\'s skirt',
            'Women\'s jacket',
            'Women\'s top',
            'Women\'s pants',
            'Women\'s blazer',
            'Complete women\'s outfit',
            'Women\'s clothing set'
        ],
        priceRange: [
            40,
            600
        ],
        imageBase: 'womens-clothing'
    },
    'kids-clothing': {
        titles: [
            'Kids T-Shirt',
            'Kids Jeans',
            'Kids Dress',
            'Kids Shorts',
            'Kids Jacket',
            'Kids Outfit',
            'Kids Set',
            'Kids Pajamas',
            'Kids Swimwear',
            'Kids Clothing'
        ],
        descriptions: [
            'Kids t-shirt',
            'Kids jeans',
            'Kids dress',
            'Kids shorts',
            'Kids jacket',
            'Complete kids outfit',
            'Kids clothing set',
            'Kids pajamas',
            'Kids swimwear',
            'Kids clothing'
        ],
        priceRange: [
            20,
            200
        ],
        imageBase: 'kids-clothing'
    },
    'shoes': {
        titles: [
            'Running Shoes',
            'Casual Shoes',
            'Dress Shoes',
            'Sneakers',
            'Boots',
            'Sandals',
            'Slippers',
            'High Heels',
            'Flats',
            'Athletic Shoes'
        ],
        descriptions: [
            'Professional running shoes',
            'Casual everyday shoes',
            'Dress shoes',
            'Sneakers',
            'Boots',
            'Sandals',
            'Comfortable slippers',
            'High heel shoes',
            'Flat shoes',
            'Athletic shoes'
        ],
        priceRange: [
            50,
            400
        ],
        imageBase: 'shoes'
    },
    'accessories': {
        titles: [
            'Handbag',
            'Backpack',
            'Wallet',
            'Belt',
            'Scarf',
            'Hat',
            'Sunglasses',
            'Watch',
            'Jewelry',
            'Accessories Set'
        ],
        descriptions: [
            'Designer handbag',
            'Backpack',
            'Leather wallet',
            'Leather belt',
            'Scarf',
            'Hat',
            'Sunglasses',
            'Watch',
            'Jewelry',
            'Accessories set'
        ],
        priceRange: [
            25,
            300
        ],
        imageBase: 'accessories'
    },
    'bags-luggage': {
        titles: [
            'Travel Suitcase',
            'Carry-On Bag',
            'Backpack',
            'Duffel Bag',
            'Tote Bag',
            'Messenger Bag',
            'Laptop Bag',
            'Gym Bag',
            'Travel Set',
            'Luggage Set'
        ],
        descriptions: [
            'Travel suitcase',
            'Carry-on luggage',
            'Backpack',
            'Duffel bag',
            'Tote bag',
            'Messenger bag',
            'Laptop bag',
            'Gym bag',
            'Travel bag set',
            'Luggage set'
        ],
        priceRange: [
            60,
            500
        ],
        imageBase: 'luggage'
    },
    // Electronics
    'mobile-phones': {
        titles: [
            'iPhone',
            'Samsung Phone',
            'Smartphone',
            'Mobile Phone',
            'Android Phone',
            'Refurbished Phone',
            'Phone Case',
            'Phone Accessories',
            'Phone Charger',
            'Phone Set'
        ],
        descriptions: [
            'Latest iPhone model',
            'Samsung smartphone',
            'Smartphone',
            'Mobile phone',
            'Android phone',
            'Refurbished phone',
            'Phone protective case',
            'Phone accessories',
            'Phone charger',
            'Complete phone set'
        ],
        priceRange: [
            200,
            3000
        ],
        imageBase: 'phone'
    },
    'computers': {
        titles: [
            'Laptop',
            'Desktop Computer',
            'Tablet',
            'MacBook',
            'Gaming Laptop',
            'Workstation',
            'Chromebook',
            '2-in-1 Laptop',
            'Computer Accessories',
            'Computer Set'
        ],
        descriptions: [
            'Laptop computer',
            'Desktop PC',
            'Tablet device',
            'MacBook',
            'Gaming laptop',
            'Workstation computer',
            'Chromebook',
            '2-in-1 laptop',
            'Computer accessories',
            'Complete computer set'
        ],
        priceRange: [
            400,
            4000
        ],
        imageBase: 'computer'
    },
    'tv-video': {
        titles: [
            'Smart TV',
            'LED TV',
            'OLED TV',
            'TV Stand',
            'Soundbar',
            'Home Theater',
            'TV Accessories',
            'Streaming Device',
            'TV Mount',
            'TV Set'
        ],
        descriptions: [
            'Smart TV',
            'LED television',
            'OLED TV',
            'TV stand',
            'Soundbar',
            'Home theater system',
            'TV accessories',
            'Streaming device',
            'TV wall mount',
            'Complete TV set'
        ],
        priceRange: [
            300,
            5000
        ],
        imageBase: 'tv'
    },
    'cameras': {
        titles: [
            'DSLR Camera',
            'Mirrorless Camera',
            'Action Camera',
            'Camera Lens',
            'Camera Bag',
            'Tripod',
            'Camera Accessories',
            'Video Camera',
            'Instant Camera',
            'Camera Set'
        ],
        descriptions: [
            'DSLR camera',
            'Mirrorless camera',
            'Action camera',
            'Camera lens',
            'Camera bag',
            'Camera tripod',
            'Camera accessories',
            'Video camera',
            'Instant camera',
            'Complete camera set'
        ],
        priceRange: [
            200,
            3000
        ],
        imageBase: 'camera'
    },
    'gaming': {
        titles: [
            'Gaming Console',
            'Gaming PC',
            'Gaming Chair',
            'Gaming Headset',
            'Gaming Mouse',
            'Gaming Keyboard',
            'Gaming Monitor',
            'Gaming Accessories',
            'Gaming Set',
            'Gaming Gear'
        ],
        descriptions: [
            'Gaming console',
            'Gaming desktop PC',
            'Gaming chair',
            'Gaming headset',
            'Gaming mouse',
            'Gaming keyboard',
            'Gaming monitor',
            'Gaming accessories',
            'Complete gaming set',
            'Gaming gear'
        ],
        priceRange: [
            150,
            2500
        ],
        imageBase: 'gaming'
    },
    'audio': {
        titles: [
            'Headphones',
            'Speakers',
            'Soundbar',
            'Earbuds',
            'Audio System',
            'Microphone',
            'Audio Mixer',
            'Amplifier',
            'Audio Accessories',
            'Audio Set'
        ],
        descriptions: [
            'Wireless headphones',
            'Bluetooth speakers',
            'Soundbar',
            'Wireless earbuds',
            'Audio system',
            'Microphone',
            'Audio mixer',
            'Amplifier',
            'Audio accessories',
            'Complete audio set'
        ],
        priceRange: [
            50,
            1500
        ],
        imageBase: 'audio'
    },
    // Home & Garden
    'home-decor': {
        titles: [
            'Wall Art',
            'Decorative Pillows',
            'Curtains',
            'Rug',
            'Lamp',
            'Vase',
            'Mirror',
            'Clock',
            'Candles',
            'Home Decor Set'
        ],
        descriptions: [
            'Wall art piece',
            'Decorative throw pillows',
            'Window curtains',
            'Area rug',
            'Table lamp',
            'Decorative vase',
            'Wall mirror',
            'Wall clock',
            'Scented candles',
            'Home decor set'
        ],
        priceRange: [
            20,
            400
        ],
        imageBase: 'home-decor'
    },
    'kitchen-dining': {
        titles: [
            'Kitchen Set',
            'Dining Set',
            'Cookware',
            'Cutlery',
            'Kitchen Appliances',
            'Dinnerware',
            'Kitchen Storage',
            'Kitchen Tools',
            'Kitchen Accessories',
            'Kitchen Equipment'
        ],
        descriptions: [
            'Complete kitchen set',
            'Dining set',
            'Cookware set',
            'Cutlery set',
            'Kitchen appliances',
            'Dinnerware set',
            'Kitchen storage',
            'Kitchen tools',
            'Kitchen accessories',
            'Kitchen equipment'
        ],
        priceRange: [
            50,
            800
        ],
        imageBase: 'kitchen'
    },
    'bedding-bath': {
        titles: [
            'Bedding Set',
            'Comforter',
            'Pillows',
            'Bed Sheets',
            'Bath Towels',
            'Bath Mat',
            'Shower Curtain',
            'Bathroom Accessories',
            'Bedding',
            'Bath Set'
        ],
        descriptions: [
            'Complete bedding set',
            'Comforter',
            'Pillows set',
            'Bed sheets',
            'Bath towels set',
            'Bath mat',
            'Shower curtain',
            'Bathroom accessories',
            'Bedding',
            'Bath set'
        ],
        priceRange: [
            30,
            300
        ],
        imageBase: 'bedding'
    },
    'garden-tools': {
        titles: [
            'Garden Tools Set',
            'Lawn Mower',
            'Garden Shovel',
            'Pruning Shears',
            'Garden Hose',
            'Watering Can',
            'Garden Rake',
            'Garden Tools',
            'Garden Equipment',
            'Garden Set'
        ],
        descriptions: [
            'Complete garden tools set',
            'Lawn mower',
            'Garden shovel',
            'Pruning shears',
            'Garden hose',
            'Watering can',
            'Garden rake',
            'Garden tools',
            'Garden equipment',
            'Complete garden set'
        ],
        priceRange: [
            40,
            600
        ],
        imageBase: 'garden-tools'
    },
    'outdoor-living': {
        titles: [
            'Outdoor Furniture',
            'Patio Set',
            'Outdoor Grill',
            'Outdoor Lighting',
            'Outdoor Decor',
            'Outdoor Storage',
            'Outdoor Accessories',
            'Outdoor Equipment',
            'Patio Furniture',
            'Outdoor Set'
        ],
        descriptions: [
            'Outdoor furniture',
            'Patio furniture set',
            'Outdoor grill',
            'Outdoor lighting',
            'Outdoor decor',
            'Outdoor storage',
            'Outdoor accessories',
            'Outdoor equipment',
            'Patio furniture',
            'Complete outdoor set'
        ],
        priceRange: [
            100,
            2000
        ],
        imageBase: 'outdoor'
    },
    'home-improvement': {
        titles: [
            'Power Tools',
            'Hand Tools',
            'Paint',
            'Hardware',
            'Lighting',
            'Plumbing',
            'Electrical',
            'Building Materials',
            'Home Improvement Tools',
            'DIY Set'
        ],
        descriptions: [
            'Power tools set',
            'Hand tools',
            'Paint supplies',
            'Hardware',
            'Lighting fixtures',
            'Plumbing supplies',
            'Electrical supplies',
            'Building materials',
            'Home improvement tools',
            'DIY set'
        ],
        priceRange: [
            30,
            500
        ],
        imageBase: 'tools'
    },
    // Fashion & Beauty
    'cosmetics': {
        titles: [
            'Makeup Set',
            'Lipstick',
            'Foundation',
            'Mascara',
            'Eyeshadow',
            'Blush',
            'Makeup Brushes',
            'Makeup Palette',
            'Cosmetics',
            'Makeup Collection'
        ],
        descriptions: [
            'Complete makeup set',
            'Lipstick',
            'Foundation',
            'Mascara',
            'Eyeshadow palette',
            'Blush',
            'Makeup brushes set',
            'Makeup palette',
            'Cosmetics',
            'Makeup collection'
        ],
        priceRange: [
            20,
            300
        ],
        imageBase: 'cosmetics'
    },
    'skincare': {
        titles: [
            'Skincare Set',
            'Face Cream',
            'Serum',
            'Cleanser',
            'Moisturizer',
            'Sunscreen',
            'Face Mask',
            'Toner',
            'Skincare Products',
            'Skincare Routine'
        ],
        descriptions: [
            'Complete skincare set',
            'Face cream',
            'Face serum',
            'Facial cleanser',
            'Moisturizer',
            'Sunscreen',
            'Face mask',
            'Toner',
            'Skincare products',
            'Complete skincare routine'
        ],
        priceRange: [
            25,
            250
        ],
        imageBase: 'skincare'
    },
    'fragrances': {
        titles: [
            'Perfume',
            'Cologne',
            'Body Spray',
            'Fragrance Set',
            'Perfume Bottle',
            'Aftershave',
            'Fragrance',
            'Scented Candle',
            'Room Spray',
            'Fragrance Collection'
        ],
        descriptions: [
            'Women\'s perfume',
            'Men\'s cologne',
            'Body spray',
            'Fragrance set',
            'Perfume bottle',
            'Aftershave',
            'Fragrance',
            'Scented candle',
            'Room spray',
            'Fragrance collection'
        ],
        priceRange: [
            30,
            400
        ],
        imageBase: 'fragrance'
    },
    'hair-care': {
        titles: [
            'Shampoo',
            'Conditioner',
            'Hair Styling',
            'Hair Dryer',
            'Hair Straightener',
            'Hair Curler',
            'Hair Products',
            'Hair Accessories',
            'Hair Care Set',
            'Hair Tools'
        ],
        descriptions: [
            'Shampoo',
            'Conditioner',
            'Hair styling products',
            'Hair dryer',
            'Hair straightener',
            'Hair curler',
            'Hair products',
            'Hair accessories',
            'Hair care set',
            'Hair styling tools'
        ],
        priceRange: [
            15,
            200
        ],
        imageBase: 'hair-care'
    },
    'jewelry': {
        titles: [
            'Necklace',
            'Earrings',
            'Ring',
            'Bracelet',
            'Jewelry Set',
            'Watch',
            'Pendant',
            'Jewelry',
            'Accessories',
            'Jewelry Collection'
        ],
        descriptions: [
            'Necklace',
            'Earrings',
            'Ring',
            'Bracelet',
            'Jewelry set',
            'Watch',
            'Pendant',
            'Jewelry',
            'Accessories',
            'Jewelry collection'
        ],
        priceRange: [
            50,
            2000
        ],
        imageBase: 'jewelry'
    },
    'watches': {
        titles: [
            'Men\'s Watch',
            'Women\'s Watch',
            'Smartwatch',
            'Luxury Watch',
            'Sports Watch',
            'Vintage Watch',
            'Watch Set',
            'Watch Accessories',
            'Watch',
            'Watch Collection'
        ],
        descriptions: [
            'Men\'s wristwatch',
            'Women\'s wristwatch',
            'Smartwatch',
            'Luxury watch',
            'Sports watch',
            'Vintage watch',
            'Watch set',
            'Watch accessories',
            'Watch',
            'Watch collection'
        ],
        priceRange: [
            80,
            3000
        ],
        imageBase: 'watch'
    }
};
// Generate image URL using stable placeholders (placehold.co) with better relevance
function getPexelsImage(term, index, productTitle) {
    // Extract key words from product title for better image relevance
    let imageLabel = '';
    if (productTitle) {
        // Remove common words and extract meaningful keywords
        const words = productTitle.toLowerCase().replace(/\b(set|of|with|and|the|a|an)\b/g, '').trim().split(/\s+/).filter((w)=>w.length > 2).slice(0, 3).join(' ');
        imageLabel = words || productTitle.split(' ').slice(0, 2).join(' ');
    } else {
        // Use term mapping for better relevance
        const termMap = {
            'sofa': 'modern sofa furniture',
            'armchair': 'comfortable armchair',
            'recliner': 'recliner chair',
            'sofa-bed': 'sofa bed convertible',
            'living-room': 'living room furniture',
            'tv-stand': 'tv stand media unit',
            'coffee-table': 'coffee table living room',
            'side-table': 'side table end table',
            'dining-table': 'dining table wood',
            'dining-chair': 'dining chair',
            'dining-set': 'dining room set',
            'bed': 'bedroom bed frame',
            'mattress': 'mattress bed',
            'bed-frame': 'bed frame',
            'wardrobe': 'wardrobe closet',
            'dresser': 'dresser chest',
            'nightstand': 'nightstand bedside',
            'bedroom-set': 'bedroom furniture',
            'desk': 'desk office',
            'office-chair': 'office chair',
            'bookshelf': 'bookshelf bookcase',
            'cabinet': 'cabinet storage',
            'shoe-rack': 'shoe rack organizer',
            'storage': 'storage furniture',
            'kids-furniture': 'kids furniture',
            'outdoor-furniture': 'outdoor furniture',
            'garden-furniture': 'garden furniture',
            'balcony-furniture': 'balcony furniture',
            'bar-furniture': 'bar furniture',
            'mirror': 'mirror wall',
            'phone': 'smartphone mobile',
            'computer': 'laptop computer',
            'tv': 'television tv',
            'camera': 'camera photography',
            'gaming': 'gaming setup',
            'audio': 'audio speakers',
            'shoes': 'shoes footwear',
            'engine': 'car engine parts',
            'car-parts': 'car parts',
            'car-interior': 'car interior',
            'tires': 'car tires wheels',
            'car-electronics': 'car electronics',
            'car-accessories': 'car accessories',
            'baby-clothing': 'baby clothes',
            'baby-gear': 'baby gear',
            'nursery': 'nursery furniture',
            'feeding': 'baby feeding',
            'stroller': 'baby stroller',
            'baby-safety': 'baby safety',
            'mens-clothing': 'mens clothing',
            'womens-clothing': 'womens clothing',
            'kids-clothing': 'kids clothing',
            'accessories': 'fashion accessories',
            'luggage': 'luggage suitcase',
            'home-decor': 'home decor',
            'kitchen': 'kitchen dining',
            'bedding': 'bedding linens',
            'garden-tools': 'garden tools',
            'outdoor': 'outdoor living',
            'tools': 'tools hardware',
            'cosmetics': 'cosmetics makeup',
            'skincare': 'skincare beauty',
            'fragrance': 'perfume fragrance',
            'hair-care': 'hair care',
            'jewelry': 'jewelry accessories',
            'watch': 'watch timepiece',
            'scooter': 'scooter electric',
            'running': 'running shoes',
            'swimming': 'swimming gear',
            'diving': 'diving equipment',
            'surfing': 'surfing board',
            'fishing': 'fishing gear',
            'archery': 'archery bow',
            'camping': 'camping gear',
            'hiking': 'hiking boots',
            'climbing': 'climbing gear',
            'skiing': 'skiing equipment',
            'snowboarding': 'snowboarding gear',
            'golf': 'golf equipment',
            'equestrian': 'horse riding',
            'motorsports': 'motorsports gear',
            'protection': 'sports protection',
            'sports-bag': 'sports bag',
            'nutrition': 'sports nutrition',
            'recovery': 'sports recovery',
            'kids-sports': 'kids sports',
            'used-equipment': 'used sports equipment',
            'commercial-equipment': 'gym equipment',
            'sports': 'sports equipment',
            'baby-toy': 'baby toy',
            'toddler-toy': 'toddler toy',
            'preschool-toy': 'preschool toy',
            'educational-toy': 'educational toy',
            'montessori-toy': 'montessori toy'
        };
        imageLabel = termMap[term] || term.replace(/-/g, ' ');
    }
    // Ensure some variation between images
    const variant = index % 5 + 1;
    const color = [
        '059669',
        '4F46E5',
        '7C3AED',
        'DC2626',
        'EA580C'
    ][variant - 1];
    // Use placehold.co with better formatting
    return `https://placehold.co/800x800/${color}/FFFFFF?text=${encodeURIComponent(imageLabel.charAt(0).toUpperCase() + imageLabel.slice(1))}`;
}
// Enhance description with additional details
function enhanceDescription(baseDescription, title, category) {
    // If description is already detailed (more than 50 chars), return as is
    if (baseDescription.length > 50) {
        return baseDescription;
    }
    // Generate enhanced description based on category and title
    const enhancements = {
        'furniture': [
            ' in excellent condition. Well-maintained, no damage or stains. Ready for immediate use.',
            '. High-quality materials, sturdy construction. Perfect condition, barely used.',
            ' in great condition. Clean, well-cared for. No pets, no smoking household.',
            '. Excellent quality, like new. Includes all original parts and accessories.',
            ' in very good condition. Minor wear consistent with normal use. Fully functional.'
        ],
        'electronics': [
            ' in excellent working condition. All features tested and working perfectly. Includes original box and accessories.',
            '. Like new condition, barely used. Full warranty remaining. All original packaging included.',
            ' in great condition. Fully functional, no issues. Tested and verified working.',
            '. Excellent condition, well-maintained. Includes charger, cables, and original documentation.',
            ' in very good condition. Minor cosmetic wear but fully functional. Great value for money.'
        ],
        'auto-parts': [
            ' in excellent condition. Tested and verified working. Compatible with most models.',
            '. High-quality part, genuine or OEM equivalent. Ready to install.',
            ' in great condition. No damage, fully functional. Includes installation instructions if available.',
            '. Excellent quality, well-maintained. Tested and working perfectly.',
            ' in very good condition. Minor wear but fully functional. Great replacement part.'
        ],
        'clothing': [
            ' in excellent condition. Clean, no stains or damage. Size as listed.',
            '. Like new, barely worn. High-quality fabric, well-maintained.',
            ' in great condition. Gently used, no visible wear. Perfect fit.',
            '. Excellent quality, excellent condition. No defects or damage.',
            ' in very good condition. Minor wear consistent with normal use. Clean and ready to wear.'
        ],
        'fashion-beauty': [
            ' in excellent condition. Unopened or barely used. Original packaging included.',
            '. High-quality product, well-maintained. Great value.',
            ' in great condition. Tested and verified. All components included.',
            '. Excellent quality, like new. Perfect condition.',
            ' in very good condition. Minor use but fully functional. Great deal.'
        ],
        'home-garden': [
            ' in excellent condition. Well-maintained, ready to use. No damage.',
            '. High-quality item, like new. Perfect for your home.',
            ' in great condition. Clean and functional. Great value.',
            '. Excellent quality, well-cared for. Ready for immediate use.',
            ' in very good condition. Minor wear but fully functional. Great addition to any home.'
        ],
        'babies': [
            ' in excellent condition. Clean, sanitized, and safe. Perfect for your little one.',
            '. Like new, barely used. All safety features intact. Great condition.',
            ' in great condition. Well-maintained, no damage. Safe and ready to use.',
            '. Excellent quality, excellent condition. Clean and sanitized.',
            ' in very good condition. Gently used, well-cared for. Perfect for babies.'
        ],
        'sporting-goods': [
            ' in excellent condition. Well-maintained, fully functional. Ready to use.',
            '. High-quality equipment, like new. All features working perfectly.',
            ' in great condition. Tested and verified. No damage or defects.',
            '. Excellent quality, well-cared for. Perfect for your sports activities.',
            ' in very good condition. Minor wear but fully functional. Great value.'
        ],
        'toys': [
            ' in excellent condition. Clean, complete with all pieces. Safe and ready to play.',
            '. Like new, barely used. All parts included. Great condition.',
            ' in great condition. Well-maintained, no damage. Perfect for kids.',
            '. Excellent quality, excellent condition. Complete and functional.',
            ' in very good condition. Gently used, well-cared for. Great toy for children.'
        ]
    };
    const categoryKey = category.toLowerCase().replace(/\s+/g, '-');
    const categoryEnhancements = enhancements[categoryKey] || enhancements['furniture'];
    const randomEnhancement = categoryEnhancements[Math.floor(Math.random() * categoryEnhancements.length)];
    return baseDescription + randomEnhancement;
}
// Generate default template for subcategories without specific templates
function getDefaultTemplate(subcategoryName, categoryName) {
    const basePrice = categoryName === 'Furniture' ? [
        100,
        2000
    ] : categoryName === 'Electronics' ? [
        200,
        3000
    ] : categoryName === 'Auto Parts' ? [
        50,
        1000
    ] : categoryName === 'Clothing' ? [
        30,
        500
    ] : categoryName === 'Fashion & Beauty' ? [
        20,
        400
    ] : categoryName === 'Home & Garden' ? [
        40,
        600
    ] : categoryName === 'Babies' ? [
        20,
        300
    ] : [
        30,
        400
    ];
    const baseDescriptions = Array.from({
        length: 10
    }, (_, i)=>`Quality ${subcategoryName.toLowerCase()} item ${i + 1}`);
    return {
        titles: Array.from({
            length: 10
        }, (_, i)=>`${subcategoryName} Item ${i + 1}`),
        descriptions: baseDescriptions.map((desc)=>enhanceDescription(desc, '', categoryName)),
        priceRange: basePrice,
        imageBase: subcategoryName.toLowerCase().replace(/\s+/g, '-')
    };
}
// Generate products for all subcategories
function generateProducts() {
    const products = [];
    let productIndex = 0;
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CATEGORY_STRUCTURE"].forEach((category)=>{
        category.subcategories?.forEach((subcategory)=>{
            const template = PRODUCT_TEMPLATES[subcategory.handle] || getDefaultTemplate(subcategory.name, category.name);
            for(let i = 0; i < 10; i++){
                const title = template.titles[i];
                let description = template.descriptions[i];
                // Enhance description if it's too short
                if (description.length < 100) {
                    description = enhanceDescription(description, title, category.name);
                }
                const price = getRandomPrice(template.priceRange[0], template.priceRange[1]);
                const location = getRandomLocation();
                // Include category handle to ensure uniqueness (e.g., auto-parts-accessories-1 vs clothing-accessories-1)
                const handle = `${category.handle}-${subcategory.handle}-${i + 1}`;
                const imageUrl = getPexelsImage(template.imageBase, i, title);
                // Create additional images using product title for better relevance
                const additionalImages = [
                    getPexelsImage(template.imageBase, i + 10, title),
                    getPexelsImage(template.imageBase, i + 20, title)
                ];
                const product = createProduct(handle, title, description, price, imageUrl, location, category.handle, subcategory.handle, additionalImages);
                products.push(product);
                productIndex++;
            }
        });
    });
    return products;
}
const DEMO_PRODUCTS = generateProducts();
const PRODUCT_CATEGORIES = {};
DEMO_PRODUCTS.forEach((product)=>{
    const categoryMeta = product.metafields?.find((m)=>m.key === 'category');
    const subcategoryMeta = product.metafields?.find((m)=>m.key === 'subcategory');
    const locationMeta = product.metafields?.find((m)=>m.key === 'location');
    if (categoryMeta && locationMeta) {
        PRODUCT_CATEGORIES[product.handle] = {
            category: categoryMeta.value,
            subcategory: subcategoryMeta?.value,
            location: locationMeta.value
        };
    }
});
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
        products = [];
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
    // Find product by ID
    const product = DEMO_PRODUCTS.find((p)=>p.id === productId);
    if (!product) return [];
    // Get category and subcategory
    const productInfo = PRODUCT_CATEGORIES[product.handle];
    if (!productInfo) return [];
    // Return products from same subcategory, excluding current product
    return DEMO_PRODUCTS.filter((p)=>{
        const pInfo = PRODUCT_CATEGORIES[p.handle];
        return pInfo?.subcategory === productInfo.subcategory && p.id !== productId;
    }).slice(0, 4);
}
}),
"[project]/lib/demo/sellers.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SELLERS",
    ()=>SELLERS,
    "getSellerById",
    ()=>getSellerById
]);
const SELLERS = [
    {
        id: "sara",
        name: "Sara M.",
        avatar: "https://i.pravatar.cc/160?img=5",
        location: "Dubai",
        address: "Villa 12, Al Barsha South, Dubai Marina, Dubai, UAE",
        rating: 4.8,
        reviews: 63,
        memberSince: "2022",
        responseTime: "Typically replies in 15 min",
        completedDeals: 41,
        phone: "+971 50 123 4567",
        email: "sara.m@example.com"
    },
    {
        id: "ahmed",
        name: "Ahmed K.",
        avatar: "https://i.pravatar.cc/160?img=12",
        location: "Sharjah",
        address: "Building 45, Al Qasimia, King Faisal Street, Sharjah, UAE",
        rating: 4.6,
        reviews: 28,
        memberSince: "2023",
        responseTime: "Typically replies in 1 hour",
        completedDeals: 19,
        phone: "+971 55 234 5678",
        email: "ahmed.k@example.com"
    },
    {
        id: "maria",
        name: "Maria S.",
        avatar: "https://i.pravatar.cc/160?img=47",
        location: "Abu Dhabi",
        address: "Apartment 301, Al Khalidiyah, Corniche Road, Abu Dhabi, UAE",
        rating: 4.9,
        reviews: 91,
        memberSince: "2021",
        responseTime: "Typically replies in 10 min",
        completedDeals: 58,
        phone: "+971 50 345 6789",
        email: "maria.s@example.com"
    },
    {
        id: "yousef",
        name: "Yousef A.",
        avatar: "https://i.pravatar.cc/160?img=32",
        location: "Ajman",
        address: "Villa 8, Al Nuaimiya, Sheikh Rashid Bin Humaid Street, Ajman, UAE",
        rating: 4.5,
        reviews: 17,
        memberSince: "2024",
        responseTime: "Typically replies in 2 hours",
        completedDeals: 12,
        phone: "+971 55 456 7890",
        email: "yousef.a@example.com"
    },
    {
        id: "fatima",
        name: "Fatima R.",
        avatar: "https://i.pravatar.cc/160?img=9",
        location: "RAK",
        address: "Building 23, Al Qawasim, Al Qasr Street, Ras Al Khaimah, UAE",
        rating: 4.7,
        reviews: 22,
        memberSince: "2023",
        responseTime: "Typically replies in 30 min",
        completedDeals: 16,
        phone: "+971 50 567 8901",
        email: "fatima.r@example.com"
    }
];
function getSellerById(id) {
    return SELLERS.find((s)=>s.id === id) ?? SELLERS[0];
}
}),
"[project]/lib/demo/orders.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getActiveOrders",
    ()=>getActiveOrders,
    "getDemoOrderById",
    ()=>getDemoOrderById,
    "getDemoOrderByNumber",
    ()=>getDemoOrderByNumber,
    "getDemoOrders",
    ()=>getDemoOrders,
    "getOrderTracking",
    ()=>getOrderTracking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo/products.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$sellers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo/sellers.ts [app-rsc] (ecmascript)");
;
;
// Generate mock orders
function generateMockOrders() {
    const orders = [];
    const now = new Date();
    // Current active order (paid, picked up, delivery in 1 hour)
    const currentOrderDate = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
    const deliveryDate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
    const currentProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDemoProduct"])('furniture-sofas-1');
    const currentSeller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$sellers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSellerById"])('sara');
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
            ]
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
    const statuses = [
        'delivered',
        'delivered',
        'delivered',
        'cancelled'
    ];
    for(let i = 0; i < 10; i++){
        const daysAgo = i + 1;
        const orderDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        const productHandle = productHandles[i % productHandles.length];
        const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDemoProduct"])(productHandle);
        const seller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$sellers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSellerById"])(`seller-${i % 5 + 1}`);
        const status = statuses[i % statuses.length];
        const unitPrice = parseFloat(product?.variants[0]?.price.amount || '100.00');
        const deliveryPrice = 25.00;
        const quantity = 1;
        const subtotal = (unitPrice * quantity).toFixed(2);
        const tax = (parseFloat(subtotal) * 0.05).toFixed(2);
        const total = (parseFloat(subtotal) + parseFloat(tax) + deliveryPrice).toFixed(2);
        const deliveredDate = status === 'delivered' ? new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000) : undefined;
        orders.push({
            id: `order-${i + 1}`,
            orderNumber: `ORD-${Date.now() - i * 86400000}`,
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
    return orders.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
// Store orders in memory (for demo)
let mockOrders = generateMockOrders();
function getDemoOrders() {
    return [
        ...mockOrders
    ];
}
function getDemoOrderById(id) {
    return mockOrders.find((order)=>order.id === id);
}
function getDemoOrderByNumber(orderNumber) {
    return mockOrders.find((order)=>order.orderNumber === orderNumber);
}
function getActiveOrders() {
    return mockOrders.filter((order)=>order.status !== 'delivered' && order.status !== 'cancelled');
}
function getOrderTracking(trackingId) {
    const order = mockOrders.find((o)=>o.tracking?.trackingId === trackingId);
    return order?.tracking;
}
}),
"[project]/components/layout/footer-menu.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FooterMenuItem",
    ()=>FooterMenuItem,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FooterMenuItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FooterMenuItem() from the server but FooterMenuItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/layout/footer-menu.tsx <module evaluation>", "FooterMenuItem");
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/layout/footer-menu.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/layout/footer-menu.tsx <module evaluation>", "default");
}),
"[project]/components/layout/footer-menu.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "FooterMenuItem",
    ()=>FooterMenuItem,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const FooterMenuItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call FooterMenuItem() from the server but FooterMenuItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/layout/footer-menu.tsx", "FooterMenuItem");
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/layout/footer-menu.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/layout/footer-menu.tsx", "default");
}),
"[project]/components/layout/footer-menu.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$footer$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/layout/footer-menu.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$footer$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/layout/footer-menu.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$footer$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/layout/footer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$footer$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/footer-menu.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$logo$2d$square$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/logo-square.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
const { COMPANY_NAME, SITE_NAME } = process.env;
async function Footer() {
    const currentYear = new Date().getFullYear();
    const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
    const skeleton = 'w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700';
    const menu = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMenu"])('next-js-frontend-footer-menu');
    const copyrightName = COMPANY_NAME || SITE_NAME || '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "text-sm text-neutral-500 dark:text-neutral-400",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex w-full max-w-7xl flex-col items-center gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:items-center md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            className: "flex items-center gap-2 text-black dark:text-white",
                            href: "/",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$logo$2d$square$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    size: "sm"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/footer.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "uppercase",
                                    children: SITE_NAME
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/footer.tsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/footer.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/footer.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-[188px] w-[200px] flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: skeleton
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/footer.tsx",
                                    lineNumber: 29,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: skeleton
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/footer.tsx",
                                    lineNumber: 30,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: skeleton
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/footer.tsx",
                                    lineNumber: 31,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: skeleton
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/footer.tsx",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: skeleton
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/footer.tsx",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: skeleton
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/footer.tsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/footer.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, void 0),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$footer$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            menu: menu
                        }, void 0, false, {
                            fileName: "[project]/components/layout/footer.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/footer.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/footer.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-neutral-200 py-6 text-sm dark:border-neutral-700",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "© ",
                            copyrightDate,
                            " ",
                            copyrightName,
                            copyrightName.length && !copyrightName.endsWith('.') ? '.' : '',
                            " All rights reserved."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/layout/footer.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/layout/footer.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/footer.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/footer.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/orders/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrdersPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$orders$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo/orders.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/footer.tsx [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'components/orders/order-list'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
const metadata = {
    title: 'My Orders',
    description: 'Track your order history and status'
};
async function OrdersPage() {
    const allOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$orders$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDemoOrders"])();
    const activeOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$orders$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActiveOrders"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-neutral-900 dark:text-white",
                                children: "My Orders"
                            }, void 0, false, {
                                fileName: "[project]/app/orders/page.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-neutral-500 dark:text-neutral-400",
                                children: "Track your order history and current deliveries"
                            }, void 0, false, {
                                fileName: "[project]/app/orders/page.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/orders/page.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    activeOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-4 text-xl font-semibold text-neutral-900 dark:text-white",
                                children: "Active Orders"
                            }, void 0, false, {
                                fileName: "[project]/app/orders/page.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderList, {
                                orders: activeOrders
                            }, void 0, false, {
                                fileName: "[project]/app/orders/page.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/orders/page.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-4 text-xl font-semibold text-neutral-900 dark:text-white",
                                children: "Order History"
                            }, void 0, false, {
                                fileName: "[project]/app/orders/page.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderList, {
                                orders: allOrders
                            }, void 0, false, {
                                fileName: "[project]/app/orders/page.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/orders/page.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/orders/page.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/orders/page.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/orders/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/orders/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5fcbee34._.js.map