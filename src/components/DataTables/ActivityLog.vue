<template>
    <v-data-table :search="search" :headers="headers" :items="items" :sort-by="sortby" :sort-desc="sortdesc" :items-per-page="items_per_page" :loading="loading" dense>
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="mr-10"></v-text-field>
            </v-toolbar>
        </template>

        <template v-slot:item.properties="{ item }">
            <span class="oldData">{{item.properties.old}}</span>
            <span class="newData">{{item.properties.attributes}}</span>
        </template>

    </v-data-table>
</template>
<style scoped>
.text-right {
    text-align: right;
}
.oldData{
    color:darkred;
}
.newData{
    color:darkblue;
}
</style>
<script>
    import { mapState } from 'vuex'
    import moment from 'moment'

    const axios = require('axios')

    export default {
        props: ['title', 'headers', 'items', 'items_per_page', 'loading', 'sortdesc', 'sortby'],
        data() {
            return {
                search: '',
            }
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            ...mapState([
                'isLoading'
                ])
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
        },
        created() {
            this.initialize()
        },
        mounted() {
            if (this.$router.history.current.name == this.link_name) {
                this.dialog = true
            } else {
                this.dialog = false
            }
        },
        filters: {
            moment: function(date) {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');

            },
            month: function(date) {
                const current_month = moment().format('M')
                const date_month = moment(date).format('M')
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            },
        },
        methods: {
            initialize() {
                this.items = this.items
            },
        },
    }

</script>
