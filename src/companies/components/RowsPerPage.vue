<template>
  <div>
    <v-row>
      <v-col class="d-flex align-baseline">
        <span>Row per page:</span>
      <v-select
        dense
        outlined
        :menu-props="{ bot: true, offsetY: true }"
        :items="rowsPerPage"
        :value="currentRowsPerPage"
        @change="changeRow"
      ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
   data() {
    return {
      rowsPerPage: [10, 25, 50, 100],
      currentRowsPerPage: 10,
      currentPage: 1,
    };
  },
  methods:{
    changeRow(value){
    this.$emit('change-row',value)
  }
  }
};
</script>

<style lang="scss" scoped></style>
