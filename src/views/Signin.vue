<template>
  <v-app class="bg-main">
    <v-row>
      <v-col xs="11" sm="8" lg="6" class="mx-auto mt-5 mb-20">
        <v-card>
          <v-container>
            <div class="mx-auto">
              <v-card-title class="pb-0 card-title">
                <h1 class="heading">Welcome back!</h1>
              </v-card-title>
              <v-card-text>
                <v-form class="mx-auto">
                  <v-text-field
                    class="input mx-auto"
                    v-model="email"
                    required
                    :error-messages="emailErrors"
                    label="Username"
                    @blur="$v.email.$touch()"
                  />
                  <v-text-field
                    class="input mx-auto"
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
                <v-btn @click="signin" class="signin">SIGN IN</v-btn>
                <span class="mx-auto d-flex mt-10"
                  ><a href="/signup"><span>Sign up</span></a></span
                >
              </v-card-actions>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Signin",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
  },
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      passwordRules: [(value) => value.length >= 8 || "Min 8 characters"],
    };
  },
  methods: {
    signin() {
      this.$v.$touch();
      if (this.emailErrors.length < 1) {
        this.$store
          .dispatch("signin", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            this.error = err.response.data.error;
          });
      }
    },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
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
  width: 100%;
}
.signin {
  background-color: #f2b334 !important;
}
.v-card__actions {
  display: inline;
}
.d-flex {
  display: flex !important;
  justify-content: center;
}
</style>
