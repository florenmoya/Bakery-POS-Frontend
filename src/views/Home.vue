<template>
    <v-container>
        <span class="title">
            Dashboard
        </span>
        <v-card class="d-flex flex-wrap" flat tile min-width="120px">
            <v-card class="pa-2" outlined tile>
                <v-card-title>₱{{dashboard['month_revenue']}}</v-card-title>
                <v-card-text>
                    <span>Monthly</span><br>
                    <span class="text--primary">
                        <span>Revenue</span><br>
                    </span>
                </v-card-text>
            </v-card>
            <v-card class="pa-2 " outlined tile min-width="120px">
                <v-card-title>₱{{dashboard['today_sales']}}</v-card-title>
                <v-card-text>
                    <span>Daily</span><br>
                    <span class="text--primary">
                        <span>Sales</span><br>
                    </span>
                </v-card-text>
            </v-card>
            <v-card class="pa-2" outlined tile>
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
            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Quantity</th>
                            <th class="text-left">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in top_products">
                            <td>{{ item['item']['description'] }}</td>
                            <td>{{ item['total_quantity'] }}</td>
                            <td>{{ item['item']['category']['title'] }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
        <div>
            <span class="title">
                Restock
            </span>
            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Quantity</th>
                            <th class="text-left">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in restock" v-if="item.category && item.category.title != 'Bread'">
                            <td>{{ item.description }}</td>
                            <td>{{ item.quantity }}</td>
                            <td><template v-if="item.category">{{ item.category.title }}</template></td>
                        </tr>
                        <tr v-for="item in restock" v-if="item.category && item.category.title == 'Bread'">
                            <td>{{ item.description }}</td>
                            <td>{{ item.quantity }}</td>
                            <td><template v-if="item.category">{{ item.category.title }}</template></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
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
