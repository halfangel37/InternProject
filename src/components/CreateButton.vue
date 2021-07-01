<template>
  <div>
    <v-btn rounded line x-large color="#fff" :href="link">
      <v-icon dark color="#F2B334"> mdi-plus </v-icon>
      <span style="color: #f2b334">CREATE</span>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: ["link"],
};
</script>
<style></style>
