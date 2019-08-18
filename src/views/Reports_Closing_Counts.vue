<template>
    <div>
        <DataTableCrudReports :headers="headers" :items="closingcounts" :dialog_prop="dialog" :editedIndex_prop="editedIndex" :editItems="editItems" :editedItem_prop="editedItem" :items_per_page="items_per_page" :sortby="sortby" :defaultItem="defaultItem" :dialogShow_prop="dialogShow" :loading="isLoading" :link_name="link_name" :title="title" />
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
            menu1: false,
            menu2: false,
            menu3: false,
            menu4: false,
            modal4: false,
            //datatable
            title: 'Closing Counts',
            sortby: 'created_at',
            link_name: 'Items_Add',
            items_per_page: 20,
            dialog: false,
            dialogShow: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Opened At', value: 'created_at' },
                { text: 'Closed At', value: 'updated_at' },
                { text: 'Starting Amount', value: 'starting_amount' },
                { text: 'Closing Amount', value: 'ending_amount' },
                { text: 'Sales', value: 'sales' },
                { text: 'Refund', value: 'refunds' },
                { text: 'Total', value: 'total' },
                { text: 'Lost', value: 'lost' }
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
        this.$store.dispatch('retrieveClosingCounts')
        this.isLoaded = true;
    },
    computed: {
        total() {
            return this.closingcounts.reduce(function(prev, cur) {
                this.closingcounts.forEach(function(item, index) {
                    let total = 0
                    if (item.sales[0]) {
                        item.sales[0].sales_item.forEach(function(item, index) {
                            total += item.price
                        });
                    }
                });
            }, 0)
        },
        ...mapState([
            'closingcounts', 'isLoading'
        ]),
    }
};

</script>
