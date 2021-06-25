<template>
  <div class="bg-main fill-height-flex">
    <v-layout column class="fill-height">
      <AuthHeader class="header" />
      <router-view class="content" />
      <AuthFooter class="footer" />
    </v-layout>
  </div>
</template>

<script>
import AuthHeader from "@/views/AuthHeader.vue";
import AuthFooter from "@/views/AuthFooter.vue";
export default {
  components: { AuthHeader, AuthFooter },
};
</script>

<style lang="scss" scoped>
.fill-height-flex {
  display: flex;
  flex-flow: column;
  height: 100%;
}
.header {
  flex: 0 1 auto;
}
.content {
  flex: 1 1 auto;
  overflow: auto;
}
.footer {
  flex: 0 0 auto;
}
.bg-main {
  background: #4f2566;
}
</style>
