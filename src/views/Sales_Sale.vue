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
                                <Cart :headers="headers" :items="sales_cart" :single-select="singleSelect" :items_per_page="items_per_page" :dialogShowprop="dialogShowprop" :loading="isLoading" />
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
                                                <span>0</span>
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
                                                <h2>0</h2>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>
<style scoped>
.bg-white {
    background-color: #fff;
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

export default {
    components: {
        Cart
    },
    data() {
        return {
            tab: null,
            tabs: [
                { name: 'Sales', path: '/sales/sale' }, { name: 'Items', path: '/sales/items' }
            ],
            sales_cart: [],
            show_select: true,
            singleSelect: false,
            selected: [],
            sortby: 'description',
            items_per_page: 20,
            dialog: false,
            dialogShowprop: false,
            search: '',
            headers: [
                { text: '#', value: 'action', sortable: false },
                { text: 'Description', value: 'description', sortable: false },
                { text: 'QTY', value: 'quantity', sortable: false },
                { text: 'Price', value: 'price', sortable: false },
            ],
            sale_cart_data: []
        }
    },
    mounted() {
        if (localStorage.getItem('sales_cart')) this.sales_cart = JSON.parse(localStorage.getItem('sales_cart'));
        this.sale_cart_data = { items: this.sales_cart }
        for (var i = 0; i < this.sales_cart.length; i++) {
            this.sales_cart[i].quantity = 0;
            console.log(this.sales_cart[i].quantity);
        }
        console.log(this.sale_cart_data);

    },

    computed: mapState([
        'isLoading'
    ]),
    methods: {
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
