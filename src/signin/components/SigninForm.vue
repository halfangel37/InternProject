<template class="h-300">
  <div>
    <div class="mx-auto">
      <v-card-title class="pb-0 card-title">
        <h1 class="heading">Welcome back!</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="signInForm" class="mx-auto">
          <v-text-field
            outlined
            class="mt-40 mx-auto"
            v-model="email"
            required
            :rules="emailRules"
            label="Username"
          />
          <v-text-field
            outlined
            class="mx-auto"
            v-model="password"
            required
            :rules="passwordRules"
            counter
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
        <div class="mt-5">
          <a href="/forgot-password"><span>Forgot password?</span></a>
        </div>
        <v-checkbox label="Remember me" v-model="rememberPassword" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="signin" class="signin" :disabled="isAddButtonDisabled"
          >SIGN IN</v-btn
        >
        <span class="mt-10 d-flex j-center"
          ><a href="/signup"><span class="fz-12">Sign up</span></a></span
        >
      </v-card-actions>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      isAddButtonDisabled: false,
      passwordRules: [
        // eslint-disable-next-line no-unused-vars
        (value) => (value) => !!value || "Password is required",
        (value) =>
          (value && value.length > 2) || "Name must be less than 2 characters",
      ],
      emailRules: [
        // eslint-disable-next-line no-unused-vars
        (value) => (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    signin() {
      if (this.$refs.signInForm.validate()) {
        this.$emit("signin-click", this.email, this.password);
        this.isAddButtonDisabled = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.heading {
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 33px;
}
.bg-main {
  background: #4f2566;
}
v-checkbox {
  font-size: 16px;
}
.signin {
  background-color: #f2b334 !important;
}
.v-card__actions {
  display: inline;
}
.v-card__actions {
  width: 100%;
  padding: 0 !important;
  align-items: center;
}
.v-btn {
  width: 100%;
}
.d-flex {
  display: flex;
}
.j-center {
  justify-content: center;
}
.mt-10 {
  margin-top: 10px !important;
}
.mt-40 {
  margin-top: 40px;
}
.fz-12 {
  font-size: 12px;
}
</style>
