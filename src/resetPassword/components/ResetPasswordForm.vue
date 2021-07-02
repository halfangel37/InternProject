<template>
  <v-card :width="width" class="mx-auto border-radius-20 box-shadow">
    <div class="padding-card">
      <v-card-title class="pb-0 card-title">
        <h1 class="heading mx-auto">Reset Password</h1>
      </v-card-title>
      <v-card-text>
        <v-alert
          class="mt-20"
          v-if="errorMessage && errorMessage != 'null'"
          type="error"
        >
          {{ errorMessage }}
        </v-alert>
        <v-alert class="mt-20" v-else-if="isSuccess" type="success">
          Congratulations ! You are successfully reset password ! You can
          <router-link to="/auth/signin">Sign in</router-link> now !
        </v-alert>
        <v-form
          @submit.prevent="onSubmit()"
          ref="resetPassword"
          class="mx-auto"
        >
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
          />
          <v-text-field
            dense
            outlined
            class="mx-auto"
            v-model="passwordAgain"
            required
            :rules="passwordAgainRules"
            :type="showPasswordAgain ? 'text' : 'password'"
            label="Password again"
            :append-icon="showPasswordAgain ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPasswordAgain = !showPasswordAgain"
          />
          <v-btn
            type="submit"
            class="bg-color-orange white--text"
            :disabled="isButtonDisabled"
          >
            <span v-if="!isButtonDisabled">SEND</span>
            <span v-else
              >SENDING <v-progress-circular indeterminate></v-progress-circular
            ></span>
          </v-btn>
          <span class="mt-10 pb-5 d-flex j-center">
            <router-link to="/auth/signin"
              ><span class="fs-12">Sign In</span></router-link
            >
          </span>
        </v-form>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import validators from "@/shared/form-validators";
import "@/shared/style/style.css";
export default {
  props: {
    isButtonDisabled: Boolean,
    errorMessage: String,
    isSuccess: Boolean,
  },
  data() {
    return {
      showPassword: false,
      showPasswordAgain: false,
      password: "",
      passwordAgain: "",
      passwordRules: [
        validators.required("Password is required"),
        validators.min("Min 3 characters", 3),
      ],
      passwordAgainRules: [
        validators.required("Password is required"),
        validators.mustMatch("Password isn't match!", () => this.password),
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.resetPassword.validate()) {
        this.$emit("submit", this.password);
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
  .box-shadow {
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
    font-size: 35px;
  }
  .padding-card {
    margin-left: 200px;
    margin-right: 200px;
    padding-top: 30px;
    padding-bottom: 40px;
  }
}
</style>
