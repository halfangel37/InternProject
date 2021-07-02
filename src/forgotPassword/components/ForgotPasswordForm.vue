<template>
  <v-card :width="width" class="mx-auto border-radius-20 box-shadow">
    <div class="padding-card">
      <v-card-title class="pb-0 card-title">
        <h1 class="heading mx-auto">Forgot Password?</h1>
      </v-card-title>
      <v-card-text>
        <span class="quote"
          >Enter your email address you're using for your account below and we
          will send you a password reset a link</span
        >
        <v-alert class="mt-20" v-if="errorMessage" type="error">
          {{ errorMessage }}
        </v-alert>
        <v-alert class="mt-20" v-else-if="isSuccess" type="success">
          Your request was sent!
        </v-alert>
        <v-form
          @submit.prevent="onSubmit()"
          ref="forgotPassword"
          class="mx-auto"
        >
          <v-text-field
            outlined
            class="mx-auto"
            v-model="email"
            required
            :rules="emailRules"
            label="Email"
            dense
            type="email"
          />
          <v-btn
            type="submit"
            class="btn-color white--text"
            :disabled="isButtonDisabled"
          >
            <span v-if="!isButtonDisabled">SEND REQUEST</span>
            <span v-else
              >SENDING REQUEST
              <v-progress-circular indeterminate></v-progress-circular
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
      email: "",
      emailRules: [
        validators.required("E-mail is required"),
        validators.email("E-mail must be valid"),
        validators.space("No spaces allowed"),
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.forgotPassword.validate()) {
        this.$emit("submit", this.email);
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
.btn-color {
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
.quote {
  display: flex;
  text-align: center;
  margin-top: 10px;
}
@media screen and (min-width: 240px) {
  .v-form {
    margin-top: 10px;
  }
  .heading {
    font-size: 24px;
  }
  .padding-card {
    margin-left: 0;
    margin-right: 0;
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
  .quote {
    margin-top: 20px;
  }
  .padding-card {
    margin-left: 150px;
    margin-right: 150px;
    padding-top: 30px;
    padding-bottom: 40px;
  }
}
</style>
