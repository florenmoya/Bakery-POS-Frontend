<template>
    <div>
        <Print id="print_close"/>
        <v-container class="d-print-none" fluid>
            <v-card>
                <v-layout justify-space-between>
                    <v-flex xs6 md6>
                        <v-container>
                            <v-layout column>
                                <v-form ref="form">
                                    <span class="mr-3">Total Cash: <strong>{{currentsales.current_cash}}</strong></span>
                                    <span class="mr-3">Sales: <strong>{{currentsales.total_sales}}</strong></span>
                                    <span class="mr-3">Refunds: <strong>{{currentsales.total_refunds}}</strong></span>
                                    <v-text-field v-model="released_amount" label="Closing Amount - Natirang pera" required></v-text-field>
                                    <v-btn @click="submit_register()" color="white" class="mr-4">
                                        Submit
                                    </v-btn>
                                    <v-btn @click="print()" :loading="isLoading" color="white" class="mr-4">
                                        Print Inventory
                                    </v-btn>
                                </v-form>
                            </v-layout>
                        </v-container>
                    </v-flex>
                    <v-flex xs6 md6 class="is-radiusless">
                        <v-container class="bg-white is-fullheight">
                            <v-container>
                            </v-container>
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
    </div>
</template>
<style scoped>
.is-center {
    text-align: center;
    vertical-align: middle;
}

.datatable {
    background-color: #fff;
    padding: 0;
}

.is-fullheight {
    height: 100%;
}

</style>
<script>
import Print from '@/components/Print'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import print from 'print-js'

export default {
    components: {
        Print
    },
    data() {
        return {
            released_amount: 0,
        }
    },
    mounted() {
        this.$store.dispatch('retrieveCurrentSales')
    },
    computed: {
        ...mapGetters({
            isLoading: 'isLoading'
        }),
        ...mapState([
            'currentsales'
        ]),
    },
    methods: {
        submit_register() {
            this.$store.dispatch('storeRegisterClose', {
                    released_amount: this.released_amount
                })
                .then(response => {
                    this.$router.push({ name: 'Logout' })
                })
        },
        print() {
            printJS('print_close', 'html')
        }
    }
}

</script>
