<template>
	<div>
    <v-btn class="ma-2 text-center" :to="button_list.path" height="125px" width="125px" v-for="button_list in button_list">
        <v-layout row wrap>
            <v-flex xs12 class="mb-3">
                <v-icon class="icon-3x">{{ button_list.icon }}</v-icon>
            </v-flex>
            <v-flex xs12>
                <div class="list-size">{{ button_list.name }}</div>
            </v-flex>
        </v-layout>
    </v-btn>
</div>
</template>
<script>
export default {
    props: ['button_list']
}

</script>
<style scoped>
.icon-3x {
    font-size: 3.5rem;
}

.list-size {
    font-size: 0.8em;
    line-height: 1.5;
}

</style>
