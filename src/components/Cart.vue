<template>
    <div>
        <v-data-table hide-default-footer :headers="headers" :items="items" :page.sync="page" :items-per-page="100" @page-count="pageCount = $event ":loading="loading">
            <template v-slot:item.action="{ item }">
                <v-icon small @click="deleteItem(item)">
                    delete
                </v-icon>
            </template>
            <template v-slot:item.total_price="{ item }">
                {{ item.cart_quantity * item.price}}
            </template>
            <template v-slot:item.cart_quantity="{ item }">
                <v-icon @click="minusItem(item)">
                    remove
                </v-icon>
                <div class="is-inline-block">
                    <v-edit-dialog :return-value.sync="item.cart_quantity" large @save="save(item)" @open="open">
                        {{ item.cart_quantity }}
                        <template v-slot:input>
                            <div class="mt-4 title">Update Quantity</div>
                        </template>
                        <template v-slot:input>
                            <v-text-field v-model="item.cart_quantity" label="Edit" single-line autofocus></v-text-field>
                        </template>
                    </v-edit-dialog>
                </div>
                <v-icon @click="addItem(item)">
                    add
                </v-icon>
            </template>
        </v-data-table>
        <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount" v-if="pageCount>1"></v-pagination>
    </div>
    </div>
</template>
<script>
const axios = require('axios')

export default {
    props: ['headers', 'items', 'loading', 'sortby', 'cart_name'],
    data() {
        return {
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        }
    },
    mounted() {
        this.total_cart_price()
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    methods: {
        addItem(item) {
            const index = this.items.indexOf(item)
            item.cart_quantity += 1
            Object.assign(this.items[index], item)
            localStorage.setItem(this.cart_name, JSON.stringify(this.items))
                this.$emit('snack_alert', 'info', 'Quantity has been increased')
        },
        minusItem(item) {
            if (item.cart_quantity > 0) {
                const index = this.items.indexOf(item)
                item.cart_quantity -= 1
                Object.assign(this.items[index], item)
                localStorage.setItem(this.cart_name, JSON.stringify(this.items))
                this.$emit('snack_alert', 'warning', 'Quantity has been decreased')
            }
        },
        save(item) {
            item.cart_quantity = parseInt(item.cart_quantity)
            const index = this.items.indexOf(item)
            item.total_price = item.price * item.cart_quantity
            Object.assign(this.items[index], item)
            localStorage.setItem(this.cart_name, JSON.stringify(this.items));
            this.$emit('snack_alert', 'warning', 'Quantity has been changed')
        },
        open(item) {
            const editedIndex = this.items.indexOf(item)
        },
        deleteItem(item) {
            const index = this.items.indexOf(item)
            Vue.delete(this.items, [index])
            localStorage.setItem(this.cart_name, JSON.stringify(this.items.filter(x => x)));
            this.$emit('snack_alert', 'warning', 'Item Removed')
        },
        total_cart_price() {
            this.$emit('total_cart_price', this.items);
        },
    },
}

</script>
<style scoped>
.is-inline-block {
    display: inline-block;
}

</style>
