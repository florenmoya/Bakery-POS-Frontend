<template>
    <v-container class="center">
        <img class="UnderConstruction" :src="UnderConstruction" />
    </v-container>
</template>
<script>

export default {
    data() {
        return {
            UnderConstruction: require('../assets/UnderConstruction.png')
        }
    }
}

</script>
<style scoped>
.center {
    height: 100%;
    text-align: center;
    vertical-align: middle;
    margin: 0 auto;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-align-content: center;
    align-content: center;
}
.UnderConstruction{
    width: 40%;
        margin: 0 auto;
}

</style>
