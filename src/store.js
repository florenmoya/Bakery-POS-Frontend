import Vue from "vue";
import Vuex from "vuex";
window.Vue = Vue;

Vue.use(Vuex);

const axios = require('axios')

export default new Vuex.Store({

    state: {
        api_links: [],
        token: localStorage.getItem('access_token') || null,
        username: localStorage.getItem('username') || null,
        register: [],
        SalesItems: [],
        items: [],
        balis: [],
        deliveries: [],
        closingcounts: [],
        ActivityLog: [],
        categories: [],
        dashboard: [],
        employees: [],
        EmployeeRoles: [],
        currentsales: [],
        isLoading: false
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
        loggedUser(state) {
            return state.username
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
        retrieveUsername(state, data) {
            state.username = data
        },
        retrieveDashboard(state, data) {
            state.dashboard = data
        },
        retrieveSalesItem(state, data) {
            state.SalesItems = data
        },
        retrieveItems(state, data) {
            state.items = data
        },
        retrieveDeliveries(state, data) {
            state.deliveries = data
        },
        retrieveBalis(state, data) {
            state.balis = data
        },
        retrieveClosingCounts(state, data) {
            state.closingcounts = data
        },
        retrieveCurrentSales(state, data) {
            state.currentsales = data
        },
        retrieveActivityLog(state, data) {
            state.ActivityLog = data
        },
        retrieveRegister(state, data) {
            state.register = data
        },
        retrieveCategories(state, data) {
            state.categories = data
        },
        retrieveEmployees(state, data) {
            state.employees = data
        },
        retrieveEmployeeRoles(state, data) {
            state.EmployeeRoles = data
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
                    axios.post(process.env.VUE_APP_AIRPOS+'/api/logout')
                    .then(function(response) {

                        localStorage.removeItem('username')

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
                console.log(process.env.VUE_APP_AIRPOS);
                axios.post(process.env.VUE_APP_AIRPOS+'/api/login', {
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
                    context.commit('isLoading')
                    console.log(error);
                    reject(error)
                });
            })
        },
        retrieveDashboard(context, credentials) {
            context.commit('isLoading')
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.get(process.env.VUE_APP_AIRPOS+'/api/dashboard')
                .then(function(response) {
                    context.commit('retrieveDashboard', response.data)
                    resolve(response);
                    context.commit('isLoading')
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error)
                });
            })
        },
        retrieveEmployees(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

                axios.get(process.env.VUE_APP_AIRPOS+'/api/employee')
                .then(function(response) {
                    context.commit('retrieveEmployees', response.data)
                    resolve(response);
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error)
                });
            })
        },
        storeEmployee(context, data) {
            context.commit('isLoading')

            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post(process.env.VUE_APP_AIRPOS+'/api/employee/store', {
                    name: data.name,
                    username: data.username,
                    roles: data.roles,
                    password: data.password,
                })
                .then(function(response) {
                    context.commit('isLoading')
                    resolve(response);
                })
                .catch(function(error) {
                    context.commit('isLoading')
                    console.log(error);
                    reject(error)
                });
            })
        },
        updateEmployee(context, data) {
            context.commit('isLoading')

            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post(process.env.VUE_APP_AIRPOS+'/api/employee/update', {
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    roles: data.roles,
                    password: data.password,
                })
                .then(function(response) {
                    context.commit('isLoading')
                    resolve(response);
                })
                .catch(function(error) {
                    context.commit('isLoading')
                    console.log(error);
                    reject(error)
                });
            })
        },
        destroyEmployee(context, data) {
            context.commit('isLoading')
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post(process.env.VUE_APP_AIRPOS+'/api/employee/destroy', {
                    id: data.id,
                })
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error)
                });
            })
            context.commit('isLoading')
        },
        retrieveEmployeeRoles(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.get(process.env.VUE_APP_AIRPOS+'/api/employee/role')
                .then(function(response) {
                    context.commit('retrieveEmployeeRoles', response.data)
                    resolve(response);
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error)
                });
            })
        },
        storeEmployeeRoles(context, data) {
            context.commit('isLoading')

            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post(process.env.VUE_APP_AIRPOS+'/api/employee/role/store', {
                    name: data.name,
                    permission: data.permission,
                })
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error)
                });
            })
            context.commit('isLoading')
        },
        updateEmployeeRoles(context, data) {
            context.commit('isLoading')

            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post(process.env.VUE_APP_AIRPOS+'/api/employee/role/update', {
                    id: data.id,
                    name: data.name,
                    permission: data.permission,
                })
                .then(function(response) {
                    context.commit('isLoading')
                    resolve(response);
                })
                .catch(function(error) {
                    context.commit('isLoading')
                    console.log(error);
                    reject(error)
                });
            })
        },
        destroyEmployeeRoles(context, data) {
            context.commit('isLoading')
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post(process.env.VUE_APP_AIRPOS+'/api/employee/role/destroy', {
                    id: data.id,
                })
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error)
                });
            })
            context.commit('isLoading')

        },
        registerUser(context, credentials) {
            context.commit('isLoading')
            return new Promise((resolve, reject) => {
                axios.post(process.env.VUE_APP_AIRPOS+'/api/register', {
                    name: credentials.name,
                    username: credentials.username,
                    password: credentials.password,
                    password_confirmation: credentials.password_confirmation,
                    company_name: credentials.company_name,
                    company_address: credentials.company_address,
                    company_city: credentials.company_address,
                    company_region: credentials.company_region,
                    company_zip_code: credentials.company_zip_code,
                    company_phone: credentials.company_phone,
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
            context.commit('isLoading')

        },
        retrieveRegister(context) {
            context.commit('isLoading')
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.get(process.env.VUE_APP_AIRPOS+'/api/register/activities')
                .then(function(response) {
                    context.commit('retrieveRegister', response.data)
                    resolve(response);
                    context.commit('isLoading')
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error)
                });
            })
        },
        storeRegister(context, data) {
            context.commit('isLoading')

            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post(process.env.VUE_APP_AIRPOS+'/api/register/activities/store', {
                    starting_amount: data.starting_amount
                })
                .then(function(response) {
                    resolve(response);
                    context.commit('isLoading')
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error)
                });
            })
        },
        storeRegisterClose(context, data) {
            context.commit('isLoading')

            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                axios.post(process.env.VUE_APP_AIRPOS+'/api/register/activities/update', {
                    released_amount: data.released_amount
                })
                .then(function(response) {
                    resolve(response);
                    context.commit('isLoading')
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error)
                });
            })
        },
        storeCartItem(context, data) {
            context.commit('isLoading')

            if (data.cart_name == 'sales_cart') context.state.api_links = process.env.VUE_APP_AIRPOS+'/api/sales'
                else if (data.cart_name == "balis_cart") context.state.api_links = process.env.VUE_APP_AIRPOS+'/api/balis'
                    else if (data.cart_name == "refunds_cart") context.state.api_links = process.env.VUE_APP_AIRPOS+'/api/refunds'
                        else if (data.cart_name == "deliveries_cart") context.state.api_links = process.env.VUE_APP_AIRPOS+'/api/deliveries'

                            return new Promise((resolve, reject) => {
                                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                                axios.post(context.state.api_links, {
                                    register_id: data.register_id,
                                    items: data.cart_items
                                })
                                .then(function(response) {
                                    context.commit('isLoading')
                                    resolve(response);
                                })
                                .catch(function(error) {
                                    console.log(error);
                                    reject(error)
                                });
                            })

                    },
                    storeSalesItem(context, data) {
                        context.commit('isLoading')
                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.post(process.env.VUE_APP_AIRPOS+'/api/sales', {
                                register_id: data.register_id,
                                items: data.items
                            })
                            .then(function(response) {
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })

                    },
                    storeBalisItem(context, data) {
                        context.commit('isLoading')

                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.post(process.env.VUE_APP_AIRPOS+'/api/sales/bali', {
                                register_id: data.register_id,
                                items: data.items
                            })
                            .then(function(response) {
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    storeRefundsItem(context, data) {
                        context.commit('isLoading')

                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.post(process.env.VUE_APP_AIRPOS+'/api/refunds', {
                                items: data.items
                            })
                            .then(function(response) {
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    storeDeliveriesItem(context, data) {
                        context.commit('isLoading')
                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.post(process.env.VUE_APP_AIRPOS+'/api/deliveries', {
                                items: data.items
                            })
                            .then(function(response) {
                                resolve(response);
                                context.commit('isLoading')
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
                            axios.get(process.env.VUE_APP_AIRPOS+'/api/reports/sales')
                            .then(function(response) {
                                context.commit('retrieveSalesItem', response.data)
                                resolve(response);
                                context.commit('isLoading')
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
                            axios.get(process.env.VUE_APP_AIRPOS+'/api/items')
                            .then(function(response) {
                                context.commit('retrieveItems', response.data)
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    retrieveDeliveries(context) {
                        context.commit('isLoading')
                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.get(process.env.VUE_APP_AIRPOS+'/api/reports/deliveries')
                            .then(function(response) {
                                context.commit('retrieveDeliveries', response.data)
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    retrieveBalis(context) {
                        context.commit('isLoading')
                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.get(process.env.VUE_APP_AIRPOS+'/api/balis')
                            .then(function(response) {
                                context.commit('retrieveBalis', response.data)
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    retrieveClosingCounts(context) {
                        context.commit('isLoading')
                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.get(process.env.VUE_APP_AIRPOS+'/api/reports/closing_counts')
                            .then(function(response) {
                                context.commit('retrieveClosingCounts', response.data)
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    retrieveCurrentSales(context) {
                        context.commit('isLoading')
                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.get(process.env.VUE_APP_AIRPOS+'/api/currents/sales')
                            .then(function(response) {
                                context.commit('retrieveCurrentSales', response.data)
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    retrieveActivityLog(context) {
                        context.commit('isLoading')
                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.get(process.env.VUE_APP_AIRPOS+'/api/reports/activity_log')
                            .then(function(response) {
                                context.commit('retrieveActivityLog', response.data)
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    storeItem(context, data) {
                        context.commit('isLoading')

                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.post(process.env.VUE_APP_AIRPOS+'/api/items/store', {
                                description: data.description,
                                stock: data.stock,
                                category_id: data.category_id,
                                price: data.price,
                                type: data.type,
                                cost: data.cost,
                                notes: data.notes
                            })
                            .then(function(response) {
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    updateItem(context, data) {
                        context.commit('isLoading')

                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.post(process.env.VUE_APP_AIRPOS+'/api/items/update', {
                                id: data.id,
                                description: data.description,
                                stock: data.stock,
                                category_id: data.category_id,
                                price: data.price,
                                type: data.type,
                                cost: data.cost,
                                notes: data.notes
                            })
                            .then(function(response) {
                                resolve(response)
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                context.commit('isLoading')
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    deleteItem(context, data) {
                        context.commit('isLoading')
                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.post(process.env.VUE_APP_AIRPOS+'/api/items/delete', {
                                id: data.id
                            })
                            .then(function(response) {
                                context.commit('isLoading')
                                resolve(response);
                            })
                            .catch(function(error) {
                                context.commit('isLoading')
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    retrieveCategories(context) {
                        context.commit('isLoading')
                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.get(process.env.VUE_APP_AIRPOS+'/api/categories')
                            .then(function(response) {
                                context.commit('retrieveCategories', response.data)
                                resolve(response)
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    storeCategories(context, data) {
                        context.commit('isLoading')

                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.post(process.env.VUE_APP_AIRPOS+'/api/categories/store', {
                                name: data.name
                            })
                            .then(function(response) {
                                resolve(response)
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error)
                                reject(error)
                            });
                        })
                    },
                    updateCategories(context, data) {
                        context.commit('isLoading')

                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.post(process.env.VUE_APP_AIRPOS+'/api/categories/update', {
                                id: data.id,
                                title: data.title
                            })
                            .then(function(response) {
                                resolve(response)
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    },
                    deleteCategories(context, data) {
                        context.commit('isLoading')
                        return new Promise((resolve, reject) => {
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                            axios.post(process.env.VUE_APP_AIRPOS+'/api/categories/delete', {
                                id: data.id
                            })
                            .then(function(response) {
                                resolve(response);
                                context.commit('isLoading')
                            })
                            .catch(function(error) {
                                console.log(error);
                                reject(error)
                            });
                        })
                    }
                }
            });
