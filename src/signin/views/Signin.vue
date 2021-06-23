<template>
  <v-app class="bg-main">
    <v-row>
      <v-col xs="11" sm="8" lg="6" class="mx-auto mt-90 mb-20">
        <v-card>
          <v-container>
            <SignForm @signin-click="signin" v-bind="isAddButtonDisabled" />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import SignForm from "@/signin/components/SigninForm.vue";
import NProgress from "nprogress";
export default {
  components: { SignForm },
  name: "Signin",
  data() {
    return {
      isAddButtonDisabled: false,
    };
  },
  methods: {
    signin(email, password) {
      this.isAddButtonDisabled = true;
      NProgress.start();
      this.$store
        .dispatch("signin/signinAccount", {
          username: email,
          password: password,
        })
        .then(() => {
          this.$router.push({ name: "About" });
          NProgress.done();
        })
        .catch((err) => {
          this.error = err.response.data.error;
          alert("Account was wrong!");
          NProgress.done();
          this.isAddButtonDisabled = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-main__.v-application--wrap v-application--wrap {
  min-height: none !important;
  max-width: none !important;
}
.bg-main {
  background: #4f2566;
}
.mt-90 {
  margin-top: 130px;
}
</style>
