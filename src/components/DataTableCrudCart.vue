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
        },
        msg() {
            const selectedRow = this.selected[0];
            return selectedRow;
        }
    },
    mounted() {
        if (localStorage.getItem(this.cart_name)) {
            this.selected = JSON.parse(localStorage.getItem(this.cart_name))
        }
    },

    updated() {
        if (this.selected) {
            if (localStorage.getItem(this.cart_name)) {
                let getItem = JSON.parse(localStorage.getItem(this.cart_name))
                for (let i = 0; i < this.selected.length; i++) {
                    if (!this.selected[i].cart_quantity) {
                        if (getItem[i] && getItem[i].id == this.selected[i].id) {
                            this.selected[i].cart_quantity = getItem[i].cart_quantity
                        } else {
                            this.selected[i] = Object.assign({}, this.selected[i], { cart_quantity: 1 })
                        }
                    }
                }
            } else {
                for (let i = 0; i < this.selected.length; i++) {
                    this.selected[i] = Object.assign({}, this.selected[i], { cart_quantity: 1 })
                }
            }
            localStorage.setItem(this.cart_name, JSON.stringify(this.selected))

            this.$store.dispatch('addCartItem', {
                selected: this.selected,
                cart_name: this.cart_name
            })
        }
    },
    created() {
        this.initialize()
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
            this.$parent.$parent.deleteItem(item);
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
                this.$parent.$parent.update(this.items[this.editedIndex], this.editedItem);
            } else {
                this.$parent.$parent.create(this.items, this.editedItem);
            }
            this.close()
        },
    },
}

</script>
