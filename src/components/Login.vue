<template>
    <v-form ref="form" v-model="valid" lazy-validation class="center">
        <v-text-field v-model="username" :counter="10" :rules="usernameRules" label="Username" required></v-text-field>
        <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4 mt-4" @click="login">
            Login
        </v-btn>
    </v-form>
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
        ]
    }),

    methods: {
        login() {
            if (this.$refs.form.validate()) {
              this.$store.dispatch('retrieveToken',{
                username: this.username,
                password: this.password
              })
              .then(response =>{
                this.$router.push({name: 'Items'})
              })
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
