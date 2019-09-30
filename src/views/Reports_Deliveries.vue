<template>

    <div>
        <DataTableReportsTotalDeliveries :headers="headers" :items="deliveries" :items_per_page="items_per_page" :sortby="sortby":title="title" />
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
            { text: 'Deliveries ID', value: 'id' },
            { text: 'Date', value: 'created_at' },
            ],
        }
    },

    mounted() {
        this.$store.dispatch('retrieveCategories')
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
