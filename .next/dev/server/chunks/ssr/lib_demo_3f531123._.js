module.exports = [
"[project]/lib/demo/cart.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/lib_demo_63b50464._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/demo/cart.ts [app-rsc] (ecmascript)");
    });
});
}),
"[project]/lib/demo/products.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/lib_demo_22bbaad4._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/demo/products.ts [app-rsc] (ecmascript)");
    });
});
}),
"[project]/lib/demo/menu.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/lib_demo_menu_ts_9db70d12._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/demo/menu.ts [app-rsc] (ecmascript)");
    });
});
}),
];