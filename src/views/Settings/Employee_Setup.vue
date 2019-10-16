<template>
    <div>
        <DataTableSettingsCrud :search="search" :headers="headers" :items="employees" :dialog_prop="dialog" :editedIndex_prop="editedIndex" :editedItem_prop="editedItem" :title="title" :items_per_page="items_per_page" :defaultItem="defaultItem" :dialogShow_prop="dialogShow" :link_name="link_name" />
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
            title: 'Employees',
            link_name: 'Items_Add',
            items_per_page: 20,
            dialog: false,
            dialogShow: [],
            snack: false,
            snackColor: '',
            snackText: '',
            search: '',
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Username', value: 'username' },
                { text: 'Role', value: 'roles.name' },
                { text: 'Actions', value: 'action', sortable: false }

            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                roles: 0,
                password: '',
                username: '',
            },
            defaultItem: {
                name: '',
                roles: 0,
                password: '',
                username: '',
            },
        }
    },

    mounted() {
        this.$store.dispatch('retrieveEmployees')
        this.isLoaded = true
    },
    computed: {
        ...mapState([
            'employees'
        ]),
    },
    methods: {
        deleteItem(item) {
            const index = this.employees.indexOf(item)

            if (confirm('Are you sure you want to delete this item?')) {
                this.$store.dispatch('destroyEmployee', {
                        id: this.employees[index].id
                    })
                    .then(response => {
                        this.employees.splice(index, 1)
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
            let roles = 0;
            if (editedItem.roles.id) roles = editedItem.roles.id
            else { roles = editedItem.roles }
            this.$store.dispatch('updateEmployee', {
                    id: editedItem.id,
                    name: editedItem.name,
                    username: editedItem.username,
                    password: editedItem.password,
                    roles: roles,
                })
                .then(response => {
                    this.$store.dispatch('retrieveEmployees')
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
            this.$store.dispatch('storeEmployee', {
                    name: editedItem.name,
                    username: editedItem.username,
                    password: editedItem.password,
                    roles: editedItem.roles,
                })
                .then(response => {
                    this.$store.dispatch('retrieveEmployees')
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
