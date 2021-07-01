<template>
  <div>
    <v-container>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container {
  padding: 5rem 0 0 5rem;
}
@media only screen and (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>
