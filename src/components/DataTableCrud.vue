<template>
    <v-data-table v-model="selected" dense :search="search" :headers="headers" :items="items" :items-per-page="items_per_page" v-bind:show-select="show_select" :sort-by="sortby" :loading="loading">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Items</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="mr-10"></v-text-field>
                <v-dialog v-model="dialog" max-width="500px" v-if="">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4 v-for="n in editItems.length">
                                        <v-text-field v-model="editedItem[editItems[n-1].name]" v-bind:label="editItems[n-1].name"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                edit
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>
<script>
const axios = require('axios')
export default {
    props: ['headers', 'items', 'dialogprop', 'editedIndexprop', 'editedItemprop', 'defaultItem', 'editItems', 'search', 'items_per_page', 'q', 'single-select', 'show_select', 'dialogShowprop', 'loading', 'sortby', 'cart_name'],
    data() {
        return {
            dialog: this.dialogprop,
            selected: this.selectedprop,
            editedItem: this.editedItemprop,
            editedIndex: this.editedIndexprop,
            cart: [],
            cartparsed: [],
            test: []
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        msg() {
            const selectedRow = this.selected[0];
            return selectedRow;
        }
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        selected: {
            handler() {
                // let cartQuantity = { items: this.selected, quantity: 0 }
                // localStorage.setItem(this.cart_name, JSON.stringify(cartQuantity));
                // let gray = JSON.parse(localStorage.getItem(this.cart_name));
                // console.log(gray)
                localStorage.setItem(this.cart_name, JSON.stringify(this.selected));
                // var n = this.selected.includes("Charmee");

            },
            deep: true,
        },
    },
    mounted() {
        if (localStorage.getItem(this.cart_name)) {
            this.selected = JSON.parse(localStorage.getItem(this.cart_name))
        }
        // this.selected.map(function(value, key) {
        //     if(value.description == 'Candles'){
        //         console.log(value.description)
        //     }
        // });
        // const cart = JSON.parse(localStorage.getItem(this.cart_name))
        // cart.map(function(value, key) {
        //         console.log(value.description)
        //         console.log(value.quantity)
        //         value.quantity = 0
        //         console.log(value.quantity)

        // });
    },
    destroyed() {
        this.selected.map(function(value, key) {
                this.selected.push(value);
        });
    },
    created() {
        this.initialize()
    },
    updated() {
        this.dialog = this.dialogShowprop
    },
    methods: {
        initialize() {
            this.items = this.items
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
