<template>
    <v-container fluid>
        <v-card>
            <v-tabs v-model="tab" depressed>
                <v-tab v-for="tab in tabs" :key="tab.index" :to="tab.path">
                    {{ tab.name }}
                </v-tab>
                <v-tab-item v-for="tab in tabs" :key="tab.index" :id="tab.path">
                    <router-view v-if="tab === tab.path" />
                    <v-layout justify-space-between>
                        <v-flex xs6 md9>
                            <v-container class="datatable mt-2 mb-2">
                                <Cart :headers="headers" :items="refunds_cart" :single-select="singleSelect" :items_per_page="items_per_page" :dialogShowprop="dialogShowprop" :loading="isLoading" :cart_name="cart_name" />
                            </v-container>
                        </v-flex>
                        <v-flex xs6 md3 class="is-radiusless">
                            <v-container class="bg-white is-fullheight">
                                <v-container>
                                    <v-layout justify-space-between>
                                        <v-flex xs6 md6>
                                            <span>Subtotal</span>
                                        </v-flex>
                                        <v-flex xs6 md6>
                                            <div class='text-right'>
                                                <span>{{cart_price}}</span>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout class="p-0 m-0">
                                        <v-flex xs6 md6>
                                            <span>Discount</span>
                                        </v-flex>
                                        <v-flex xs6 md6>
                                            <div class='text-right'>
                                                <span>0</span>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <hr>
                                <v-container>
                                    <v-layout justify-space-between>
                                        <v-flex xs6 md6>
                                            <h2>Total</h2>
                                        </v-flex>
                                        <v-flex xs6 md6>
                                            <div class='text-right'>
                                                <h2>{{cart_price}}</h2>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <v-container class="is-center">
                                    <v-btn class="ma-2" tile color="darken-1" @click="complete_sale()" dark>Submit Sale</v-btn>
                                </v-container>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-tab-item>
            </v-tabs>
        </v-card>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>
<style scoped>
.bg-white {
    background-color: #fff;
}

.is-center {
    text-align: center;
    vertical-align: middle;
}

.datatable {
    background-color: #fff;
    padding: 0;
}

.is-fullheight {
    height: 100%;
}

</style>
<script>
import Cart from '../components/Cart';
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    components: {
        Cart
    },
    data() {
        return {
            tab: null,
            tabs: [
                { name: 'Refunds', path: '/sales/refunds/add' },
                { name: 'Items', path: '/sales/refunds/add/items' }
            ],
            snack: false,
            snackColor: '',
            snackText: '',
            cart_name: 'refunds_cart',
            refunds_cart: [],
            show_select: true,
            singleSelect: false,
            selected: [],
            sortby: ['category_id', 'quantity'],
            sortdesc: [false, true],
            items_per_page: 20,
            dialog: false,
            dialogShowprop: false,
            search: '',
            headers: [
                { text: '#', value: 'action', sortable: false },
                { text: 'Description', value: 'description', sortable: false },
                { text: 'QTY', value: 'quantity', sortable: false },
                { text: 'Price', value: 'price', sortable: false },
                { text: 'Total Price', value: 'total_price', sortable: false }
            ],
            sale_cart_data: []
        }
    },
    mounted() {
        this.$store.dispatch('retrieveRegister')
        if (localStorage.getItem('refunds_cart')) this.refunds_cart = JSON.parse(localStorage.getItem(this.cart_name));

    },
    computed: {
        ...mapGetters({
            retrieveRegister: 'retrieveRegister',
            isLoading: 'isLoading'
        }),
        cart_price: function() {
            return this.total_cart_price()
        },
        ...mapState([
            'isLoading'
        ])
    },
    methods: {
        complete_sale() {
            this.$store.dispatch('storeRefundsItem', {
                    items: this.refunds_cart
                })
                .then(data => {
                    this.refunds_cart = []
                    localStorage.setItem(this.cart_name, '[]')
                    this.snack = true
                    this.snackColor = 'success'
                    this.snackText = 'Data saved'
                })
                .catch(error => {
                    this.snack = true
                    this.snackColor = 'error'
                    this.snackText = 'Error Please Try Again'
                    console.log(error.response)
                });
        },
        total_cart_price() {
            let total_price = 0
            this.refunds_cart.map(function(value, key) {
                total_price += value.price * value.cart_quantity
            });
            return total_price
        },
        update(item, editedItem) {
            this.$store.dispatch('updateItem', {
                    id: editedItem.id,
                    description: editedItem.description,
                    quantity: editedItem.quantity,
                    category: editedItem.category,
                    price: editedItem.price,
                    type: editedItem.type,
                    item_cost: editedItem.item_cost,
                    notes: editedItem.notes
                })
                .then(Object.assign(item, editedItem))
        },
        create(items, editedItem) {
            this.$store.dispatch('storeItem', {
                    description: editedItem.description,
                    quantity: editedItem.quantity,
                    category: editedItem.category,
                    price: editedItem.price,
                    type: editedItem.type,
                    item_cost: editedItem.item_cost,
                    notes: editedItem.notes
                })
                .then(items.push(editedItem))
        },

    }
}

</script>
