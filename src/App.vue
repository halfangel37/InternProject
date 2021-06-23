<template>
  <v-app>
    <v-main class="">
      <HeaderLayout />
      <router-view />
      <FooterLayout />
    </v-main>
  </v-app>
</template>

<script>
import HeaderLayout from "@/views/HeaderLayout.vue";
import FooterLayout from "@/views/FooterLayout.vue";
//import axios from "axios";
export default {
  name: "App",
  components: { HeaderLayout, FooterLayout },
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    } else {
      this.$router.push({ name: "Signin" });
    }
    this.HTTP.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("signout");
        }
        return Promise.reject(error);
      }
    );
  },
};
</script>
<style scoped>
.nav-bar {
  display: flex;
  justify-content: flex-end;
}
</style>
