<template>
  <v-main id="register-page">
    <v-container id="form-container">
      <v-row class="register-row" justify="center">
        <v-col cols="12" sm="12" md="8" lg="8">
          <h1>Register</h1>
          <RegisterForm
            @register-user="register"
            :errorMessage="errorMessageGetter"
            :successMessage="successMessageGetter"
            :isButtonDisabled="isButtonDisabled"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";
import { mapGetters } from "vuex";
export default {
  components: { RegisterForm },
  data: () => ({ isButtonDisabled: false }),
  methods: {
    register(value) {
      this.$store
        .dispatch("register/registerAccount", {
          firstName: value.firstName,
          lastName: value.lastName,
          username: value.email,
          password: value.password,
        })
        .then(() => {
          this.isButtonDisabled = false;
        });
    },
  },
  computed: {
    ...mapGetters({
      errorMessageGetter: "register/errorMessageGetter",
      successMessageGetter: "register/successMessageGetter",
    }),
  },
};
</script>

<style scoped>
#form-container {
  max-width: 850px;
  max-height: 668px;
  background: #ffffff;
  border-radius: 16px;
}
#register-page {
  height: 100%;
  align-items: center;
  display: flex;
}
.register-row {
  margin-top: 30px;
}
h1 {
  margin-bottom: 30px;
  text-align: center;
  font-size: 40px;
  color: #4f2566;
}
</style>
