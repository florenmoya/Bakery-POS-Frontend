<template>
    <v-container>
        <div class="ma-2"> Sales
            <hr>
        </div>
        <ButtonList :button_list="sales_button" />
        <div class="ma-2"> Registers
            <hr>
        </div>
        <ButtonList :button_list="register_button" />
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
            sales_button: [{
                name: 'Continue Sale',
                icon: 'redo',
                path: 'sales/sale'
            }, {
                name: 'Refund',
                icon: 'money_off'
            }, {
                name: 'New Sale',
                icon: 'fiber_new'
            }],
            register_button: [{
                name: 'Close Register',
                icon: 'settings_power'
            }, {
                name: 'Payout/Drop',
                icon: 'remove'
            }, {
                name: 'Add Amount',
                icon: 'add'
            }],
        }
    }
}

</script>
