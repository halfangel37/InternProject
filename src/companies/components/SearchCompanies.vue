<template>
  <div>
    <v-text-field
      flat
      solo
      outlined
      hide-no-data
      hide-details
      append-icon="mdi-magnify"
      v-model="search"
      label="Search"
      dense
      @change="searchChange"
    >
    </v-text-field>
  </div>
</template>

<script>
export default {
  props:{
    search:String,
  },
  method:{
    searchChange(value){
      this.$emit('on-search',value)
    }
  }
};
</script>

<style lang="scss" scoped></style>
