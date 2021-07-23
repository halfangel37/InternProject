<template>
  <div>
    <v-select
      :items="showCompany"
      :value="currentShowOption"
      dense
      outlined
      :menu-props="{ bot: true, offsetY: true }"
    ></v-select>
  </div>
</template>

<script>
export default {
 data() {
    return {
      showCompany: ["Show all","Show only real","Show only demo"],
      currentShowOption:"Show all"
    };
 }
};
</script>

<style lang="scss" scoped></style>
