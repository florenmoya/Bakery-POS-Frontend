<template>
    <v-data-table dense :search="search" :headers="headers" :items="items" :items-per-page="items_per_page" :sort-by="sortby" :loading="loading" :custom-filter="filterOnlyCapsText">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="mr-10"></v-text-field>
            </v-toolbar>
        </template>
    </v-data-table>
</template>
<script>
const axios = require('axios')

export default {
    props: ['title', 'headers', 'items', 'dialog_prop', 'editedIndex_prop', 'editedItem_prop', 'defaultItem', 'editItems', 'items_per_page', 'dialogShow_prop', 'loading', 'sortby', 'cart_name', 'link_name'],
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
    methods: {
        filterOnlyCapsText(value, search, item) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().indexOf(search) !== -1
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
