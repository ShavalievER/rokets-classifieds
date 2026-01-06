module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo-experimental.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo-experimental.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo-experimental.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo-experimental.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo-experimental.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo-experimental.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo-experimental.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo-experimental.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/demo/user.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addDemoAddress",
    ()=>addDemoAddress,
    "addDemoPaymentMethod",
    ()=>addDemoPaymentMethod,
    "deleteDemoAddress",
    ()=>deleteDemoAddress,
    "deleteDemoPaymentMethod",
    ()=>deleteDemoPaymentMethod,
    "getDemoAddressById",
    ()=>getDemoAddressById,
    "getDemoAddresses",
    ()=>getDemoAddresses,
    "getDemoPaymentMethodById",
    ()=>getDemoPaymentMethodById,
    "getDemoPaymentMethods",
    ()=>getDemoPaymentMethods,
    "getDemoUser",
    ()=>getDemoUser,
    "setDefaultAddress",
    ()=>setDefaultAddress,
    "setDefaultPaymentMethod",
    ()=>setDefaultPaymentMethod,
    "updateDemoAddress",
    ()=>updateDemoAddress,
    "updateDemoPaymentMethod",
    ()=>updateDemoPaymentMethod,
    "updateDemoUser",
    ()=>updateDemoUser
]);
// Demo user data
let demoUser = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+971 50 123 4567',
    avatar: 'https://i.pravatar.cc/160?img=1'
};
let demoAddresses = [
    {
        id: 'addr-1',
        label: 'Home',
        fullName: 'John Doe',
        phone: '+971 50 123 4567',
        addressLine1: 'Villa 15, Al Barsha',
        addressLine2: 'Dubai Marina',
        city: 'Dubai',
        state: 'Dubai',
        postalCode: '12345',
        country: 'UAE',
        isDefault: true
    },
    {
        id: 'addr-2',
        label: 'Work',
        fullName: 'John Doe',
        phone: '+971 50 123 4567',
        addressLine1: 'Office Tower, Business Bay',
        city: 'Dubai',
        state: 'Dubai',
        postalCode: '67890',
        country: 'UAE',
        isDefault: false
    }
];
let demoPaymentMethods = [
    {
        id: 'pm-1',
        type: 'card',
        label: '**** **** **** 4242',
        isDefault: true,
        expiryDate: '12/25',
        cardholderName: 'John Doe',
        brand: 'Visa'
    },
    {
        id: 'pm-2',
        type: 'card',
        label: '**** **** **** 8888',
        isDefault: false,
        expiryDate: '06/26',
        cardholderName: 'John Doe',
        brand: 'Mastercard'
    }
];
function getDemoUser() {
    return {
        ...demoUser
    };
}
function updateDemoUser(updates) {
    demoUser = {
        ...demoUser,
        ...updates
    };
    return demoUser;
}
function getDemoAddresses() {
    return [
        ...demoAddresses
    ];
}
function getDemoAddressById(id) {
    return demoAddresses.find((addr)=>addr.id === id);
}
function addDemoAddress(address) {
    const newAddress = {
        ...address,
        id: `addr-${Date.now()}`
    };
    demoAddresses.push(newAddress);
    return newAddress;
}
function updateDemoAddress(id, updates) {
    const index = demoAddresses.findIndex((addr)=>addr.id === id);
    if (index === -1) return null;
    demoAddresses[index] = {
        ...demoAddresses[index],
        ...updates
    };
    return demoAddresses[index];
}
function deleteDemoAddress(id) {
    const index = demoAddresses.findIndex((addr)=>addr.id === id);
    if (index === -1) return false;
    demoAddresses.splice(index, 1);
    return true;
}
function setDefaultAddress(id) {
    const index = demoAddresses.findIndex((addr)=>addr.id === id);
    if (index === -1) return false;
    // Remove default from all addresses
    demoAddresses.forEach((addr)=>{
        addr.isDefault = false;
    });
    // Set new default
    demoAddresses[index].isDefault = true;
    return true;
}
function getDemoPaymentMethods() {
    return [
        ...demoPaymentMethods
    ];
}
function getDemoPaymentMethodById(id) {
    return demoPaymentMethods.find((pm)=>pm.id === id);
}
function addDemoPaymentMethod(method) {
    const newMethod = {
        ...method,
        id: `pm-${Date.now()}`
    };
    demoPaymentMethods.push(newMethod);
    return newMethod;
}
function updateDemoPaymentMethod(id, updates) {
    const index = demoPaymentMethods.findIndex((pm)=>pm.id === id);
    if (index === -1) return null;
    demoPaymentMethods[index] = {
        ...demoPaymentMethods[index],
        ...updates
    };
    return demoPaymentMethods[index];
}
function deleteDemoPaymentMethod(id) {
    const index = demoPaymentMethods.findIndex((pm)=>pm.id === id);
    if (index === -1) return false;
    demoPaymentMethods.splice(index, 1);
    return true;
}
function setDefaultPaymentMethod(id) {
    const index = demoPaymentMethods.findIndex((pm)=>pm.id === id);
    if (index === -1) return false;
    // Remove default from all methods
    demoPaymentMethods.forEach((pm)=>{
        pm.isDefault = false;
    });
    // Set new default
    demoPaymentMethods[index].isDefault = true;
    return true;
}
}),
"[project]/app/api/account/payment-methods/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.6.0-canary.60_react_60c2d962eb59e8fdc3ce5782532c32a4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo/user.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const methods = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDemoPaymentMethods"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(methods);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch payment methods'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const methodData = await request.json();
        const newMethod = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addDemoPaymentMethod"])(methodData);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newMethod, {
            status: 201
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$6$2e$0$2d$canary$2e$60_react_60c2d962eb59e8fdc3ce5782532c32a4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to add payment method'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a89fb2a9._.js.map