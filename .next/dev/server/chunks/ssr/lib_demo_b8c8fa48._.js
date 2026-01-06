module.exports = [
"[project]/lib/demo/cart.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/lib_demo_9b8aa4ab._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/demo/cart.ts [app-rsc] (ecmascript)");
    });
});
}),
"[project]/lib/demo/products.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/lib_demo_products_ts_0af9928c._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/demo/products.ts [app-rsc] (ecmascript)");
    });
});
}),
];