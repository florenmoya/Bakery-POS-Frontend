import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const axios = require('axios')

export default new Vuex.Store({

    state: {
        token: localStorage.getItem('access_token') || null,
        username: localStorage.getItem('username') || null,
        items: [],
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
        items(state) {
            return state.items
        },
        retrieveSalesCart(state) {
            return state.sales_cart
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
        retrieveItems(state, data) {
            state.items = data
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
                    axios.post('http://localhost:8001/api/logout')
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

                axios.post('http://localhost:8001/api/login', {
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
                axios.post('http://localhost:8001/api/register', {
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
        retrieveItems(context) {
            context.commit('isLoading')
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.get('http://localhost:8001/api/items')
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
                axios.post('http://localhost:8001/api/items/store', {
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
                axios.post('http://localhost:8001/api/items/update', {
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

                axios.post('http://localhost:8001/api/items/delete', {
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
                axios.get('http://localhost:8001/api/categories')
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
                axios.post('http://localhost:8001/api/categories/store', {
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
                axios.post('http://localhost:8001/api/categories/update', {
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
                axios.post('http://localhost:8001/api/categories/delete', {
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
