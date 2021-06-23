<template>
  <v-app class="h-100per bg-main">
    <SignForm @signin-click="signin" />
  </v-app>
</template>

<script>
import SignForm from "../components/SigninForm.vue";

import NProgress from "nprogress";
export default {
  components: { SignForm },
  name: "Signin",
  data() {},
  methods: {
    signin(email, password) {
      NProgress.start();
      this.$store
        .dispatch("signin", {
          username: email,
          password: password,
        })
        .then(() => {
          this.$router.push({ name: "About" });
          NProgress.done();
        })
        .catch((err) => {
          this.error = err.response.data.error;
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
