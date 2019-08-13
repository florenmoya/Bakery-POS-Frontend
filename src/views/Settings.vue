<template>
        <UnderConstruction /> 
</template>
<script>
import ButtonList from '../components/ButtonList'
import UnderConstruction from '../components/UnderConstruction'

export default {
    components: {
        ButtonList,
        UnderConstruction
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
                name: 'Counts',
                icon: 'playlist_add_check'
            }, {
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