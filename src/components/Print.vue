<template>
    <div class="print d-none d-print-block">
        <div>
            <div class="heading">Signing Out: {{loggedUser}}
            </div>
            <div class="heading mt--2">
                {{currentDate}}
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
import { mapState } from 'vuex'
import moment from 'moment'

export default {
    data() {
        return {
            itemsPerRow: 2,
        }
    },
    mounted() {
        this.$store.dispatch('retrieveItems')
        this.isLoaded = true;
    },
    methods: {
        itemCountInRow: function(index) {
            return this.categorized.slice((index - 1) * this.itemsPerRow, index * this.itemsPerRow)
        }
    },
    computed: {
        categorized: function() {
            return this.items.filter(function(i) {
                return i.category === 'Bread' && i.quantity != 0
            })
        },
        rowCount() {
            return Math.ceil(this.categorized.length / this.itemsPerRow);
        },
        loggedUser() {
            return this.$store.getters.loggedUser
        },
        currentDate() {
            return moment().format('LLLL')
        },
        ...mapState([
            'items', 'isLoading'
        ]),
    }
}

</script>
