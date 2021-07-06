<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <CreateEmployeeForm @submit="onCreateEmployee" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateEmployeeForm from "../components/CreateEmployeeForm.vue";
export default {
  components: {
    CreateEmployeeForm,
  },
  methods: {
    onCreateEmployee(employee) {
      this.$store.dispatch("employees/createEmployee", {
        employee,
        companyId: this.$route.params.companyId,
      });
    },
  },
};
</script>

<style></style>
