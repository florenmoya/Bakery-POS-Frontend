import Vue from "vue";
import Vuex from "vuex";
window.Vue = Vue;

Vue.use(Vuex);

const axios = require('axios')

export default new Vuex.Store({

    state: {
        token: localStorage.getItem('access_token') || null,
        username: localStorage.getItem('username') || null,
        items: [],
        SalesItems: [],
        register: JSON.parse(localStorage.getItem('register')) || null,
        categories: [],
        isLoading: false
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
        loggedUser(state) {
            return state.username
        },
        retrieveRegister(state, data) {
            return state.register
        },
        items(state) {
            return state.items
        },
        isLoading(state) {
            return state.isLoading
        }
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        },
        retrieveUsername(state, username) {
            state.username = username
        },
        retrieveSalesItem(state, data) {
            state.SalesItems = data
        },
        retrieveItems(state, data) {
            state.items = data
        },
        retrieveRegister(state, data) {
            state.register = data
        },
        retrieveCategories(state, data) {
            state.categories = data
        },
        destroyUsername(state) {
            state.username = null
        },
        isLoading(state) {
            if (!state.isLoading) {
                state.isLoading = true
            } else {
                state.isLoading = false
            }
        }
    },
    actions: {
        destroyToken(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios.post('http://kyawposbackend.firewall-gateway.com/api/logout')
                        .then(function(response) {

                            localStorage.removeItem('username')
                            context.commit('username')

                            localStorage.removeItem('access_token')
                            context.commit('destroyToken')
                            resolve(response);
                        })
                        .catch(function(error) {

                            localStorage.removeItem('username')
                            context.commit('username')

                            localStorage.removeItem('access_token')
                            context.commit('destroyToken')
                            reject(error)

                        });
                })
            }
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

                axios.post('http://kyawposbackend.firewall-gateway.com/api/login', {
                        username: credentials.username,
                        password: credentials.password
                    })
                    .then(function(response) {
                        const token = response.data.access_token

                        localStorage.setItem('username', credentials.username)
                        context.commit('retrieveUsername', credentials.username)

                        localStorage.setItem('access_token', token)
                        context.commit('retrieveToken', token)

                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        registerUser(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('http://kyawposbackend.firewall-gateway.com/api/register', {
                        name: credentials.name,
                        username: credentials.username,
                        password: credentials.password,
                        password_confirmation: credentials.password_confirmation
                    })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        retrieveRegister(context) {
            context.commit('isLoading')
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.get('http://kyawposbackend.firewall-gateway.com/api/sales/register')
                    .then(function(response) {
                        localStorage.setItem('register', JSON.stringify(response.data))
                        context.commit('retrieveRegister', response.data)
                        context.commit('isLoading')
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        storeRegister(context, data) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post('http://kyawposbackend.firewall-gateway.com/api/sales/register', {
                        username: this.state.username,
                        amount: data.amount
                    })
                    .then(function(response) {
                        localStorage.setItem('register', JSON.stringify(response.data))
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        storeRegisterClose(context, data) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post('http://kyawposbackend.firewall-gateway.com/api/sales/register/close', {
                        username: this.state.username,
                        amount: data.amount
                    })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        storeSalesItem(context, data) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post('http://kyawposbackend.firewall-gateway.com/api/sales', {
                        register_id: data.register_id,
                        items: data.items
                    })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        storeDeliveriesItem(context, data) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post('http://kyawposbackend.firewall-gateway.com/api/deliveries', {
                        items: data.items
                    })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        retrieveSalesItem(context) {
            context.commit('isLoading')
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.get('http://kyawposbackend.firewall-gateway.com/api/reports/sales')
                    .then(function(response) {
                        context.commit('retrieveSalesItem', response.data)
                        context.commit('isLoading')
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        retrieveItems(context) {
            context.commit('isLoading')
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.get('http://kyawposbackend.firewall-gateway.com/api/items')
                    .then(function(response) {
                        context.commit('retrieveItems', response.data)
                        context.commit('isLoading')
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        storeItem(context, data) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post('http://kyawposbackend.firewall-gateway.com/api/items/store', {
                        id: data.id,
                        description: data.description,
                        quantity: data.quantity,
                        category: data.category,
                        price: data.price,
                        type: data.type,
                        item_cost: data.item_cost,
                        notes: data.notes
                    })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        updateItem(context, data) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post('http://kyawposbackend.firewall-gateway.com/api/items/update', {
                        id: data.id,
                        description: data.description,
                        quantity: data.quantity,
                        category: data.category,
                        price: data.price,
                        type: data.type,
                        item_cost: data.item_cost,
                        notes: data.notes
                    })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        deleteItem(context, data) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

                axios.post('http://kyawposbackend.firewall-gateway.com/api/items/delete', {
                        items_id: data.id
                    })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        retrieveCategories(context) {
            context.commit('isLoading')
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.get('http://kyawposbackend.firewall-gateway.com/api/categories')
                    .then(function(response) {
                        context.commit('retrieveCategories', response.data)
                        context.commit('isLoading')
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        storeCategories(context, data) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post('http://kyawposbackend.firewall-gateway.com/api/categories/store', {
                        id: data.id,
                        category_name: data.category_name
                    })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        updateCategories(context, data) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post('http://kyawposbackend.firewall-gateway.com/api/categories/update', {
                        id: data.id,
                        category_name: data.category_name
                    })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        },
        deleteCategories(context, data) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post('http://kyawposbackend.firewall-gateway.com/api/categories/delete', {
                        categories_id: data.id
                    })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        reject(error)
                    });
            })
        }
    }
});
