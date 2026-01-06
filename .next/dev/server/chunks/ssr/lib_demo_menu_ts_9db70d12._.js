module.exports = [
"[project]/lib/demo/menu.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_FOOTER_MENU",
    ()=>DEMO_FOOTER_MENU,
    "DEMO_HEADER_MENU",
    ()=>DEMO_HEADER_MENU,
    "getDemoMenu",
    ()=>getDemoMenu
]);
const DEMO_HEADER_MENU = [
    {
        title: 'All',
        path: '/search'
    },
    {
        title: 'Products',
        path: '/search'
    },
    {
        title: 'About',
        path: '/about'
    }
];
const DEMO_FOOTER_MENU = [
    {
        title: 'About',
        path: '/about'
    },
    {
        title: 'Terms',
        path: '/terms'
    },
    {
        title: 'Shipping',
        path: '/shipping'
    },
    {
        title: 'Privacy',
        path: '/privacy'
    },
    {
        title: 'Returns',
        path: '/returns'
    },
    {
        title: 'FAQ',
        path: '/faq'
    }
];
function getDemoMenu(handle) {
    if (handle === 'next-js-frontend-header-menu') {
        return DEMO_HEADER_MENU;
    }
    if (handle === 'next-js-frontend-footer-menu') {
        return DEMO_FOOTER_MENU;
    }
    return [];
}
}),
];

//# sourceMappingURL=lib_demo_menu_ts_9db70d12._.js.map