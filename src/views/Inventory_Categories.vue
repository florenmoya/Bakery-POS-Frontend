<template>
    <div>
        <DataTableCrud :search="search" :headers="headers" :items="categories" :dialog_prop="dialog" :editedIndex_prop="editedIndex" :editItems_prop="editItems" :editedItem_prop="editedItem" :items_per_page="items_per_page" :sortby="sortby" :defaultItem="defaultItem" :dialogShow_prop="dialogShow" :loading="isLoading" :link_name="link_name" />
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>
<script>
import DataTableCrud from '../components/DataTableCrud';
import { mapState } from 'vuex'

const axios = require('axios')

export default {
    components: {
        DataTableCrud
    },
    data() {
        return {
            link_name: 'Categories_Add',
            sortby: 'title',
            items_per_page: 20,
            dialog: false,
            dialogShow: false,
            snack: false,
            snackColor: '',
            snackText: '',
            search: '',
            headers: [
                { text: 'Name', value: 'title' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                title: ''
            },
            editItems: [
                { name: 'title' }
            ],
            defaultItem: {
                title: ''
            },
        }
    },

    mounted() {
        this.isLoaded = true;
    },
    computed: mapState([
        'categories', 'isLoading'
    ]),

    methods: {
        destroyItem() {
            this.$store.dispatch('destroyItem', {
                    items_id: this.items_id
                })
                .then(response => {
                    this.$router.push({ name: 'Items' })
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
        deleteItem(item) {
            const index = this.categories.indexOf(item)

            if (confirm('Are you sure you want to delete this item?')) {
                this.$store.dispatch('deleteCategories', {
                        id: this.categories[index].id
                    })
                    .then(response => {
                        this.categories.splice(index, 1)
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
            }
        },
        update(item, editedItem) {
            this.$store.dispatch('updateCategories', {
                    id: editedItem.id,
                    title: editedItem.title
                })
                .then(Object.assign(item, editedItem))
        },
        create(items, editedItem) {
            this.$store.dispatch('storeCategories', {
                    id: editedItem.id,
                    title: editedItem.title
                })
                .then(response => {
                    this.$store.dispatch('retrieveCategories')
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
        }
    }
};

</script>
