<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="15"
    class="elevation-1"
  ></v-data-table>
</template>
<script>
export default {
    props: ['headers', 'items']
}

</script>
