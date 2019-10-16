<template>
    <v-container bg fill-height grid-list-md>
        <v-layout row wrap align-center>
            <v-form ref="form" v-model="valid" lazy-validation class="center">
                <h3 class="mb-10 text-center"> Moya's POS </h3>
                <span> Register </span>
                <v-text-field v-model="name" :counter="50" :rules="nameRules" label="Full Name" required></v-text-field>
                <v-text-field v-model="company_name" label="Business Name" required></v-text-field>
                <v-text-field v-model="company_address" label="Address" required></v-text-field>
                <v-text-field v-model="company_city" label="City" required></v-text-field>
                <v-text-field v-model="company_region" label="Region" required></v-text-field>
                <v-text-field v-model="company_zip_code" label="Zip Code" required></v-text-field>
                <v-text-field v-model="company_phone" label="Phone" required></v-text-field>
                <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>
                <v-text-field :type="false ? 'text' : 'password'" v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
                <v-text-field :type="false ? 'text' : 'password'" v-model="password_confirmation" :rules="confirmpasswordRules" label="Confirm Password" required></v-text-field>
                <v-btn :disabled="!valid" color="success" class="mr-4 mt-4" @click="register">
                    Register
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn to="login" color="success" class="mt-4">
                    Login
                </v-btn>
            </v-form>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Full Name is required',
            v => v.length >= 3 || 'Min 2 characters'
        ],
        username: '',
        usernameRules: [
            v => !!v || 'username is required',
            v => v.length >= 3 || 'Min 3 characters'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'password is required',
            v => v.length >= 6 || 'Min 6 characters'

        ],
        company_name: '',
        company_address: '',
        company_city: '',
        company_region: '',
        company_zip_code: '',
        company_phone: '',
        password_confirmation: [],
        password_confirmation_temp: [],
    }),
    watch: {
        password() {
            this.passwordChanged()
        }
    },
    computed: {
        confirmpasswordRules() {
            return [
                v => !!v || 'confirm password is required',
                () => (this.password == this.password_confirmation) || 'Password must match',
            ];
        }
    },
    methods: {
        register() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('registerUser', {
                        name: this.name,
                        username: this.username,
                        password: this.password,
                        company_name: this.company_name,
                        company_address: this.company_address,
                        company_city: this.company_address,
                        company_region: this.company_region,
                        company_zip_code: this.company_zip_code,
                        company_phone: this.company_phone,
                        password_confirmation: this.password_confirmation
                    })
                    .then(response => {
                        this.$router.push({ name: 'Login' })
                    })
            }
        },
        passwordChanged() {
            if (this.password_confirmation.length >= 1) {
                this.password_confirmation = ""
            }
        },
    }
}

</script>
<style scoped>
.center {
    margin: 0 auto;
    width: 350px;
}

</style>
