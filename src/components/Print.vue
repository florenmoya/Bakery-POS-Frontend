<template>
    <div class="print d-none d-print-block">
        <div>
            <div class="heading">Signing Out: {{loggedUser}}
            </div>
            <div class="heading mt--2">
                {{currentTime}}
            </div>
        </div>
        <!--         <div class="items" v-for="i in rowCount">
            <span xs6 md6 v-for="item in itemCountInRow(i)">
                {{item.description}} - {{item.quantity}}
            </span>
        </div> -->
        <v-layout class="items" v-for="i in rowCount">
            <v-flex class="text-right" xs6 md6 v-for="item in itemCountInRow(i)">
                {{item.description}} - {{item.quantity}} &nbsp
            </v-flex>
        </v-layout>
    </div>
</template>
<style scoped>
.print {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif;
    width: 60mm;
}

.text-right {
    text-align: right;
}

.items {
    margin: -6px 0 -8px 0;
    padding: 0;
    font-size: 0.8em;
    font-weight: 700;
    white-space: nowrap;

}

.heading {
    margin-left: 1mm;
    margin-bottom: 0;
    margin-right: 0;
    margin-top: 0;
    padding: 0;
    font-size: 0.8em;
    font-weight: 700;
}

.mt--1 {
    margin-top: -1mm;
}

.mt--2 {
    margin-top: -2mm;
}

.small-text {
    margin-left: 1mm;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0;
    font-size: 0.8em;
    font-weight: 700;
    padding: 0;
}

.text-left {
    text-align: left;
}

</style>
<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
    data() {
        return {
            itemsPerRow: 2,
            currentTime: null,
        }
    },
    mounted() {
        this.$store.dispatch('retrieveItems')
    },
    methods: {
        itemCountInRow: function(index) {
            return this.categorized.slice((index - 1) * this.itemsPerRow, index * this.itemsPerRow)
        },
        updateCurrentTime() {
            this.currentTime = moment().format('LTS LL');
        }
    },
    created() {
        this.currentTime = moment().format('LTS LL');
        setInterval(() => this.updateCurrentTime(), 1 * 1000);
    },
    computed: {
        categorized: function() {
            return this.items.filter(function(i) {
                return i.category_id == 1 && i.quantity != 0
            })
        },
        rowCount() {
            return Math.ceil(this.categorized.length / this.itemsPerRow);
        },
        ...mapGetters({
            items: 'retrieveItems',
            loggedUser: 'loggedUser'
        }),
    }
}

</script>
