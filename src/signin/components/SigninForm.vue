<template>
  <v-card :width="width" class="mx-auto border-radius-20 box-shadow">
    <div class="padding-card">
      <v-card-title class="pb-0 card-title">
        <h1 class="heading mx-auto">Welcome</h1>
      </v-card-title>
      <v-card-text>
        <v-alert
          class="mt-20"
          v-if="errorMessage && errorMessage != 'null'"
          type="error"
        >
          {{ errorMessage }}
        </v-alert>
        <v-form @submit.prevent="onSubmit()" ref="signInForm" class="mx-auto">
          <v-text-field
            outlined
            class="mx-auto"
            v-model="email"
            required
            :rules="emailRules"
            label="Username"
            dense
            validate-on-blur
          />
          <v-text-field
            dense
            outlined
            class="mx-auto"
            v-model="password"
            required
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            validate-on-blur
          />
          <div class="mt-5">
            <router-link to="/auth/forgot-password"
              ><span>Forgot password?</span></router-link
            >
          </div>
          <v-checkbox class="fs-16" label="Remember me" />
          <v-btn
            type="submit"
            class="bg-color-orange white--text"
            :disabled="isButtonDisabled"
          >
            <span v-if="!isButtonDisabled">SIGN IN</span>
            <span v-else
              >SIGNING IN
              <v-progress-circular indeterminate></v-progress-circular
            ></span>
          </v-btn>
          <span class="mt-10 pb-5 d-flex j-center">
            <router-link to="/auth/signup"
              ><span class="fz-12">Sign up</span></router-link
            >
          </span>
        </v-form>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import "@/shared/style/style.css";
export default {
  props: {
    isButtonDisabled: Boolean,
    errorMessage: String,
  },
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      passwordRules: [
        (value) => !!value || "Password is required",
        (value) =>
          (value && value.length > 2) ||
          "Password must be more than 2 characters",
      ],
      emailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.signInForm.validate()) {
        this.$emit("submit", { email: this.email, password: this.password });
      }
    },
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "270px";
        case "sm":
          return "500px";
        case "md":
          return "700px";
        case "lg":
          return "826px";
        default:
          return "826px";
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
  color: #4f2566;
}
.bg-color-orange {
  background-color: #f2b334 !important;
}
.v-card__actions {
  display: inline;
  width: 100%;
  padding: 0 !important;
  align-items: center;
}
.v-btn {
  width: 100%;
}
.fz-12 {
  font-size: 12px;
}
.v-card__text {
  padding: 0;
}
@media screen and (min-width: 240px) {
  .v-form {
    margin-top: 10px;
  }
  .heading {
    font-size: 24px;
  }
  .padding-card {
    margin-left: 30px;
    margin-right: 30px;
  }
  .card-title {
    padding-top: 5px;
  }
  .v-card {
    box-shadow: none !important;
  }
}
@media screen and (min-width: 414px) {
  .v-form {
    margin-top: 20px;
  }
  .heading {
    font-size: 20px;
  }
  .padding-card {
    margin-left: 20px;
    margin-right: 20px;
  }
  .card-title {
    padding-top: 40px;
  }
  .box-shadow {
    display: inherit !important;
  }
}
@media screen and (min-width: 768px) {
  .v-form {
    margin-top: 20px;
  }
  .heading {
    font-size: 30px;
  }
  .padding-card {
    margin-left: 100px;
    margin-right: 100px;
  }
  .card-title {
    padding-top: 40px;
  }
}
@media screen and (min-width: 1024px) {
  .v-form {
    margin-top: 40px;
  }
  .heading {
    font-size: 40px;
  }
  .padding-card {
    margin-left: 200px;
    margin-right: 200px;
    padding-top: 30px;
    padding-bottom: 40px;
  }
}
</style>
