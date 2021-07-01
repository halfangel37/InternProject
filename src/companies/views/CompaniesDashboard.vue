<template>
  <div>
    <v-container>
      <v-row class="align-baseline">
        <CreateButton :link="link" />
      </v-row>
    </v-container>
  </div>
</template>
<script>
import CreateButton from "../../components/CreateButton.vue";

export default {
  components: {
    CreateButton,
  },
  data() {
    return {
      link: "/companies/create",
    };
  },
};
</script>
<style lang="scss" scoped></style>
