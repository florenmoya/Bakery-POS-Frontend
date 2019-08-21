<template>
    <div>
        <DataTableCrudReports :headers="headers" :items="SalesItems" :dialog_prop="dialog" :editedIndex_prop="editedIndex" :editItems="editItems" :editedItem_prop="editedItem" :items_per_page="items_per_page" :sortby="sortby" :sortdesc="sortdesc" :defaultItem="defaultItem" :dialogShow_prop="dialogShow" :link_name="link_name" :title="title"/>
    </div>
</template>
<style scoped>
.datepicker {
    display: inline;
}

</style>
<script>
import moment from 'moment'

import DataTableCrudReports from '../components/DataTableCrudReports'
import { mapState } from 'vuex'

const axios = require('axios')

export default {
    components: {
        DataTableCrudReports
    },
    data() {
        return {
            title: 'Sales',
            sortby: ['created_at'],
            sortdesc: [true],
            link_name: 'Items_Add',
            items_per_page: 20,
            dialog: false,
            dialogShow: [],
            headers: [
                { text: 'Date', value: 'created_at' },
                { text: 'Description', value: 'item.description' },
                { text: 'QTY', value: 'quantity' },
                { text: 'Price', value: 'price' },
                { text: 'Category', value: 'item.category' }
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
        this.$store.dispatch('retrieveSalesItem')
    },

    computed: {
        ...mapState([
            'SalesItems'
        ]),
    }
};

</script>
