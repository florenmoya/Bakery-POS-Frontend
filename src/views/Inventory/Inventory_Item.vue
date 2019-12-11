<template>
    <div>
        <DataTableCrud :search="search" :headers="headers" :items="items" :dialog_prop="dialog" :editedIndex_prop="editedIndex" :editedItem_prop="editedItem" :items_per_page="items_per_page" :defaultItem="defaultItem" :dialogShow_prop="dialogShow" :link_name="link_name" :title="title" />
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>
<script>
import DataTableCrud from '@/components/DataTableCrud'
import { mapState } from 'vuex'

const axios = require('axios')

export default {
    components: {
        DataTableCrud
    },
    data() {
        return {
            title: 'Item',
            link_name: 'Add Items',
            items_per_page: 20,
            dialog: false,
            dialogShow: [],
            snack: false,
            snackColor: '',
            snackText: '',
            search: '',
            headers: [
                { text: 'Description', value: 'description' },
                { text: 'QTY', value: 'stock' },
                { text: 'Price', value: 'price' },
                { text: 'Category', value: 'categories.name' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                description: '',
                stock: 0,
                price: 0,
                category: 0,
                type: 0,
                cost: 0,
                notes: ''
            },
            defaultItem: {
                description: '',
                stock: 0,
                price: 0,
                category: 0,
                type: 0,
                cost: 0,
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
            let category = "";
            if (editedItem.categories.id) category = editedItem.categories.id
            else { category = editedItem.categories }
            this.$store.dispatch('updateItem', {
                    id: editedItem.id,
                    description: editedItem.description,
                    stock: editedItem.stock,
                    category_id: category,
                    price: editedItem.price,
                    type: editedItem.type,
                    cost: editedItem.cost,
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
            let category = "";
            if (editedItem.categories.id) category = editedItem.categories.id
            else { category = editedItem.categories }
            this.$store.dispatch('storeItem', {
                    description: editedItem.description,
                    stock: editedItem.stock,
                    category_id: category,
                    price: editedItem.price,
                    type: editedItem.type,
                    cost: editedItem.cost,
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
