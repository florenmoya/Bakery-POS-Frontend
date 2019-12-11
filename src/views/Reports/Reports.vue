<template>
    <div class="ma-2">
                    <span class="title">Reports</span>

        <div class="ma-2"> Sales
            <hr>
        </div>
        <ButtonList :button_list="sales_buttons" />

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
                name: 'Today',
                icon: 'search',
                path: '/reports/sales'
            }, {
                name: 'Closing Counts',
                icon: 'close',
                path: '/reports/closing_counts'
            }, {
                name: 'Activity Logs',
                icon: 'assignment_ind',
                path: '/reports/activity_log'
            }],
        }
    }
}

</script>
