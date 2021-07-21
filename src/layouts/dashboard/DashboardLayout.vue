<template>
  <v-app>
    <v-navigation-drawer app color="#4f2566">
      <NavigationBar />
    </v-navigation-drawer>
    <v-app-bar app>
      <AppBar />
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import NavigationBar from "./NavigationBar.vue";
import AppBar from "./AppBar.vue";

export default {
  components: {
    NavigationBar,
    AppBar,
  },
};
</script>
