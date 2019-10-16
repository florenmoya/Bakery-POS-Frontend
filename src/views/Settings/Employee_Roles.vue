<template>
    <div>
        <DataTableSettingsCrud :search="search" :headers="headers" :items="EmployeeRoles" :dialog_prop="dialog" :editedIndex_prop="editedIndex" :editedItem_prop="editedItem" :title="title" :items_per_page="items_per_page" :defaultItem="defaultItem" :dialogShow_prop="dialogShow" :link_name="link_name" />
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>
<script>
import DataTableSettingsCrud from '../../components/DataTableSettingsCrud'
import { mapState } from 'vuex'

const axios = require('axios')

export default {
    components: {
        DataTableSettingsCrud
    },
    data() {
        return {
        	title: 'Employee Role',
            link_name: 'Items_Add',
            items_per_page: 20,
            dialog: false,
            dialogShow: [],
            snack: false,
            snackColor: '',
            snackText: '',
            search: '',
            headers: [
                { text: 'Role', value: 'name' },
                { text: 'Permission', value: 'permission' },
                { text: 'Actions', value: 'action', sortable: false }

            ],
            editedIndex: -1,
            editedItem: {
                Role: '',
                permission: 0,
            },
            defaultItem: {
                name: '',
                permission: 0,
            },
        }
    },

    mounted() {
        this.$store.dispatch('retrieveEmployeeRoles')
        this.isLoaded = true
    },
    computed: {
        ...mapState([
            'EmployeeRoles'
        ]),
    },
    methods: {
        deleteItem(item) {
            const index = this.EmployeeRoles.indexOf(item)

            if (confirm('Are you sure you want to delete this item?')) {
                this.$store.dispatch('destroyEmployeeRoles', {
                        id: this.EmployeeRoles[index].id
                    })
                    .then(response => {
                        this.EmployeeRoles.splice(index, 1)
                        this.snack = true
                        this.snackColor = 'warning'
                        this.snackText = 'Item Removed'
                    })
                    .catch(error => {
                        this.snack = true
                        this.snackColor = 'error'
                        this.snackText = 'Error Please Try Again'
                        console.log(error.response)
                    });
            }
        },
        update(item, editedItem) {
            this.$store.dispatch('updateEmployeeRoles', {
                    id: editedItem.id,
                    name: editedItem.name,
                    permission: editedItem.permission,
                })
                .then(response => {
                    this.$store.dispatch('retrieveEmployeeRoles')
                    this.snack = true
                    this.snackColor = 'success'
                    this.snackText = 'Data saved'
                })
                .catch(error => {
                    this.snack = true
                    this.snackColor = 'error'
                    this.snackText = 'Error Please Try Again'
                    console.log(error.response)
                });
        },
        create(items, editedItem) {
            this.$store.dispatch('storeEmployeeRoles', {
                    name: editedItem.name,
                    permission: editedItem.permission,
                })
                .then(response => {
                    this.$store.dispatch('retrieveEmployeeRoles')
                    this.snack = true
                    this.snackColor = 'success'
                    this.snackText = 'Item added'
                })
                .catch(error => {
                    this.snack = true
                    this.snackColor = 'error'
                    this.snackText = 'Error Please Try Again'
                    console.log(error.response)
                });
        }
    }
};

</script>
