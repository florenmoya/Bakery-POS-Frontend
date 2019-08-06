<template>
    <DataTableCrud :search="search" :headers="headers" :items="items" :dialogprop="dialog" :editedIndexprop="editedIndex" :editItems="editItems" :editedItemprop="editedItem" :single-select="singleSelect" :selectedprop="selectedprop" :items_per_page="items_per_page" :sortby="sortby" :defaultItem="defaultItem" :show_select="show_select" :dialogShowprop="dialogShowprop" :loading="isLoading" />
</template>
<script>
import DataTableCrud from '../components/DataTableCrud'
import { mapState } from 'vuex'

const axios = require('axios')

export default {
    components: {
        DataTableCrud
    },
    data() {
        return {
            show_select: true,
            singleSelect: false,
            selectedprop: [],
            sortby: 'description',
            items_per_page: 20,
            dialog: false,
            dialogShowprop: [],
            search: '',
            headers: [
                { text: 'Description', value: 'description' },
                { text: 'QTY', value: 'quantity' },
                { text: 'Price', value: 'price' },
                { text: 'Category', value: 'category' },
                { text: 'Actions', value: 'action', sortable: false }

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
        this.$store.dispatch('retrieveItems')
        this.isLoaded = true;
        if (this.$router.history.current.name == 'Items_Add') {
            this.dialogShowprop = true
        }
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
};

</script>
