<template>
  <div class="bg-main o-flow-hiden">
    <HeaderLayout />
    <router-view />
    <FooterLayout />
  </div>
</template>

<script>
import HeaderLayout from "@/views/HeaderLayout.vue";
import FooterLayout from "@/views/FooterLayout.vue";
export default {
  components: { HeaderLayout, FooterLayout },
};
</script>

<style lang="scss" scoped>
.bg-main {
  background: #4f2566;
}
</style>
