<template>
  <PageContainer>
    <template #page-title>Create new employee </template>

    <template #page-content>
      <CreateEmployeeForm @submit="onCreateEmployee" />
    </template>
  </PageContainer>
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
