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
            name: "Sales",
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
            path: "/sales/sale",
            name: "Sale",
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
            path: "/sales/items",
            name: "Sales_Items",
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
            name: "Items_Add",
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
            name: "Categories_Add",
            meta: {
                requiresAuth: true
            },
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/Inventory_Categories.vue")
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
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./components/Auth/Logout")
        }
    ]
});
