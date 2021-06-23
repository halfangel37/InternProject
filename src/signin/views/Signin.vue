<template>
  <v-app class="h-100per bg-main">
    <v-row>
      <v-col xs="11" sm="8" lg="6" class="mx-auto mt-5 mb-20">
        <v-card>
          <v-container>
            <SignForm @signin-click="signin" />
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
  data() {},
  methods: {
    signin(email, password) {
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
.h-100per {
  height: 100%;
}
</style>
