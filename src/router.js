import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: "/",
        name: "Home",
        meta: {
            requiresAuth: true,
        },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Sales/Home.vue")
        }, {
            path: "/dashboard",
            name: "Dasboard",
            meta: {
                requiresAuth: true
            },            
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Dashboard/Home.vue")
        },
        {
            path: "/sales",
            name: "Sales Menu",
            meta: {
                requiresAuth: true,
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Sales/Home.vue")
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
            import( /* webpackChunkName: "about" */ "./views/Reports/Reports.vue")
        },
        {
            path: "/reports/sales",
            name: "Sales Report",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Reports/Reports_Sales_Today.vue")
        },
        {
            path: "/reports/closing_counts",
            name: " Closing Counts",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Reports/Reports_Closing_Counts.vue")
        },
        {
            path: "/reports/Activity_Log",
            name: "Activity Log",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Reports/Activity_Log.vue")
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
            import( /* webpackChunkName: "about" */ "./views/Settings/Home.vue")
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
            import( /* webpackChunkName: "about" */ "./views/Sales/Sales_Sale.vue")
        },
        {
            path: "/sales/register",
            name: "Opening of Register",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Sales/Sales_Register.vue")
        },
        {
            path: "/sales/register/Close",
            name: "Closing Register",
            meta: {
                requiresAuth: true
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Sales/Sales_Register_Close.vue")
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
            import( /* webpackChunkName: "about" */ "./views/Inventory/Home.vue")
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
            import( /* webpackChunkName: "about" */ "./views/Inventory/Inventory_Item.vue")
        },
        {
            path: "/inventory/item/add",
            name: "Add Items",
            meta: {
                requiresAuth: true
            },
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Inventory/Inventory_Item.vue")
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
            import( /* webpackChunkName: "about" */ "./views/Inventory/Inventory_Categories.vue")
        },
        {
            path: "/inventory/categories/add",
            name: "Add Categories",
            meta: {
                requiresAuth: true
            },
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Inventory/Inventory_Categories.vue")
        },
        {
            path: "/inventory/delivery/add",
            name: "Add Deliveries",
            meta: {
                requiresAuth: true
            },
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Inventory/Inventory_Delivery_Add.vue")
        },
        {
            path: "/sales/refunds/add",
            name: "Add Refunds",
            meta: {
                requiresAuth: true
            },
            component: () =>
            import( /* webpackChunkName: "about" */ "./views/Sales/Sales_Refunds_Add.vue")
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
        }, {
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
