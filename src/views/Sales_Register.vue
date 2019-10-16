<template>
    <v-container fluid>
        <v-card>
            <v-layout justify-space-between>
                <v-container>
                    {{currentTime}}
                </v-container>
            </v-layout>
            <v-layout justify-space-between>
                <v-flex xs6 md6>
                    <v-container>
                        <v-layout column>
                            <v-form ref="form">
                                <v-text-field v-model="starting_amount" label="Starting Amount" required></v-text-field>
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
                            <v-card max-width="450">
                                <v-progress-linear color="blue lighten-4" buffer-value="0" stream></v-progress-linear>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class="overline mb-1">{{loggedUser}}</div>
                                        <v-list-item-title class="headline mb-1">Check Water</v-list-item-title>
                                        <v-list-item-subtitle>When its empty, send a message on telegram.</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-avatar tile size="80" color="grey">
                                        <v-img class="white--text" src="https://5.imimg.com/data5/QB/FL/MY-27577041/20-litre-mineral-water-jar-500x500.jpg" />
                                    </v-list-item-avatar>
                                </v-list-item>
                            </v-card>
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
import moment from 'moment'

import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            starting_amount: 0,
            currentTime: null
        }
    },
    mounted() {

    },
    computed: {
        ...mapGetters({
            loggedUser: 'loggedUser'
        })
    },
    methods: {
        submit_register() {
            this.$store.dispatch('storeRegister', {
                    starting_amount: this.starting_amount
                })
                .then(response => {
                    this.$router.push({ name: 'Sales' })
                })
        },
        updateCurrentTime() {
            this.currentTime = moment().format('LTS LL');
        }
    },
    created() {
        this.currentTime = moment().format('LTS LL');
        setInterval(() => this.updateCurrentTime(), 1 * 1000);
    }
}

</script>
