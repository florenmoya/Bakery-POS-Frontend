<template>
    <div>
        <div class="ma-2"> Item
            <hr>
        </div>
        <ButtonList :button_list="sales_buttons" />
        <div class="ma-2"> Inventory
            <hr>
        </div>
        <ButtonList :button_list="register_buttons" />
        <div class="ma-2"> Deliver, and Purchase Orders
            <hr>
        </div>
        <ButtonList :button_list="deliveries_buttons" />
    </div>
</template>
<script>
import ButtonList from '@/components/ButtonList'

export default {
    components: {
        ButtonList
    },
    data() {
        return {
            sales_buttons: [{
                name: 'Search Item',
                icon: 'search',
                path: '/inventory/item'
            }, {
                name: 'Add Item',
                icon: 'add',
                path: '/inventory/item/add'
            }],
            register_buttons: [{
                name: 'Categories',
                icon: 'note',
                path: '/inventory/categories'
            }, {
                name: 'Add Category',
                icon: 'note_add',
                path: '/inventory/categories/add'
            }],
            deliveries_buttons: [{
                name: 'Add Delivery',
                icon: 'library_add',
                path: '/inventory/delivery/add'
            }]
        }
    }
}

</script>
