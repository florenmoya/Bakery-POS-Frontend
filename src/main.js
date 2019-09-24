import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        store.dispatch('retrieveUser')
        if (!store.getters.loggedIn) {
            next({
                name: 'Login'
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
