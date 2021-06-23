<template>
  <v-app>
    <v-app-bar class="nav-bar" app color="primary" dark>
      <v-btn text rounded :to="'/signin'">Signin</v-btn>
    </v-app-bar>
    <v-main class="">
      <Layout />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Layout from "@/views/Layout.vue";
export default {
  name: "App",
  components: { Layout },
};
</script>
<style scoped>
.nav-bar {
  display: flex;
  justify-content: flex-end;
}
</style>
