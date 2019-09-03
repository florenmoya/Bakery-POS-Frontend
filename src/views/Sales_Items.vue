<template>
    <v-container>
        <v-card>
            <v-tabs v-model="tab">
                <v-tab v-for="tab in tabs" :key="tab.index" :to="tab.path" oncontextmenu="return false;">
                    {{ tab.name }}
                </v-tab>
                <v-spacer></v-spacer>
                <v-tab-item v-for="tab in tabs" :key="tab.index" :id="tab.path">
                    <router-view v-if="tab === tab.path" />
                </v-tab-item>
            </v-tabs>
            <DataTableCrudCart :search="search" :headers="headers" :items="items" :dialogprop="dialog" :editedIndexprop="editedIndex" :editItems="editItems" :editedItemprop="editedItem" :single-select="singleSelect" :selectedprop="sales_cart" :items_per_page="items_per_page" :sortby="sortby" :sortdesc="sortdesc" :defaultItem="defaultItem" :show_select="show_select" :dialogShowprop="dialogShowprop" :loading="isLoading" :cart_name="cart_name" />
        </v-card>
    </v-container>
</template>
<script>
import DataTableCrudCart from '../components/DataTableCrudCart';
import { mapState } from 'vuex'

export default {
    components: {
        DataTableCrudCart
    },
    data() {
        return {
            tab: null,
            tabs: [
                { name: 'Sales', path: '/sales/sale' },
                { name: 'Items', path: '/sales/items' }
            ],
            // DataTableCrud
            cart_name: 'sales_cart',
            show_select: true,
            sales_cart: JSON.parse(localStorage.getItem('sales_cart')) || null,
            singleSelect: false,
            sortby: ['category_id', 'quantity'],
            sortdesc: [false, true],
            items_per_page: 50,
            dialog: false,
            dialogShowprop: false,
            search: '',
            headers: [
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
            // --
        }
    },
    mounted() {
        this.$store.dispatch('retrieveItems')
        this.isLoaded = true;
    },
    computed: mapState([
        'items', 'isLoading'
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
