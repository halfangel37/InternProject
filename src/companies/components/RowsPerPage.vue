<template>
  <div>
    <v-row class="d-flex align-baseline">
      <span>Row per page:</span>
      <div class="mr-2"></div>
      <v-select
        :items="items"
        label="Outlined style"
        dense
        outlined
        :menu-props="{ top: true, offsetY: true }"
        @change="changeRowsPerPage"
        :value="rowsPerPage"
      ></v-select>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    rowsPerPage: Number,
  },
  data() {
    return {
      items: [10, 25, 50, 100],
    };
  },
  methods: {
    changeRowsPerPage(value) {
      this.$emit("changeRowsPerPage", value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
