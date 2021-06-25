<template>
  <div>
    <AppBar />
    <NavBar />
    <MainContent />
  </div>
</template>

<script>
import AppBar from "@/Dashboard/components/AppBar.vue";
import NavBar from "@/Dashboard/components/NavBar.vue";
import MainContent from "@/Dashboard/components/MainContent.vue";
export default {
  components: {
    AppBar,
    NavBar,
    MainContent,
  },
};
</script>
