(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/layout/footer-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FooterMenuItem",
    ()=>FooterMenuItem,
    "default",
    ()=>FooterMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function FooterMenuItem({ item }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(pathname === item.path);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FooterMenuItem.useEffect": ()=>{
            setActive(pathname === item.path);
        }
    }["FooterMenuItem.useEffect"], [
        pathname,
        item.path
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: item.path,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('inline-block text-sm underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300', {
                'text-black dark:text-neutral-300': active
            }),
            children: item.title
        }, void 0, false, {
            fileName: "[project]/components/layout/footer-menu.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/footer-menu.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(FooterMenuItem, "NYKaqc6Wx6/HR50pW40oywHhOBI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = FooterMenuItem;
function FooterMenu({ menu }) {
    if (!menu.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "flex flex-wrap items-center gap-4 md:gap-6",
            children: menu.map((item)=>{
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterMenuItem, {
                    item: item
                }, item.title, false, {
                    fileName: "[project]/components/layout/footer-menu.tsx",
                    lineNumber: 41,
                    columnNumber: 18
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/components/layout/footer-menu.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/footer-menu.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c1 = FooterMenu;
var _c, _c1;
__turbopack_context__.k.register(_c, "FooterMenuItem");
__turbopack_context__.k.register(_c1, "FooterMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/demo/categories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
const DEMO_COLLECTIONS = CATEGORY_STRUCTURE.flatMap(_c = (category)=>{
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
_c1 = DEMO_COLLECTIONS;
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
var _c, _c1;
__turbopack_context__.k.register(_c, "DEMO_COLLECTIONS$CATEGORY_STRUCTURE.flatMap");
__turbopack_context__.k.register(_c1, "DEMO_COLLECTIONS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/search/collections.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Collections
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo/categories.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function CategoryList() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const currentPath = pathname.split('/').filter(Boolean);
    const currentCategory = currentPath[1];
    const currentSubcategory = currentPath[2];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400",
                children: "Categories"
            }, void 0, false, {
                fileName: "[project]/components/layout/search/collections.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_STRUCTURE"].map((category)=>{
                const isCategoryActive = currentCategory === category.handle;
                const hasActiveSubcategory = isCategoryActive && currentSubcategory;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/search/${category.handle}`,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('block rounded-lg px-3 py-2 text-sm font-medium transition-colors', isCategoryActive && !hasActiveSubcategory ? 'bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white' : 'text-neutral-600 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'),
                            children: category.name
                        }, void 0, false, {
                            fileName: "[project]/components/layout/search/collections.tsx",
                            lineNumber: 26,
                            columnNumber: 13
                        }, this),
                        isCategoryActive && category.subcategories && category.subcategories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ml-4 space-y-1 border-l border-neutral-200 pl-3 dark:border-neutral-700",
                            children: category.subcategories.map((sub)=>{
                                const isSubcategoryActive = currentSubcategory === sub.handle;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/search/${category.handle}/${sub.handle}`,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('block rounded-lg px-3 py-1.5 text-xs transition-colors', isSubcategoryActive ? 'bg-blue-50 font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-neutral-600 hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'),
                                    children: sub.name
                                }, `${category.id}-${sub.id}`, false, {
                                    fileName: "[project]/components/layout/search/collections.tsx",
                                    lineNumber: 44,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/layout/search/collections.tsx",
                            lineNumber: 40,
                            columnNumber: 15
                        }, this)
                    ]
                }, category.id, true, {
                    fileName: "[project]/components/layout/search/collections.tsx",
                    lineNumber: 25,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/search/collections.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(CategoryList, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = CategoryList;
const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded-sm';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';
function Collections() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CategoryList, {}, void 0, false, {
            fileName: "[project]/components/layout/search/collections.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/search/collections.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_c1 = Collections;
var _c, _c1;
__turbopack_context__.k.register(_c, "CategoryList");
__turbopack_context__.k.register(_c1, "Collections");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/search/children-wrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChildrenWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ChildrenWrapper({ children }) {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, searchParams.get('q'), false, {
        fileName: "[project]/app/search/children-wrapper.tsx",
        lineNumber: 9,
        columnNumber: 10
    }, this);
}
_s(ChildrenWrapper, "a+DZx9DY26Zf8FVy1bxe3vp9l1w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = ChildrenWrapper;
var _c;
__turbopack_context__.k.register(_c, "ChildrenWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0ff3ac3a._.js.map