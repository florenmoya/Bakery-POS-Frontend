<template class="print">
    <div class="print">
        <div>
            <div class="ma-0 pa-0">Signing Out: {{loggedUser}}
            </div>
            <div class="ma-0 pa-0">
                {{currentTime}}
            </div>
        </div>
        <div class="flex">
            <template v-for="item in items" v-if="item.category_id == 1 && item.stock < 5">
               | {{item.description}}: {{item.stock}} 
            </template>
        </div>
    </div>
</template>
<style scoped>
.flex {
    display: flex;
}

.print {
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif;
    width: 55mm;
    position:fixed;
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
        updateCurrentTime() {
            this.currentTime = moment().format('LTS LL');
        }
    },
    created() {
        this.currentTime = moment().format('LTS LL');
        setInterval(() => this.updateCurrentTime(), 1 * 1000);
    },
    computed: {
        ...mapState([
            'items'
        ]),
        ...mapGetters({
            loggedUser: 'loggedUser'
        }),
    }
}

</script>
