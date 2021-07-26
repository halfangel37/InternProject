<template>
  <PageContainer>
    <template #page-title> Employee List </template>
    <template #page-content>
      <div class="d-flex align-baseline justify-center justify-space-between">
        <CreateButton @onCreate="onCreate()" />

        <v-select
          dense
          :items="status"
          :value="currentStatus"
          v-on:change="filterStatus"
          label="Select"
          solo
          :append-icon="'mdi-chevron-down'"
        ></v-select>

        Rows per page:

        <v-select
          dense
          :items="rowsPerPage"
          :value="currentRowsPerPage"
          label="Select"
          solo
          v-on:change="changeRow"
          :append-icon="'mdi-chevron-down'"
        ></v-select>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
          dense
          hide-details
        >
        </v-text-field>
      </div>
      <div>
        <EmployeesList
          :employeesDisplay="employeesDisplay"
          :search="search"
          @change-status="changeStatus"
          @click-row="redirectUpdateEmployee"
          @delete-employee="deleteEmployee"
        />
        <div class="text-center pt-2">
          <v-pagination
            v-if="totalPages > 1"
            circle
            @input="next"
            previous="prePage"
            :total-visible="5"
            v-model="currentPage"
            :length="totalPages"
          >
          </v-pagination>
        </div>
      </div>
    </template>
  </PageContainer>
</template>

<script>
import CreateButton from "../../components/CreateButton.vue";
import { mapGetters } from "vuex";
import EmployeesList from "../components/EmployeesList.vue";
import PageContainer from "@/components/PageContainer.vue";
export default {
  components: {
    PageContainer,
    CreateButton,
    EmployeesList,
  },
  data() {
    return {
      status: ["Show all", "Show enabled", "Show disabled"],
      rowsPerPage: [10, 20, 50, 100],
      currentRowsPerPage: 10,
      currentPage: 1,
      currentStatus: "Show all",
      showAll: true,
      statusEmployee: 2,
      search: "",
    };
  },

  computed: {
    ...mapGetters({
      employees: "employees/getEmployees",
      totalPages: "employees/totalPages",
    }),

    employeesDisplay: function () {
      if (this.showAll) {
        return this.employees;
      } else if (this.statusEmployee === 0) {
        return this.employees.filter((item) => item.status === 0);
      } else return this.employees.filter((item) => item.status == 1);
    },
  },

  methods: {
    changeRow(rowsPerPage) {
      this.currentRowsPerPage = rowsPerPage;
      this.currentPage = 1;
      this.$store.dispatch("employees/getEmployees", {
        PageNumber: this.currentPage,
        PageSize: this.currentRowsPerPage,
        companyId: this.$route.params.companyId,
      });
    },

    next() {
      this.$store.dispatch("employees/getEmployees", {
        PageNumber: this.currentPage,
        PageSize: this.currentRowsPerPage,
        companyId: this.$route.params.companyId,
      });
    },

    filterStatus(status) {
      this.showAll = status === "Show all" ? true : false;
      this.statusEmployee = status === "Show enabled" ? 1 : 0;
    },

    changeStatus({ employeeId, employeeStatus }) {
      this.$store.dispatch("employees/changeStatus", {
        companyId: this.$route.params.companyId,
        employeeId: employeeId,
        employeeStatus: employeeStatus,
      });
    },

    redirectUpdateEmployee(employee) {
      this.$router.push({ path: `employees/${employee.id}` });
    },

    deleteEmployee({ employeeId }) {
      this.$store.dispatch("employees/deleteEmployee", {
        companyId: this.$route.params.companyId,
        employeeId: employeeId,
      });
    },
    onCreate() {
      this.$router.push({ name: "CreateEmployee" });
    },
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    this.$store.dispatch("employees/clearStates").then(() => {
      next();
    });
  },
};
</script>
<style lang="scss" scoped></style>
