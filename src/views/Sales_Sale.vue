<template>
    <v-container fluid>
        <v-card>
            <v-tabs>
                <v-tab>
                    Sales
                </v-tab>
                <v-tab>
                    Items
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <v-layout justify-space-between>
                            <v-flex xs6 md9>
                                <v-container class="datatable mt-2 mb-2">
                                    <Cart :headers="headers" :items="sales_cart" :single-select="singleSelect" :items_per_page="items_per_page" :dialogShowprop="dialogShowprop" :loading="isLoading" :cart_name="cart_name" />
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
                                        <v-btn class="ma-2" tile color="darken-1" @click="complete_sale()" :loading="isLoading" dark>Submit Sale</v-btn>
                                    </v-container>
                                </v-container>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <DataTableCrudCart :key="render_key" :search="search" :headers="headers2" :items="retrieveItems" :dialogprop="dialog" :editedIndexprop="editedIndex" :editItems="editItems" :editedItemprop="editedItem" :single-select="singleSelect" :selectedprop="sales_cart" :items_per_page="items_per_page" :sortby="sortby" :sortdesc="sortdesc" :defaultItem="defaultItem" :show_select="show_select" :dialogShowprop="dialogShowprop" :loading="isLoading" :cart_name="cart_name" />
                    </v-card>
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
import DataTableCrudCart from '../components/DataTableCrudCart';

import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    components: {
        Cart,
        DataTableCrudCart
    },
    data() {
        return {
            render_key: 0,
            snack: false,
            snackColor: '',
            snackText: '',
            cart_name: 'insertSalesCartItem',
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
            // DataTableCrud
            show_select: true,
            singleSelect: false,
            headers2: [
                { text: 'Description', value: 'description' },
                { text: 'QTY', value: 'quantity' },
                { text: 'Price', value: 'price' },
                { text: 'Category', value: 'category.title' },

            ],
            editedIndex: -1,
            editedItem: {
                description: '',
                quantity: 0,
                price: 0,
                category: 0,
                type: 0,
                item_cost: 0,
                notes: ''
            },
            editItems: [
                { name: 'description' },
                { name: 'quantity' },
                { name: 'price' },
                { name: 'category' },
                { name: 'type' },
                { name: 'item_cost' },
                { name: 'notes' }
            ],
            defaultItem: {
                description: '',
                quantity: 0,
                price: 0,
                category: 0,
                type: 0,
                item_cost: 0,
                notes: ''
            },
        }
    },
    mounted() {
        this.$store.dispatch('retrieveRegister')
        this.$store.dispatch('retrieveItems')
    },
    computed: {
        ...mapGetters({
            retrieveRegister: 'retrieveRegister',
            isLoading: 'isLoading',
            retrieveItems: 'retrieveItems',
            sales_cart: 'sales_cart',
        }),
        cart_price: function() {
            return this.total_cart_price()
        },
    },

    methods: {
        complete_sale() {
            this.$store.dispatch('storeSalesItem', {
                    register_id: this.retrieveRegister.id,
                    items: this.sales_cart
                })
                .then(data => {
                    this.$store.dispatch('emptySalesCart')
                    this.render_key += 1;
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
            this.sales_cart.map(function(value, key) {
                total_price += value.price * value.cart_quantity
            });
            return total_price
        },
        destroyItem() {
            this.$store.dispatch('destroyItem', {
                    items_id: this.items_id
                })
                .then(response => {
                    this.$router.push({ name: 'Items' })
                })
        },
        deleteItem(item) {
            const index = this.items.indexOf(item)

            if (confirm('Are you sure you want to delete this item?')) {
                this.$store.dispatch('deleteItem', {
                        id: this.items[index].id
                    })
                    .then(response => {
                        this.items.splice(index, 1)
                    })
            }
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
        }
    }
}

</script>
