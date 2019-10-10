<template>
    <v-container>
        <span class="title">
            Dashboard
        </span>
        <v-card class="d-flex flex-row mb-6" flat tile>
            <v-card class="mr-4" max-width="344">
                <v-card-title>₱{{dashboard['month_revenue']}}</v-card-title>
                <v-card-text>
                    <span>Monthly</span><br>
                    <span class="text--primary">
                        <span>Revenue</span><br>
                    </span>
                </v-card-text>
            </v-card>
            <v-card class="mr-4" max-width="344">
                <v-card-title>₱{{dashboard['today_sales']}}</v-card-title>
                <v-card-text>
                    <span>Daily</span><br>
                    <span class="text--primary">
                        <span>Sales</span><br>
                    </span>
                </v-card-text>
            </v-card>
            <v-card class="mr-4" max-width="344">
                <v-card-title>₱{{dashboard['month_bread_delivery']}}</v-card-title>
                <v-card-text>
                    <span>Total Deliveries</span><br>
                    <span class="text--primary">
                        <span>Bread</span><br>
                    </span>
                </v-card-text>
            </v-card>
        </v-card>
        <div>
            <span class="title">
                Top Products
            </span>
            <v-card class="d-flex flex-wrap" flat tile>
                <v-card v-for="top_products in top_products" class="pa-2" outlined tile>
                    <v-card-title>{{top_products['total_quantity']}}</v-card-title>
                    <v-card-text>
                        <span>{{top_products['item']['category']['title']}}</span><br>
                        <span class="text--primary">
                            <span>{{top_products['item']['description']}}</span><br>
                        </span>
                    </v-card-text>
                </v-card>
            </v-card>
        </div>
        <div>
            <span class="title">
                Restock
            </span>
            <v-card class="d-flex flex-wrap" flat tile>
                <v-card v-for="restock in restock" class="pa-2" outlined tile>
                    <v-card-title>{{restock['quantity']}}</v-card-title>
                    <v-card-text>
                        <span>{{restock['category']['title']}}</span><br>
                        <span class="text--primary">
                            <span>{{restock['description']}}</span><br>
                        </span>
                    </v-card-text>
                </v-card>
            </v-card>
        </div>
    </v-container>
</template>
<script>
import UnderConstruction from '../components/UnderConstruction'
import { mapState } from 'vuex'

export default {
    components: {
        UnderConstruction
    },
    data() {
        return {

        }
    },
    mounted() {
        this.$store.dispatch('retrieveDashboard')
    },

    computed: {
        ...mapState([
            'dashboard'
        ]),
        top_products() {
            return this.dashboard['top_product']
        },
        restock() {
            return this.dashboard['restock']
        }
    }
}

</script>
