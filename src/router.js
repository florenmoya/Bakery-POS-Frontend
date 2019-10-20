import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: "/",
            name: "Home",
            meta: {
                requiresAuth: true
            },
            component: Home
        },
        {
            path: "/sales",
            name: "Sales Menu",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Sales.vue")
        },
        {
            path: "/reports",
            name: "Reports",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Reports.vue")
        },
        {
            path: "/reports/sales",
            name: "Reports_Sales",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Reports_Sales_Today.vue")
        },
        {
            path: "/reports/closing_counts",
            name: "Reports_Closing_Counts",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Reports_Closing_Counts.vue")
        },
        {
            path: "/settings",
            name: "Settings",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Settings.vue")
        },
        {
            path: "/sales/sale",
            name: "Sales",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Sales_Sale.vue")
        },
        {
            path: "/sales/register",
            name: "Sale_Register",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Sales_Register.vue")
        },
        {
            path: "/sales/register/Close",
            name: "Sale_Register_Close",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Sales_Register_Close.vue")
        },
        {
            path: "/sales/items",
            name: "Sale Items",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Sales_Items.vue")
        },
        {
            path: "/inventory",
            name: "Inventory",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Inventory.vue")
        },
        {
            path: "/inventory/item",
            name: "Items",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Inventory_Item.vue")
        },
        {
            path: "/inventory/item/add",
            name: "Add Items",
            meta: {
                requiresAuth: true
            },
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Inventory_Item.vue")
        },
        {
            path: "/inventory/categories",
            name: "Categories",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Inventory_Categories.vue")
        },
        {
            path: "/inventory/categories/add",
            name: "Add Categories",
            meta: {
                requiresAuth: true
            },
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Inventory_Categories.vue")
        },
        {
            path: "/inventory/delivery/add",
            name: "Add Deliveries",
            meta: {
                requiresAuth: true
            },
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Inventory_Delivery_Add.vue")
        },
        {
            path: "/sales/refunds/add",
            name: "Add Refunds",
            meta: {
                requiresAuth: true
            },
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Sales_Refunds_Add.vue")
        },
        {
            path: "/login",
            name: "Login",
            meta: {
                requiresVisitor: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./components/Auth/Login")
        },
        {
            path: "/Register",
            name: "Register",
            meta: {
                requiresVisitor: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./components/Auth/Register")
        },
        {
            path: "/logout",
            name: "Logout",
            meta: {
                requiresVisitor: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./components/Auth/Logout")
        },
        {
            path: "/shop/setup",
            name: "Shop Setup",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Settings/Shop_Setup")
        },
        {
            path: "/employee/setup",
            name: "Employee Setup",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Settings/Employee_Setup")
        },{
            path: "/settings/import",
            name: "Import Items",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Settings/Import_Items")
        },
        {
            path: "/employee/roles",
            name: "Employee Roles",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Settings/Employee_Roles")
        },
    ]
});
