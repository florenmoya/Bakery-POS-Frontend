<template>
    <div>
        <DataTableCrudReports :headers="headers" :items="SalesItems" :items_per_page="items_per_page" :sortby="sortby" :sortdesc="sortdesc" :title="title" />
    </div>
</template>
<script>
import moment from 'moment'
import DataTableCrudReports from '../components/DataTableCrudReports'
import { mapState } from 'vuex'

export default {
    components: {
        DataTableCrudReports
    },
    data() {
        return {
            title: 'Sales',
            sortby: ['created_at'],
            sortdesc: [true],
            items_per_page: 15,
            headers: [
                { text: 'Date', value: 'created_at' },
                { text: 'Description', value: 'item.description' },
                { text: 'QTY', value: 'quantity' },
                { text: 'Price', value: 'price' },
                { text: 'Category', value: 'item.categories.name' }
            ],
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
