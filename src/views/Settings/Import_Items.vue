<template>
	<v-container>
	      <v-form ref="form" v-model="valid" lazy-validation>
  			<v-file-input label="File input" outlined dense></v-file-input>
        <v-btn color="success" class="mr-4" @click="submit">
            Submit
        </v-btn>
    </v-form>
	</v-container>

</template>
<script>
export default {
    data: () => ({
        valid: true,
        submit: '',
    }),

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
}

</script>
