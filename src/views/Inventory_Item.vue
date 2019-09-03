<template>
    <div>
        <DataTableCrud :search="search" :headers="headers" :items="items" :dialog_prop="dialog" :editedIndex_prop="editedIndex" :editedItem_prop="editedItem" :items_per_page="items_per_page" :sortby="sortby" :sortdesc="sortdesc" :defaultItem="defaultItem" :dialogShow_prop="dialogShow" :link_name="link_name" />
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
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
            sortby: ['category_id', 'quantity'],
            sortdesc: [false, true],
            link_name: 'Items_Add',
            items_per_page: 20,
            dialog: false,
            dialogShow: [],
            snack: false,
            snackColor: '',
            snackText: '',
            search: '',
            headers: [
                { text: 'Description', value: 'description' },
                { text: 'QTY', value: 'quantity' },
                { text: 'Price', value: 'price' },
                { text: 'Category', value: 'category.title' },
                { text: 'Actions', value: 'action', sortable: false }

            ],
            editedIndex: -1,
            editedItem: {
                description: '',
                quantity: 0,
                price: 0,
                category_id: 0,
                type: 0,
                item_cost: 0,
                notes: ''
            },
            defaultItem: {
                description: '',
                quantity: 0,
                price: 0,
                category_id: 0,
                type: 0,
                item_cost: 0,
                notes: ''
            },
        }
    },

    mounted() {
        this.$store.dispatch('retrieveItems')
        this.isLoaded = true;
    },

    computed: {
        ...mapState([
            'items'
        ]),
    },
    methods: {
        deleteItem(item) {
            const index = this.items.indexOf(item)

            if (confirm('Are you sure you want to delete this item?')) {
                this.$store.dispatch('deleteItem', {
                        id: this.items[index].id
                    })
                    .then(response => {
                        this.items.splice(index, 1)
                        this.snack = true
                        this.snackColor = 'warning'
                        this.snackText = 'Item Removed'
                    })
                    .catch(error => {
                        this.snack = true
                        this.snackColor = 'error'
                        this.snackText = 'Error Please Try Again'
                        console.log(error.response)
                    });
            }
        },
        update(item, editedItem) {
            this.$store.dispatch('updateItem', {
                    id: editedItem.id,
                    description: editedItem.description,
                    quantity: editedItem.quantity,
                    category_id: editedItem.category,
                    price: editedItem.price,
                    type: editedItem.type,
                    item_cost: editedItem.item_cost,
                    notes: editedItem.notes
                })
                .then(response => {
                    this.$store.dispatch('retrieveItems')
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
        create(items, editedItem) {
            this.$store.dispatch('storeItem', {
                    description: editedItem.description,
                    quantity: editedItem.quantity,
                    category_id: editedItem.category,
                    price: editedItem.price,
                    type: editedItem.type,
                    item_cost: editedItem.item_cost,
                    notes: editedItem.notes
                })
                .then(response => {
                    this.$store.dispatch('retrieveItems')
                    this.snack = true
                    this.snackColor = 'success'
                    this.snackText = 'Item added'
                })
                .catch(error => {
                    this.snack = true
                    this.snackColor = 'error'
                    this.snackText = 'Error Please Try Again'
                    console.log(error.response)
                });
        }
    }
};

</script>
