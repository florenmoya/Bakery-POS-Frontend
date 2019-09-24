<template>
    <div>
        <DataTableReportsTotalDeliveries :headers="headers" :items="deliveries" :dialog_prop="dialog" :editedIndex_prop="editedIndex" :editItems="editItems" :editedItem_prop="editedItem" :items_per_page="items_per_page" :sortby="sortby" :defaultItem="defaultItem" :dialogShow_prop="dialogShow" :loading="isLoading" :link_name="link_name" :title="title" />
    </div>
</template>
<script>
import moment from 'moment'
import DataTableReportsTotalDeliveries from '../components/DataTableReportsTotalDeliveries'
import { mapState } from 'vuex'

export default {
    components: {
        DataTableReportsTotalDeliveries
    },
    data() {
        return {
            title: 'Deliveries',
            sortby: ['category_id', 'quantity'],
            sortdesc: [false, true],
            items_per_page: 15,
            headers: [
                { text: 'Date', value: 'item.created_at' },
                { text: 'Description', value: 'item.description' },
                { text: 'QTY', value: 'total_quantity' },
                { text: 'Price', value: 'total_price' },
            ],
        }
    },

    mounted() {
        this.$store.dispatch('retrieveDeliveries')
        this.isLoaded = true;
    },

    computed: {
        ...mapState([
            'deliveries', 'isLoading'
        ]),
    },
};

</script>
