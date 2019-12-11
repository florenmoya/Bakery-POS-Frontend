<template>
    <v-data-table dense :search="search" :headers="headers" :items="items" :items-per-page="items_per_page" :loading="isLoading" multi-sort dense>
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>{{title}}</v-toolbar-title>
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
                            <v-container v-on:keyup.enter="save">
                                <v-row v-if="link_name != 'Categories_Add'">
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.stock" label="Stock"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                                    </v-col>
                                    <v-col class="d-flex" sm="6" md="4">
                                        <v-select :items="categories" v-model="editedItem.categories" item-value="id" item-text="name" label="Category"></v-select>
                                    </v-col>
                                </v-row>

                                <v-flex xs12 sm6 md4 v-else-if="link_name == 'Categories_Add'">
                                    <v-text-field v-model="editedItem.name" label="Category Name"></v-text-field>
                                </v-flex>

                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save" :disabled="isLoading">Save</v-btn>
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
import { mapState } from 'vuex'

export default {
    props: ['headers', 'items', 'dialog_prop', 'editedIndex_prop', 'title', 'editedItem_prop', 'defaultItem', 'items_per_page', 'dialogShow_prop', 'loading', 'cart_name', 'link_name', 'editItems_prop'],
    data() {
        return {
            search: '',
            dialog: this.dialog_prop,
            editedItem: this.editedItem_prop,
            editItems: this.editItems_prop,
            editedIndex: this.editedIndex_prop,
            errors: [],
        }
    },
    mounted() {
        this.$store.dispatch('retrieveCategories')
        if (this.$router.history.current.name == this.link_name) {
            this.dialog = true
        } else {
            this.dialog = false
        }
    },
    methods: {
        validate(text) {
            return false;
        },
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
                console.log(this.editedItem)
                this.$parent.update(this.items[this.editedIndex], this.editedItem);
            } else {
                this.$parent.create(this.items, this.editedItem);
            }
            this.close()
        }
    },
    created() {
        this.initialize()
    },
    watch: {
        dialog(val) {
            val || this.close()
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        ...mapState([
            'categories', 'isLoading'
        ])
    },
}

</script>
