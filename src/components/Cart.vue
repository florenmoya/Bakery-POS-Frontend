<template>
    <div>
        <v-data-table hide-default-footer :key="render_key" :headers="headers" :items="items" :items-per-page="items_per_page" :loading="loading">
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
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>
<script>
const axios = require('axios')

export default {
    props: ['headers', 'items', 'items_per_page', 'loading', 'sortby', 'cart_name'],
    data() {
        return {
            render_key: 0,
            snack: false,
            snackColor: '',
            snackText: '',
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
        reRender(){
            this.render_key += 1
            this.total_cart_price()
        },
        addItem(item) {
            const index = this.items.indexOf(item)
            item.cart_quantity += 1
            Object.assign(this.items[index], item)
            localStorage.setItem(this.cart_name, JSON.stringify(this.items))
            this.reRender()
        },
        minusItem(item) {
            if (item.cart_quantity > 0) {
                const index = this.items.indexOf(item)
                item.cart_quantity -= 1
                Object.assign(this.items[index], item)
                localStorage.setItem(this.cart_name, JSON.stringify(this.items))
                this.reRender()
            }
        },
        save(item) {
            item.cart_quantity = parseInt(item.cart_quantity)
            const index = this.items.indexOf(item)
            item.total_price = item.price * item.cart_quantity
            Object.assign(this.items[index], item)
            localStorage.setItem(this.cart_name, JSON.stringify(this.items));

            this.snack = true
            this.snackColor = 'success'
            this.snackText = 'Completed'
        },
        open(item) {
            const editedIndex = this.items.indexOf(item)
        },
        deleteItem(item) {
            const index = this.items.indexOf(item)
            Vue.delete(this.items, [index])
            localStorage.setItem(this.cart_name, JSON.stringify(this.items.filter(x => x)));
            this.snack = true
            this.snackColor = 'warning'
            this.snackText = 'Item Removed'
            this.$emit('reRender');
        },
        total_cart_price() {
            // let total_price = 0
            // this.items.map(function(value, key) {
            //     total_price += value.price * value.cart_quantity
            // });
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
