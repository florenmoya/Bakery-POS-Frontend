<template>
    <v-data-table v-model="selected" dense :search="search" :headers="headers" :items="items" :items-per-page="items_per_page" v-bind:show-select="show_select" :sort-by="sortby" :sort-desc="sortdesc" :loading="loading" multi-sort>
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Items</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="mr-10"></v-text-field>
            </v-toolbar>
        </template>
    </v-data-table>
</template>
<script>
const axios = require('axios')

export default {
    props: ['headers', 'items', 'items_per_page', 'selectedData', 'single-select', 'show_select', 'loading', 'sortby', 'sortdesc', 'cart_name'],
    data() {
        return {
            search: '',
            selected: this.selectedData
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }
    },
    updated() {
        this.$emit('cart_select_items', this.selected);
    },
}

</script>
