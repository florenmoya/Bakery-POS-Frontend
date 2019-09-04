<template>
    <div>
        <v-progress-linear indeterminate color="cyan" v-if="isLoading"></v-progress-linear>
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
    </div>
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
                name: 'Bali',
                icon: 'assignment_ind',
                path: 'sales/bali'
            }],
            register_button: [{
                name: 'Close Register',
                icon: 'settings_power',
                path: 'sales/register/close'
            }, {
                name: 'Payout/Drop',
                icon: 'remove'
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
