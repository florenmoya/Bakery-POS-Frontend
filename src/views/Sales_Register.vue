<template>
    <v-container fluid>
        <v-card>
            <v-layout justify-space-between>
                <v-flex xs6 md6>
                    <v-container>
                        <v-layout column>
                            <v-form ref="form">
                                <v-text-field v-model="amount" label="Starting Amount" required></v-text-field>
                                <v-btn @click="submit_register()" color="white" class="mr-4">
                                    Submit
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
import { mapState } from 'vuex'

export default {
    data() {
        return {
            amount: 0,
        }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
        submit_register() {
            this.$store.dispatch('storeRegister', {
                    amount: this.amount
                })
                .then(response => {
                    this.$router.push({ name: 'Sales' })
                })
        }
    }
}

</script>
