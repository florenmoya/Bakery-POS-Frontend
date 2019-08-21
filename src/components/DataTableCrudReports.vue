<template>
    <v-data-table dense :search="search" :headers="headers" :items="items" :items-per-page="items_per_page" :sort-by="sortby" :sort-desc="sortdesc" :loading="loading" multi-sort>
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="mr-10"></v-text-field>
            </v-toolbar>
        </template>
        <template v-slot:item.sales="{ item }" v-if="title == 'Closing Counts'">
            {{total_amount(item.sales, 'sales')}}
        </template>
        <template v-slot:item.refunds="{ item }" v-if="title == 'Closing Counts'">
            {{total_amount(item.refunds, 'refunds')}}
        </template>
        <template v-slot:item.total="{ item }" v-if="title == 'Closing Counts'">
            {{total_amount(item.sales, 'sales')+total_amount(item.refunds, 'refunds')+item.starting_amount}}
        </template>
        <template v-slot:item.lost="{ item }" v-if="title == 'Closing Counts'">
            {{(total_amount(item.sales, 'sales')+item.starting_amount+total_amount(item.refunds, 'refunds'))-item.ending_amount}}
        </template>
    </v-data-table>
</template>
<script>
import { mapState } from 'vuex'

const axios = require('axios')

export default {
    props: ['title', 'headers', 'items', 'dialog_prop', 'editedIndex_prop', 'editedItem_prop', 'defaultItem', 'editItems', 'items_per_page', 'dialogShow_prop', 'loading', 'sortby', 'sortdesc', 'cart_name', 'link_name'],
    data() {
        return {
            search: '',
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
