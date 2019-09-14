<template>
    <div>
        <DataTableCrudReports :headers="headers" :items="deliveries" :dialog_prop="dialog" :editedIndex_prop="editedIndex" :editItems="editItems" :editedItem_prop="editedItem" :items_per_page="items_per_page" :sortby="sortby" :defaultItem="defaultItem" :dialogShow_prop="dialogShow" :loading="isLoading" :link_name="link_name" :date_to="date_from" :date_from="date_to" :title="title"/>
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
            //datetime
            time_from: '7:00',
            time_to: '7:00',
            date_from: new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24 * 1).toISOString().substr(0, 10),
            date_to: new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,
            menu3: false,
            menu4: false,
            modal4: false,
            //datatable
            title: 'Deliveries',
            sortby: ['category_id', 'quantity'],
            sortdesc: [false, true],
            link_name: 'Items_Add',
            items_per_page: 20,
            dialog: false,
            dialogShow: [],
            headers: [
                { text: 'Description', value: 'item.description' },
                { text: 'QTY', value: 'total_quantity' },
                { text: 'Price', value: 'total_price' },
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
        this.$store.dispatch('retrieveDeliveries')
        this.isLoaded = true;
    },

    computed: {
        date_from_computed() {
            return this.date_from ? moment(this.date_from).format('dddd, MMMM Do YYYY') : ''
        },
        date_to_computed() {
            return this.date_to ? moment(this.date_to).format('dddd, MMMM Do YYYY') : ''
        },
        ...mapState([
            'deliveries', 'isLoading'
        ]),
    },
};

</script>
