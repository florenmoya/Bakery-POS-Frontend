<template>
    <DataTableCrud :search="search" :headers="headers" :items="categories" :dialogprop="dialog" :editedIndexprop="editedIndex" :editItems="editItems" :editedItemprop="editedItem" :single-select="singleSelect" :selected="selected" :items_per_page="items_per_page" :sortby="sortby" :defaultItem="defaultItem" :show_select="show_select" 
    :dialogShowprop="dialogShowprop" :loading="isLoading" />
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
            show_select: true,
            singleSelect: false,
            selected: [],
            sortby: 'category_name',
            items_per_page: 20,
            dialog: false,
            dialogShowprop: false,
            search: '',
            headers: [
                { text: 'Name', value: 'category_name' },
                { text: 'Actions', value: 'action', sortable: false }

            ],
            editedIndex: -1,
            editedItem: {
                category_name: ''
            },
            editItems: [
                { name: 'category_name' }
            ],
            defaultItem: {
                category_name: ''
            },
        }
    },

    mounted() {
        this.$store.dispatch('retrieveCategories')
        this.isLoaded = true;
               if (this.$router.history.current.name == 'Categories_Add') {
            this.dialogShowprop = true
        }

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
                })
        },
        deleteItem(item) {
            const index = this.categories.indexOf(item)
            console.log(this.categories[index].id)

            if (confirm('Are you sure you want to delete this item?')) {
                this.$store.dispatch('deleteCategories', {
                        id: this.categories[index].id
                    })
                    .then(response => {
                        this.categories.splice(index, 1)
                    })
            }
        },
        update(item, editedItem) {
            this.$store.dispatch('updateCategories', {
                    id: editedItem.id,
                    category_name: editedItem.category_name
                })
                .then(Object.assign(item, editedItem))
        },
        create(items, editedItem) {
            this.$store.dispatch('storeCategories', {
                    id: editedItem.id,
                    category_name: editedItem.category_name
                })
                .then(items.push(editedItem))
        }
    }
};

</script>
