<template>
   <div>
    <v-container fluid>
        <v-select
        v-model="categories_selected"
        :items="categories"
        item-text="title"
        item-value="title"
        label="Select Item"
        multiple
        return-object
        >
        <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 10">
              <span>{{ item.title }}</span>
          </v-chip>
          <span
          v-if="index === 10"
          class="grey--text caption"
          >(+{{ categories_selected.length - 10 }} others)</span>
      </template>
  </v-select>
</v-container>
<v-data-table v-model="selected" :search="search" :headers="headers" :items="items" :items-per-page="items_per_page" :sort-by="sortby" :sort-desc="sortdesc" :single-select="singleSelect" :loading="loading"
:expanded.sync="expanded" show-expand multi-sort dense>
<template v-slot:top>
    <v-toolbar flat color="white">
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Select month (YYYY-MM-d)" single-line hide-details class="mr-10"></v-text-field>
    </v-toolbar>
</template>
<template v-slot:item.created_at="{ item }" v-if="title == 'Deliveries'">
    {{item.created_at | moment }}
</template>

<template v-slot:expanded-item="{ item }">
  <td :colspan="headers.length">
    <template v-for="deliveries_item in item.deliveries_item">{{deliveries_item.item.description}}: {{deliveries_item.quantity}}, </template></td>
</template>
<template v-slot:body.append>
    <tr>
        <td class="text-right" :colspan="headers.length">
            Total: {{selectedTotal}}
        </td>
    </tr>
</template>
</v-data-table>
</div>

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
    props: ['title', 'headers', 'items', 'items_per_page', 'loading', 'sortby', 'sortdesc'],
    data() {
        return {
            categories_selected: [],
            expanded: [],
            singleExpand: false,
            search: '',
            singleSelect: false,
            selected: [],
        }
    },
    computed: {
        filteredItems() {
            this.items.map(function(items) {
            })
        },
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        ...mapState([
            'isLoading', 'categories'
            ]),
        selectedTotal() {
            let total = 0
            this.selected.map(function(item, index) {
                item.deliveries_item.map(function(item, index) {
                    total += item.price
                })
            })
            return total;
        }
    },
    updated(){
        console.log(this.items)
    },
    watch: {
        dialog(val) {
            val || this.close()
        }
    },
    created() {
        this.initialize()
    },  
    filters: {
        ItemCategoryFilter(item){
            if(item){}
        },
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
