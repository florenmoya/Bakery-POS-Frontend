<template>
    <v-container bg fill-height grid-list-md>
        <v-layout row wrap align-center>
            <v-form ref="form" v-model="valid" lazy-validation class="center">
                <h3 class="mb-10 text-center"> Moya's POS </h3>
                <span>
                    Login
                </span>
                <v-text-field v-model="username" :rules="usernameRules" label="Username" v-on:keyup.enter="login" required></v-text-field>
                <v-text-field :type="false ? 'text' : 'password'" v-model="password" :rules="passwordRules" label="Password" v-on:keyup.enter="login" required></v-text-field>
                <v-btn :disabled="!valid" color="success" class="mr-4 mt-4" @click="login">
                    Login
                </v-btn>
                                <v-spacer></v-spacer>

            </v-form>
        </v-layout>
                <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn text @click="snack = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        valid: true,
        username: '',
        usernameRules: [
            v => !!v || 'username is required'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'password is required'
        ],
            snack: false,
            snackColor: '',
            snackText: '',
    }),

    methods: {
        login() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('retrieveToken', {
                        username: this.username,
                        password: this.password
                    })
                    .then(response => {
                        this.$router.push({ name: 'Sales Menu' })
                    })
                    .catch(error => {
                    this.snack = true
                    this.snackColor = 'error'
                    this.snackText = 'Error Please Try Again'
                    console.log(error.response)
                });
            }
        }
    },
}

</script>
<style scoped>
.center {
    margin: 0 auto;
    width: 350px;
}

</style>
