<template>
    <div>
        <DataTableReportsClosing :title="title" :headers="headers" :items="closingcounts" :items_per_page="items_per_page" :sortby="sortby" :sortdesc="sortdesc" />
    </div>
</template>
<script>
import moment from 'moment'
import DataTableReportsClosing from '../components/DataTableReportsClosing'
import { mapState } from 'vuex'

export default {
    components: {
        DataTableReportsClosing
    },
    data() {
        return {
            title: 'Closing Counts',
            sortby: ['created_at'],
            sortdesc: [true],
            items_per_page: 20,
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
            ]
        }
    },

    mounted() {
        this.$store.dispatch('retrieveClosingCounts')
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
            'closingcounts'
        ]),
    }
};

</script>
