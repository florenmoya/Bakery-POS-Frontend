<template>
    <v-container>
        <div class="ma-2"> Sales
            <hr>
        </div>
        <ButtonList :button_list="sales_buttons" />
        <div class="ma-2"> Inventory
            <hr>
        </div>
        <ButtonList :button_list="register_buttons" />
    </v-container>
</template>
<script>
import ButtonList from '../components/ButtonList'

export default {
    components: {
        ButtonList
    },
    data() {
        return {
            sales_buttons: [{
                name: 'Today',
                icon: 'search',
                path: '/reports/sales'
            }, {
                name: 'Closing Counts',
                icon: 'close',
                path: '/inventory/item/add'
            }],
            register_buttons: [{
                name: 'Inventory',
                icon: 'playlist_add_check'
            }, {
                name: 'Total Deliveries',
                icon: 'note',
                path: '/inventory/categories'
            }]
        }
    }
}

</script>
