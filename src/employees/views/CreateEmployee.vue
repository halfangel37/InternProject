<template>
  <PageContainer>
    <template #page-title>Create new employee </template>
    <template #page-content>
      <EmployeeForm @create-employee="onCreateEmployee" class="mt-10"/>
    </template>
  </PageContainer>
</template>

<script>
import EmployeeForm from "../components/EmployeeForm.vue";
import "@/shared/style/style.css";
export default {
  components: {
    EmployeeForm,
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
