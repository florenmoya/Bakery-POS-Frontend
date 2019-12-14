<template>
    <div>
        <ActivityLog :title="title" :headers="headers" :items="ActivityLog" :items_per_page="items_per_page" :sortby="sortby" :sortdesc="sortdesc" />
    </div>
</template>
<script>
    import moment from 'moment'
    import ActivityLog from '@/components/DataTables/ActivityLog.vue'
    import { mapState } from 'vuex'

    export default {
        components: {
            ActivityLog
        },
        data() {
            return {
                title: 'ActivityLog',
                sortby: ['created_at'],
                sortdesc: [true],
                items_per_page: 20,
                headers: [
                { text: 'ID', value: 'id' },
                { text: 'DataTables', value: 'created_at' },
                { text: 'Description', value: 'description' },
                { text: 'Subject ID', value: 'subject_id' },
                { text: 'Performed ID', value: 'causer_id' },
                { text: 'Properties', value: 'properties' },
                ]
            }
        },

        mounted() {
            this.$store.dispatch('retrieveActivityLog')
        },
        computed: {
            ...mapState([
                'ActivityLog'
                ]),
        }
    };

</script>
