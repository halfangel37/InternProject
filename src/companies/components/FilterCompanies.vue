<template>
  <div>
    <v-btn fab dark small color="#fff" class="filter-company">
      <v-icon color="#f2b334"> {{ icons.mdiCogOutline }} </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mdiCogOutline } from "@mdi/js";
export default {
  data: () => ({
    icons: {
      mdiCogOutline,
    },
  }),
};
</script>

<style lang="scss" scoped>
.filter-company {
  box-shadow: none;
}
.filter-company:hover {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
