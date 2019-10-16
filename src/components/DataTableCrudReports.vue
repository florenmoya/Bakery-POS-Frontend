<template>
    <v-data-table :search="search" :headers="headers" :items="items" :items-per-page="items_per_page" :loading="loading" dense>
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="mr-10"></v-text-field>
            </v-toolbar>
        </template>
        <template v-slot:body.append>
            <tr>
                <td class="text-right" :colspan="headers.length">
                    Total selected: {{selectedTotal}}
                </td>
            </tr>
        </template>
    </v-data-table>
</template>
<style scoped>
.text-right {
    text-align: right;
}

</style>
<script>
import { mapState } from 'vuex'
import moment from 'moment'

const axios = require('axios')

export default {
    props: ['title', 'headers', 'items', 'items_per_page', 'loading',],
    data() {
        return {

            search: '',
            singleSelect: false,
            selected: [],
            dialog: this.dialog_prop,
            editedItem: this.editedItem_prop,
            editedIndex: this.editedIndex_prop
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        ...mapState([
            'isLoading'
        ]),
        selectedTotal() {
            let total = 0
            this.selected.map(function(item, index) {
                total += Number(item.price)
            })
            return total;
        }
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
        }
    },
    methods: {
        total_amount(item, item_items) {
            let total = 0
            let items = item_items
            item.map(function(item, index) {
                if (items == 'sales') {
                    item.sales_item.map(function(item, index) {
                        total += item.price
                    })
                } else if (items == 'refunds') {
                    item.refunds_item.map(function(item, index) {
                        total -= item.price
                    })
                }
            })
            return total
        },
        initialize() {
            this.items = this.items
        },

        editItem(item) {
            this.editedIndex = this.items.indexOf(item)
            console.log(this.editedIndex)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.$parent.deleteItem(item);
        },

        close() {
            this.dialog = false
            this.dialogShow = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save() {
            if (this.editedIndex > -1) {
                this.$parent.update(this.items[this.editedIndex], this.editedItem);
            } else {
                this.$parent.create(this.items, this.editedItem);
            }
            this.close()
        },
    },
}

</script>
