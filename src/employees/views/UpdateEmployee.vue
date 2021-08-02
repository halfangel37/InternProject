<template>
  <PageContainer>
    <template #page-title>
      <div class="d-flex">
        <p>Employee details</p>
        <p v-if="employee">#{{ employee.employeeNumber }}</p>
      </div>
    </template>
    <template #page-content>
      <EmployeeForm
        class="mt-10"
        v-show="employee"
        @submit="onUpdateEmployee"
        :employee="employee"
        @update-employee="onUpdateEmployee"
        @delete-employee="deleteEmployee"
      />
      <p v-show="!employee" class="mt-10 box">Employee is not found</p>
    </template>
  </PageContainer>
</template>

<script>
import EmployeeForm from "../components/EmployeeForm.vue";
import { mapGetters } from "vuex";
import "@/shared/style/style.css";
export default {
  components: {
    EmployeeForm,
  },
  methods: {
    onUpdateEmployee(employee) {
      this.$store.dispatch("employees/updateEmployee", {
        companyId: this.$route.params.companyId,
        employeeId: this.$route.params.employeeId,
        employee,
      });
    },

    deleteEmployee({ employeeId }) {
      this.$store.dispatch("employees/deleteEmployee", {
        companyId: this.$route.params.companyId,
        employeeId: employeeId,
      });
    },
  },
  computed: {
    ...mapGetters({
      employee: "employees/selectSeletedEmployee",
    }),
  },

  created() {
    this.$store.dispatch("employees/getEmployeeById", {
      companyId: this.$route.params.companyId,
      employeeId: this.$route.params.employeeId,
    });
  },
  beforeDestroy() {
    this.$store.dispatch("employees/clearStates");
  },
};
</script>

<style>
.box {
  width: 1000px;
  background: #fdf4e3;
  padding: 10px;
}
</style>
