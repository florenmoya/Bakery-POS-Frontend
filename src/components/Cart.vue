<template>
    <div>
        <v-data-table hide-default-footer v-model="selected" :headers="headers" :items="items" :items-per-page="items_per_page" :loading="loading">
            <template v-slot:item.quantity="props">
                <v-edit-dialog :return-value.sync="props.item.quantity" @save="save" @cancel="cancel" @open="open" @close="close"> {{ props.item.quantity }}
                    <template v-slot:input>
                        <v-text-field v-model="props.item.quantity" label="Edit" single-line></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon small @click="deleteItem(item)">
                    delete
                </v-icon>
            </template>
        </v-data-table>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>
<script>
const axios = require('axios')
export default {
    props: ['headers', 'items', 'items_per_page', 'single-select', 'show_select', 'dialogShowprop', 'loading', 'sortby', 'cart_name'],
    data() {
        return {
            dialog: this.dialogprop,
            selected: this.selectedprop,
            snack: false,
            snackColor: '',
            snackText: '',

        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    updated() {
        this.dialog = this.dialogShowprop
    },
    methods: {
        save() {
            this.snack = true
            this.snackColor = 'success'
            this.snackText = 'Quantity Saved'
        },
        cancel() {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'Canceled'
        },
        open() {
            this.snack = true
            this.snackColor = 'info'
            this.snackText = 'Dialog opened'
        },
        editItem(item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(item) {
            this.$parent.deleteItem(item);
        },
        close() {
            console.log('Dialog closed')
        },
    },
}

</script>
