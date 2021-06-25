<template>
  <v-form @submit.prevent="onSubmit" ref="signUpForm" v-model="formValidity">
    <v-alert v-if="errorMessage" type="error">
      {{ errorMessage }}
    </v-alert>
    <v-alert v-if="successMessage" type="success">
      Congratulations ! You are cuccessfully signed up ! You can
      <router-link to="/auth/signin">Sign in</router-link> now !
    </v-alert>
    <v-text-field
      label="Email/User Name"
      type="email"
      v-model="userInfor.email"
      outlined
      dense
      :rules="emailRules"
    />
    <v-text-field
      v-model="userInfor.firstName"
      label="First Name"
      type="name"
      outlined
      dense
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="userInfor.lastName"
      label="Last Name"
      type="name"
      outlined
      dense
      :rules="[rules.required]"
    />
    <v-text-field
      :rules="[rules.required, rules.min, rules.space]"
      v-model="userInfor.password"
      label="Password"
      outlined
      dense
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
    />
    <v-btn
      class="register-btn"
      block
      color="#FFBF3F"
      v-on:click="validateForm"
      type="submit"
      :disabled="successMessage != ''"
    >
      <span v-if="!successMessage">SIGN UP</span>
      <span v-if="successMessage"
        >Signing Up
        <v-progress-circular
          :size="20"
          width="3"
          color="white"
          indeterminate
        ></v-progress-circular
      ></span>
    </v-btn>
    <div class="form-footer">
      <p>By clicking here you agree to our <a>Customer Agreement</a></p>
      <router-link to="/auth/signin">Sign in</router-link>
    </div>
  </v-form>
</template>

<script>
export default {
  props: ["errorMessage", "successMessage"],
  data: () => ({
    showPassword: false,
    userInfor: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    formValidity: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      (v) => !/[ ]/.test(v) || "No spaces allowed",
    ],
    rules: {
      required: (value) => !!value || "This field is required.",
      min: (v) => (v && v.length >= 6) || "Min 6 characters",
      space: (v) => !/[ ]/.test(v) || "No spaces allowed",
    },
  }),
  methods: {
    validateForm() {
      this.$refs.signUpForm.validate();
    },
    onSubmit() {
      this.$emit("register-user", this.userInfor);
    },
  },
};
</script>

<style scoped>
.form-footer {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
span {
  color: #ffff;
  font-size: 16px;
}
</style>
