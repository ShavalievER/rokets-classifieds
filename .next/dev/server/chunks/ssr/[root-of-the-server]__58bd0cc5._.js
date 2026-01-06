module.exports = [
"[externals]/next/dist/server/lib/cache-handlers/default.external.js [external] (next/dist/server/lib/cache-handlers/default.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/cache-handlers/default.external.js", () => require("next/dist/server/lib/cache-handlers/default.external.js"));

module.exports = mod;
}),
"[project]/lib/constants.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_OPTION",
    ()=>DEFAULT_OPTION,
    "HIDDEN_PRODUCT_TAG",
    ()=>HIDDEN_PRODUCT_TAG,
    "SHOPIFY_GRAPHQL_API_ENDPOINT",
    ()=>SHOPIFY_GRAPHQL_API_ENDPOINT,
    "TAGS",
    ()=>TAGS,
    "defaultSort",
    ()=>defaultSort,
    "sorting",
    ()=>sorting
]);
const defaultSort = {
    title: 'Relevance',
    slug: null,
    sortKey: 'RELEVANCE',
    reverse: false
};
const sorting = [
    defaultSort,
    {
        title: 'Trending',
        slug: 'trending-desc',
        sortKey: 'BEST_SELLING',
        reverse: false
    },
    {
        title: 'Latest arrivals',
        slug: 'latest-desc',
        sortKey: 'CREATED_AT',
        reverse: true
    },
    {
        title: 'Price: Low to high',
        slug: 'price-asc',
        sortKey: 'PRICE',
        reverse: false
    },
    {
        title: 'Price: High to low',
        slug: 'price-desc',
        sortKey: 'PRICE',
        reverse: true
    }
];
const TAGS = {
    collections: 'collections',
    products: 'products',
    cart: 'cart'
};
const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
const DEFAULT_OPTION = 'Default Title';
const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';
}),
"[project]/lib/type-guards.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isObject",
    ()=>isObject,
    "isShopifyError",
    ()=>isShopifyError
]);
const isObject = (object)=>{
    return typeof object === 'object' && object !== null && !Array.isArray(object);
};
const isShopifyError = (error)=>{
    if (!isObject(error)) return false;
    if (error instanceof Error) return true;
    return findError(error);
};
function findError(error) {
    if (Object.prototype.toString.call(error) === '[object Error]') {
        return true;
    }
    const prototype = Object.getPrototypeOf(error);
    return prototype === null ? false : findError(prototype);
}
}),
"[project]/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseUrl",
    ()=>baseUrl,
    "createUrl",
    ()=>createUrl,
    "ensureStartsWith",
    ()=>ensureStartsWith,
    "validateEnvironmentVariables",
    ()=>validateEnvironmentVariables
]);
const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000';
const createUrl = (pathname, params)=>{
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;
    return `${pathname}${queryString}`;
};
const ensureStartsWith = (stringToCheck, startsWith)=>stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;
const validateEnvironmentVariables = ()=>{
    const requiredEnvironmentVariables = [
        'SHOPIFY_STORE_DOMAIN',
        'SHOPIFY_STOREFRONT_ACCESS_TOKEN'
    ];
    const missingEnvironmentVariables = [];
    requiredEnvironmentVariables.forEach((envVar)=>{
        if (!process.env[envVar]) {
            missingEnvironmentVariables.push(envVar);
        }
    });
    if (missingEnvironmentVariables.length) {
        throw new Error(`The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join('\n')}\n`);
    }
    if (process.env.SHOPIFY_STORE_DOMAIN?.includes('[') || process.env.SHOPIFY_STORE_DOMAIN?.includes(']')) {
        throw new Error('Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.');
    }
};
}),
"[project]/lib/shopify/fragments/image.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const imageFragment = /* GraphQL */ `
  fragment image on Image {
    url
    altText
    width
    height
  }
`;
const __TURBOPACK__default__export__ = imageFragment;
}),
"[project]/lib/shopify/fragments/seo.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const seoFragment = /* GraphQL */ `
  fragment seo on SEO {
    description
    title
  }
`;
const __TURBOPACK__default__export__ = seoFragment;
}),
"[project]/lib/shopify/fragments/product.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$image$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/fragments/image.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/fragments/seo.ts [app-rsc] (ecmascript)");
;
;
const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$image$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
const __TURBOPACK__default__export__ = productFragment;
}),
"[project]/lib/shopify/fragments/cart.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/fragments/product.ts [app-rsc] (ecmascript)");
;
const cartFragment = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                ...product
              }
            }
          }
        }
      }
    }
    totalQuantity
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
const __TURBOPACK__default__export__ = cartFragment;
}),
"[project]/lib/shopify/mutations/cart.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToCartMutation",
    ()=>addToCartMutation,
    "createCartMutation",
    ()=>createCartMutation,
    "editCartItemsMutation",
    ()=>editCartItemsMutation,
    "removeFromCartMutation",
    ()=>removeFromCartMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/fragments/cart.ts [app-rsc] (ecmascript)");
;
const addToCartMutation = /* GraphQL */ `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
const createCartMutation = /* GraphQL */ `
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
const editCartItemsMutation = /* GraphQL */ `
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
const removeFromCartMutation = /* GraphQL */ `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
}),
"[project]/lib/shopify/queries/cart.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCartQuery",
    ()=>getCartQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/fragments/cart.ts [app-rsc] (ecmascript)");
;
const getCartQuery = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
}),
"[project]/lib/shopify/queries/collection.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCollectionProductsQuery",
    ()=>getCollectionProductsQuery,
    "getCollectionQuery",
    ()=>getCollectionQuery,
    "getCollectionsQuery",
    ()=>getCollectionsQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/fragments/product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/fragments/seo.ts [app-rsc] (ecmascript)");
;
;
const collectionFragment = /* GraphQL */ `
  fragment collection on Collection {
    handle
    title
    description
    seo {
      ...seo
    }
    updatedAt
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
const getCollectionQuery = /* GraphQL */ `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionFragment}
`;
const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;
const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      products(sortKey: $sortKey, reverse: $reverse, first: 100) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
}),
"[project]/lib/shopify/queries/menu.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMenuQuery",
    ()=>getMenuQuery
]);
const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;
}),
"[project]/lib/shopify/queries/page.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPageQuery",
    ()=>getPageQuery,
    "getPagesQuery",
    ()=>getPagesQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/fragments/seo.ts [app-rsc] (ecmascript)");
;
const pageFragment = /* GraphQL */ `
  fragment page on Page {
    ... on Page {
      id
      title
      handle
      body
      bodySummary
      seo {
        ...seo
      }
      createdAt
      updatedAt
    }
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
const getPageQuery = /* GraphQL */ `
  query getPage($handle: String!) {
    pageByHandle(handle: $handle) {
      ...page
    }
  }
  ${pageFragment}
`;
const getPagesQuery = /* GraphQL */ `
  query getPages {
    pages(first: 100) {
      edges {
        node {
          ...page
        }
      }
    }
  }
  ${pageFragment}
`;
}),
"[project]/lib/shopify/queries/product.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProductQuery",
    ()=>getProductQuery,
    "getProductRecommendationsQuery",
    ()=>getProductRecommendationsQuery,
    "getProductsQuery",
    ()=>getProductsQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/fragments/product.ts [app-rsc] (ecmascript)");
;
const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$fragments$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]}
`;
}),
"[project]/lib/shopify/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"806505eb30ebad78f118e992c9f4da8d55ead2664d":"$$RSC_SERVER_CACHE_2","c02993ca6bbc14f6a51ecc2a3e6788199663c55e56":"$$RSC_SERVER_CACHE_5","c061af17e57c35cee35f2b8b37f6aa50ae1e38802e":"$$RSC_SERVER_CACHE_1","c0673a1b0dcb78cb55dc364db741682ddf2ad326e4":"$$RSC_SERVER_CACHE_6","c0d8ddd523fbeb61d6010ede3c6e46858a1561f3f2":"$$RSC_SERVER_CACHE_4","c0f14d271df6a7dc1fcf2fc9f00f43bc99a71483e3":"$$RSC_SERVER_CACHE_0","c0ff42bfc9512eb2883202329c65586b59042d4c36":"$$RSC_SERVER_CACHE_3"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_CACHE_0",
    ()=>$$RSC_SERVER_CACHE_0,
    "$$RSC_SERVER_CACHE_1",
    ()=>$$RSC_SERVER_CACHE_1,
    "$$RSC_SERVER_CACHE_2",
    ()=>$$RSC_SERVER_CACHE_2,
    "$$RSC_SERVER_CACHE_3",
    ()=>$$RSC_SERVER_CACHE_3,
    "$$RSC_SERVER_CACHE_4",
    ()=>$$RSC_SERVER_CACHE_4,
    "$$RSC_SERVER_CACHE_5",
    ()=>$$RSC_SERVER_CACHE_5,
    "$$RSC_SERVER_CACHE_6",
    ()=>$$RSC_SERVER_CACHE_6,
    "addToCart",
    ()=>addToCart,
    "createCart",
    ()=>createCart,
    "getCart",
    ()=>getCart,
    "getCollection",
    ()=>getCollection,
    "getCollectionProducts",
    ()=>getCollectionProducts,
    "getCollections",
    ()=>getCollections,
    "getMenu",
    ()=>getMenu,
    "getPage",
    ()=>getPage,
    "getPages",
    ()=>getPages,
    "getProduct",
    ()=>getProduct,
    "getProductRecommendations",
    ()=>getProductRecommendations,
    "getProducts",
    ()=>getProducts,
    "removeFromCart",
    ()=>removeFromCart,
    "revalidate",
    ()=>revalidate,
    "shopifyFetch",
    ()=>shopifyFetch,
    "updateCart",
    ()=>updateCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/type-guards.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$mutations$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/mutations/cart.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/queries/cart.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$collection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/queries/collection.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$menu$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/queries/menu.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$page$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/queries/page.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/queries/product.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const domain = process.env.SHOPIFY_STORE_DOMAIN ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureStartsWith"])(process.env.SHOPIFY_STORE_DOMAIN, 'https://') : '';
const endpoint = domain ? `${domain}${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SHOPIFY_GRAPHQL_API_ENDPOINT"]}` : '';
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
async function shopifyFetch({ headers, query, variables }) {
    try {
        if (!endpoint) {
            throw new Error('SHOPIFY_STORE_DOMAIN environment variable is not set');
        }
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key,
                ...headers
            },
            body: JSON.stringify({
                ...query && {
                    query
                },
                ...variables && {
                    variables
                }
            })
        });
        const body = await result.json();
        if (body.errors) {
            throw body.errors[0];
        }
        return {
            status: result.status,
            body
        };
    } catch (e) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$type$2d$guards$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isShopifyError"])(e)) {
            throw {
                cause: e.cause?.toString() || 'unknown',
                status: e.status || 500,
                message: e.message,
                query
            };
        }
        throw {
            error: e,
            query
        };
    }
}
const removeEdgesAndNodes = (array)=>{
    return array.edges.map((edge)=>edge?.node);
};
const reshapeCart = (cart)=>{
    if (!cart.cost?.totalTaxAmount) {
        cart.cost.totalTaxAmount = {
            amount: '0.0',
            currencyCode: cart.cost.totalAmount.currencyCode
        };
    }
    return {
        ...cart,
        lines: removeEdgesAndNodes(cart.lines)
    };
};
const reshapeCollection = (collection)=>{
    if (!collection) {
        return undefined;
    }
    return {
        ...collection,
        path: `/search/${collection.handle}`
    };
};
const reshapeCollections = (collections)=>{
    const reshapedCollections = [];
    for (const collection of collections){
        if (collection) {
            const reshapedCollection = reshapeCollection(collection);
            if (reshapedCollection) {
                reshapedCollections.push(reshapedCollection);
            }
        }
    }
    return reshapedCollections;
};
const reshapeImages = (images, productTitle)=>{
    const flattened = removeEdgesAndNodes(images);
    return flattened.map((image)=>{
        const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
        return {
            ...image,
            altText: image.altText || `${productTitle} - ${filename}`
        };
    });
};
const reshapeProduct = (product, filterHiddenProducts = true)=>{
    if (!product || filterHiddenProducts && product.tags.includes(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HIDDEN_PRODUCT_TAG"])) {
        return undefined;
    }
    const { images, variants, ...rest } = product;
    return {
        ...rest,
        images: reshapeImages(images, product.title),
        variants: removeEdgesAndNodes(variants)
    };
};
const reshapeProducts = (products)=>{
    const reshapedProducts = [];
    for (const product of products){
        if (product) {
            const reshapedProduct = reshapeProduct(product);
            if (reshapedProduct) {
                reshapedProducts.push(reshapedProduct);
            }
        }
    }
    return reshapedProducts;
};
async function createCart() {
    if (!endpoint) {
        // Используем демо-реализацию корзины
        const { createDemoCart } = await __turbopack_context__.A("[project]/lib/demo/cart.ts [app-rsc] (ecmascript, async loader)");
        const cart = await createDemoCart();
        // Cookie уже установлен в createDemoCart
        return cart;
    }
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$mutations$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCartMutation"]
    });
    return reshapeCart(res.body.data.cartCreate.cart);
}
async function addToCart(lines, deliveryPrice) {
    if (!endpoint) {
        // Используем демо-реализацию корзины
        const { addToDemoCart, createDemoCart } = await __turbopack_context__.A("[project]/lib/demo/cart.ts [app-rsc] (ecmascript, async loader)");
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
        let cartId = cookieStore.get('cartId')?.value;
        if (!cartId) {
            const newCart = await createDemoCart();
            cartId = newCart.id;
        }
        return addToDemoCart(cartId, lines, deliveryPrice);
    }
    const cartId = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get('cartId')?.value;
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$mutations$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addToCartMutation"],
        variables: {
            cartId,
            lines
        }
    });
    return reshapeCart(res.body.data.cartLinesAdd.cart);
}
async function removeFromCart(lineIds) {
    if (!endpoint) {
        // Используем демо-реализацию корзины
        const { removeFromDemoCart } = await __turbopack_context__.A("[project]/lib/demo/cart.ts [app-rsc] (ecmascript, async loader)");
        const cartId = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get('cartId')?.value;
        return removeFromDemoCart(cartId, lineIds);
    }
    const cartId = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get('cartId')?.value;
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$mutations$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeFromCartMutation"],
        variables: {
            cartId,
            lineIds
        }
    });
    return reshapeCart(res.body.data.cartLinesRemove.cart);
}
async function updateCart(lines) {
    if (!endpoint) {
        // Используем демо-реализацию корзины
        const { updateDemoCart } = await __turbopack_context__.A("[project]/lib/demo/cart.ts [app-rsc] (ecmascript, async loader)");
        const cartId = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get('cartId')?.value;
        return updateDemoCart(cartId, lines);
    }
    const cartId = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get('cartId')?.value;
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$mutations$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["editCartItemsMutation"],
        variables: {
            cartId,
            lines
        }
    });
    return reshapeCart(res.body.data.cartLinesUpdate.cart);
}
async function getCart() {
    const cartId = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get('cartId')?.value;
    if (!cartId) {
        return undefined;
    }
    if (!endpoint) {
        // Используем демо-реализацию корзины
        const { getDemoCart } = await __turbopack_context__.A("[project]/lib/demo/cart.ts [app-rsc] (ecmascript, async loader)");
        return getDemoCart(cartId);
    }
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$cart$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCartQuery"],
        variables: {
            cartId
        }
    });
    // Old carts becomes `null` when you checkout.
    if (!res.body.data.cart) {
        return undefined;
    }
    return reshapeCart(res.body.data.cart);
}
var $$RSC_SERVER_CACHE_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c0f14d271df6a7dc1fcf2fc9f00f43bc99a71483e3", 0, async function getCollection(handle) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAGS"].collections);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheLife"])('days');
    if (!endpoint) {
        // Используем демо-категории вместо Shopify
        const { getCategoryByHandle, CATEGORY_STRUCTURE } = await __turbopack_context__.A("[project]/lib/demo/categories.ts [app-rsc] (ecmascript, async loader)");
        // If handle is empty, return "All Categories"
        if (!handle) {
            return {
                handle: '',
                title: 'All Categories',
                description: 'All products',
                seo: {
                    title: 'All Categories',
                    description: 'All products'
                },
                path: '/search',
                updatedAt: new Date().toISOString()
            };
        }
        // First try to find main category
        const category = getCategoryByHandle(handle);
        if (category) {
            return {
                handle: category.handle,
                title: category.name,
                description: `${category.name} category`,
                seo: {
                    title: category.name,
                    description: `${category.name} category`
                },
                path: `/search/${category.handle}`,
                updatedAt: new Date().toISOString()
            };
        }
        // If not found, search in all subcategories
        for (const cat of CATEGORY_STRUCTURE){
            const subcategory = cat.subcategories?.find((sub)=>sub.handle === handle);
            if (subcategory) {
                return {
                    handle: subcategory.handle,
                    title: subcategory.name,
                    description: `${subcategory.name} in ${cat.name}`,
                    seo: {
                        title: subcategory.name,
                        description: `${subcategory.name} in ${cat.name}`
                    },
                    path: `/search/${cat.handle}/${subcategory.handle}`,
                    updatedAt: new Date().toISOString()
                };
            }
        }
        return undefined;
    }
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$collection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCollectionQuery"],
        variables: {
            handle
        }
    });
    return reshapeCollection(res.body.data.collection);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_0, "c0f14d271df6a7dc1fcf2fc9f00f43bc99a71483e3", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_0, "name", {
    value: "getCollection",
    writable: false
});
var getCollection = $$RSC_SERVER_CACHE_0;
var $$RSC_SERVER_CACHE_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c061af17e57c35cee35f2b8b37f6aa50ae1e38802e", 0, async function getCollectionProducts({ collection, reverse, sortKey, filters }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAGS"].collections, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAGS"].products);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheLife"])('days');
    if (!endpoint) {
        // Используем демо-данные вместо Shopify
        const { getDemoCollectionProducts } = await __turbopack_context__.A("[project]/lib/demo/products.ts [app-rsc] (ecmascript, async loader)");
        return getDemoCollectionProducts(collection, filters);
    }
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$collection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCollectionProductsQuery"],
        variables: {
            handle: collection,
            reverse,
            sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
        }
    });
    if (!res.body.data.collection) {
        console.log(`No collection found for \`${collection}\``);
        return [];
    }
    return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_1, "c061af17e57c35cee35f2b8b37f6aa50ae1e38802e", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_1, "name", {
    value: "getCollectionProducts",
    writable: false
});
var getCollectionProducts = $$RSC_SERVER_CACHE_1;
var $$RSC_SERVER_CACHE_2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "806505eb30ebad78f118e992c9f4da8d55ead2664d", 0, async function getCollections() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAGS"].collections);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheLife"])('days');
    if (!endpoint) {
        // Используем демо-категории вместо Shopify
        const { DEMO_COLLECTIONS } = await __turbopack_context__.A("[project]/lib/demo/categories.ts [app-rsc] (ecmascript, async loader)");
        return [
            {
                handle: '',
                title: 'All Categories',
                description: 'All products',
                seo: {
                    title: 'All Categories',
                    description: 'All products'
                },
                path: '/search',
                updatedAt: new Date().toISOString()
            },
            ...DEMO_COLLECTIONS
        ];
    }
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$collection$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCollectionsQuery"]
    });
    const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
    const collections = [
        {
            handle: '',
            title: 'All',
            description: 'All products',
            seo: {
                title: 'All',
                description: 'All products'
            },
            path: '/search',
            updatedAt: new Date().toISOString()
        },
        // Filter out the `hidden` collections.
        // Collections that start with `hidden-*` need to be hidden on the search page.
        ...reshapeCollections(shopifyCollections).filter((collection)=>!collection.handle.startsWith('hidden'))
    ];
    return collections;
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_2, "806505eb30ebad78f118e992c9f4da8d55ead2664d", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_2, "name", {
    value: "getCollections",
    writable: false
});
var getCollections = $$RSC_SERVER_CACHE_2;
var $$RSC_SERVER_CACHE_3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c0ff42bfc9512eb2883202329c65586b59042d4c36", 0, async function getMenu(handle) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAGS"].collections);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheLife"])('days');
    if (!endpoint) {
        // Используем демо-меню вместо Shopify
        const { getDemoMenu } = await __turbopack_context__.A("[project]/lib/demo/menu.ts [app-rsc] (ecmascript, async loader)");
        return getDemoMenu(handle);
    }
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$menu$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMenuQuery"],
        variables: {
            handle
        }
    });
    return res.body?.data?.menu?.items.map((item)=>({
            title: item.title,
            path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', '')
        })) || [];
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_3, "c0ff42bfc9512eb2883202329c65586b59042d4c36", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_3, "name", {
    value: "getMenu",
    writable: false
});
var getMenu = $$RSC_SERVER_CACHE_3;
async function getPage(handle) {
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$page$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPageQuery"],
        variables: {
            handle
        }
    });
    return res.body.data.pageByHandle;
}
async function getPages() {
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$page$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPagesQuery"]
    });
    return removeEdgesAndNodes(res.body.data.pages);
}
var $$RSC_SERVER_CACHE_4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c0d8ddd523fbeb61d6010ede3c6e46858a1561f3f2", 0, async function getProduct(handle) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAGS"].products);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheLife"])('days');
    if (!endpoint) {
        // Используем демо-данные вместо Shopify
        const { getDemoProduct } = await __turbopack_context__.A("[project]/lib/demo/products.ts [app-rsc] (ecmascript, async loader)");
        return getDemoProduct(handle);
    }
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductQuery"],
        variables: {
            handle
        }
    });
    return reshapeProduct(res.body.data.product, false);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_4, "c0d8ddd523fbeb61d6010ede3c6e46858a1561f3f2", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_4, "name", {
    value: "getProduct",
    writable: false
});
var getProduct = $$RSC_SERVER_CACHE_4;
var $$RSC_SERVER_CACHE_5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c02993ca6bbc14f6a51ecc2a3e6788199663c55e56", 0, async function getProductRecommendations(productId) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAGS"].products);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheLife"])('days');
    if (!endpoint) {
        // Используем демо-данные вместо Shopify
        const { getDemoProductRecommendations } = await __turbopack_context__.A("[project]/lib/demo/products.ts [app-rsc] (ecmascript, async loader)");
        return getDemoProductRecommendations(productId);
    }
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductRecommendationsQuery"],
        variables: {
            productId
        }
    });
    return reshapeProducts(res.body.data.productRecommendations);
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_5, "c02993ca6bbc14f6a51ecc2a3e6788199663c55e56", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_5, "name", {
    value: "getProductRecommendations",
    writable: false
});
var getProductRecommendations = $$RSC_SERVER_CACHE_5;
var $$RSC_SERVER_CACHE_6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$cache$2d$wrapper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])("default", "c0673a1b0dcb78cb55dc364db741682ddf2ad326e4", 0, async function getProducts({ query, reverse, sortKey }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAGS"].products);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unstable_cacheLife"])('days');
    if (!endpoint) {
        // Используем демо-данные вместо Shopify
        const { getDemoProducts } = await __turbopack_context__.A("[project]/lib/demo/products.ts [app-rsc] (ecmascript, async loader)");
        let products = getDemoProducts();
        // Простая фильтрация по query (если есть)
        if (query) {
            const searchQuery = query.toLowerCase();
            products = products.filter((p)=>p.title.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery));
        }
        return products;
    }
    const res = await shopifyFetch({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$queries$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductsQuery"],
        variables: {
            query,
            reverse,
            sortKey
        }
    });
    return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_CACHE_6, "c0673a1b0dcb78cb55dc364db741682ddf2ad326e4", null);
Object["defineProperty"]($$RSC_SERVER_CACHE_6, "name", {
    value: "getProducts",
    writable: false
});
var getProducts = $$RSC_SERVER_CACHE_6;
async function revalidate(req) {
    // We always need to respond with a 200 status code to Shopify,
    // otherwise it will continue to retry the request.
    const collectionWebhooks = [
        'collections/create',
        'collections/delete',
        'collections/update'
    ];
    const productWebhooks = [
        'products/create',
        'products/delete',
        'products/update'
    ];
    const topic = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()).get('x-shopify-topic') || 'unknown';
    const secret = req.nextUrl.searchParams.get('secret');
    const isCollectionUpdate = collectionWebhooks.includes(topic);
    const isProductUpdate = productWebhooks.includes(topic);
    if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
        console.error('Invalid revalidation secret.');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: 401
        });
    }
    if (!isCollectionUpdate && !isProductUpdate) {
        // We don't need to revalidate anything for any other topics.
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: 200
        });
    }
    if (isCollectionUpdate) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAGS"].collections, 'seconds');
    }
    if (isProductUpdate) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TAGS"].products, 'seconds');
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].json({
        status: 200,
        revalidated: true,
        now: Date.now()
    });
}
}),
"[project]/app/search/[collection]/opengraph-image.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Image
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/opengraph-image.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/shopify/index.ts [app-rsc] (ecmascript)");
;
;
async function Image({ params }) {
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$shopify$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCollection"])(params.collection);
    const title = collection?.seo?.title || collection?.title;
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
        title
    });
}
}),
"[project]/app/search/[collection]/opengraph-image--metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$search$2f5b$collection$5d2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/search/[collection]/opengraph-image.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript)");
;
;
const imageModule = {};
async function __TURBOPACK__default__export__(props) {
    const { __metadata_id__: _, ...params } = await props.params;
    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fillMetadataSegment"])("/search/[collection]", params, "opengraph-image");
    function getImageMetadata(imageMetadata, idParam) {
        const data = {
            alt: imageMetadata.alt,
            type: imageMetadata.contentType || 'image/png',
            url: imageUrl + (idParam ? '/' + idParam : '') + "?747940d95a9b972c"
        };
        const { size } = imageMetadata;
        if (size) {
            data.width = size.width;
            data.height = size.height;
        }
        return data;
    }
    return [
        getImageMetadata(imageModule, '')
    ];
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__58bd0cc5._.js.map