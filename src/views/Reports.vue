<template>
    <v-container>
        <div class="ma-2"> Sales
            <hr>
        </div>
        <ButtonList :button_list="sales_buttons" />

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
                path: '/reports/closing_counts'
            }],
        }
    }
}

</script>
