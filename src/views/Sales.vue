<template>
    <v-container v-if="!isLoading">
        <div v-if="!retrieveRegister.active">
            <div class="ma-2"> Registers
                <hr>
            </div>
            <ButtonList :button_list="register_inactive_button" />
        </div>
        <div v-if="retrieveRegister.active">
            <div class="ma-2"> Sales
                <hr>
            </div>
            <ButtonList :button_list="sales_button" />
            <div class="ma-2"> Registers
                <hr>
            </div>
            <ButtonList :button_list="register_button" />
        </div>
    </v-container>
</template>
<script>
import ButtonList from '../components/ButtonList'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

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
                icon: 'money_off',
                path: 'sales/refunds/add'
            }, {
                name: 'New Sale',
                icon: 'fiber_new'
            }],
            register_button: [{
                name: 'Close Register',
                icon: 'settings_power',
                path: 'sales/register/close'
            }, {
                name: 'Payout/Drop',
                icon: 'remove'
            }, {
                name: 'Add Amount',
                icon: 'add'
            }],
            register_inactive_button: [{
                name: 'Register',
                icon: 'money',
                path: 'sales/register'
            }],
        }
    },
    mounted() {
        this.$store.dispatch('retrieveRegister')
    },
    computed: mapGetters({
        retrieveRegister: 'retrieveRegister',
        isLoading: 'isLoading'
    }),
}

</script>
