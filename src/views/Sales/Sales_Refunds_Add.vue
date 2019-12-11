<template>
    <v-container fluid>
        <v-card>
            <v-tabs>
                <v-tab>
                    Refunds
                </v-tab>
                <v-tab>
                    Items
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <v-layout justify-space-between>
                            <v-flex xs6 md9>
                                <v-container class="datatable mt-2 mb-2">
                                    <Cart :key="render_key" :headers="headersCart" :items="cart_items" :loading="isLoading" :cart_name="cart_name" @total_cart_price="total_cart_price" @cart_select_items="cart_select_items" @snack_alert="snack_alert"/>
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
                                                    <span>{{cart_totalPrice}}</span>
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
                                                    <h2>{{cart_totalPrice}}</h2>
                                                </div>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    <v-container class="is-center">
                                        <v-btn v-if="isEmpty" class="ma-2" tile color="darken-1" @click="storeCartItem()" :loading="isLoading" dark>Submit Refund</v-btn>
                                    </v-container>
                                </v-container>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <DataTableItems :key="render_key" :headers="headersItem" :items="items" :selectedData="cart_items" :items_per_page="items_per_page" :sortby="sortby" :sortdesc="sortdesc" :show_select="show_select" :loading="isLoading" :cart_name="cart_name" @cart_select_items="cart_select_items" />
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
import { mapState } from 'vuex'
import Cart from '@/components/Cart';
import DataTableItems from '@/components/DataTableItems';

export default {
    components: {
        Cart,
        DataTableItems
    },
    data() {
        return {
            // alert & misc
            render_key: 0,
            snack: false,
            snackColor: '',
            snackText: '',
            // Cart
            cart_name: 'refunds_cart',
            cart_items: [],
            cart_totalPrice: 0,
            headersCart: [
                { text: '#', value: 'action', sortable: false },
                { text: 'Description', value: 'description', sortable: false },
                { text: 'QTY', value: 'cart_quantity', sortable: false },
                { text: 'Price', value: 'price', sortable: false },
                { text: 'Total Price', value: 'total_price', sortable: false }
            ],
            // DataTableCrud
            items_per_page: 20,
            show_select: true,
            sortby: ['category_id', 'quantity'],
            sortdesc: [false, true],
            headersItem: [
                { text: 'Description', value: 'description' },
                { text: 'QTY', value: 'quantity' },
                { text: 'Price', value: 'price' },
                { text: 'Category', value: 'category.title' },
            ],
        }
    },
    mounted() {
        if (localStorage.getItem(this.cart_name)) {
            this.cart_items = JSON.parse(localStorage.getItem(this.cart_name))
        }
        this.$store.dispatch('retrieveRegister')
        this.$store.dispatch('retrieveItems')
    },
    computed: {
        ...mapState([
            'items', 'isLoading', 'register'
        ]),
        isEmpty() {
            return (this.cart_items.length > 0) ? true : false
        }
    },
    methods: {
        snack_alert(color,text) {
            this.snack = true
            this.snackColor = color
            this.snackText = text
            //re-render
            this.render_key += 1
        },
        cart_select_items(selected) {
            const selectedRow = selected[0];

            this.cart_items = selected.map(selectedRow => 
            {
                const item = selected.find(item => item.id === selectedRow.id)
                if(item.cart_quantity || item.cart_quantity == 0){
                }else{
                    item.cart_quantity = 1;
                }
                return item
            })

            this.total_cart_price(this.cart_items)
        },
        storeCartItem() {

            this.$store.dispatch('storeCartItem', {
                    cart_name: this.cart_name,
                    register_id: this.register.id,
                    cart_items: this.cart_items
                })
                .then(data => {
                    this.cart_items = [];
                    localStorage.setItem(this.cart_name, []);
                    this.$store.dispatch('retrieveItems')
                    this.snack_alert('success', 'Data Saved')
                })
                .catch(error => {
                    this.snack_alert('error', 'Error Please Try Again')
                    console.log(error.response)
                });
        },
        total_cart_price(items) {
            let total_price = 0
            items.map(function(value, key) {
                total_price += value.price * value.cart_quantity
            });
            this.cart_totalPrice = total_price
            
            //store selected items
            localStorage.setItem(this.cart_name, JSON.stringify(items))
        },
    }
}

</script>
