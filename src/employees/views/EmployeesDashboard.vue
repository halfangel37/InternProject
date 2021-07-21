<template>
  <div>
    <v-container>
      <v-row justify="end" align="baseline">
        <v-col cols="12" md="1">
          <CreateButton  @onCreate="onCreate()"/>
        </v-col>

        <v-col cols="12" md="2" class="ml-5">
          <v-select
            dense
            :items="status"
            :value="currentStatus"
            v-on:change="filterStatus"
            label="Select"
            solo
            :append-icon="'mdi-chevron-down'"
          ></v-select>
        </v-col>

        <v-col cols="12" md="2">
          <v-row align="baseline">
            <v-col>Rows per page:</v-col>
            <v-col>
              <v-select
                dense
                :items="rowsPerPage"
                :value="currentRowsPerPage"
                label="Select"
                solo
                v-on:change="changeRow"
                :append-icon="'mdi-chevron-down'"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3"></v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            outlined
            hide-details
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="12" md="11">
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CreateButton from "../../components/CreateButton.vue";
import { mapGetters } from "vuex";
import EmployeesList from "../components/EmployeesList.vue";

export default {
  components: {
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

    changeStatus({employeeId, employeeStatus}) {
      this.$store.dispatch("employees/changeStatus", {
        companyId: this.$route.params.companyId,
        employeeId: employeeId,
        employeeStatus: employeeStatus,
      });
    },

    redirectUpdateEmployee(employee) {
      this.$router.push({ path: `employees/${employee.id}` });
    },

    deleteEmployee({employeeId}) {
      this.$store.dispatch("employees/deleteEmployee", {
        companyId: this.$route.params.companyId,
        employeeId: employeeId
      })
    },
    onCreate() {
      this.$router.push({ name: "CreateEmployee" });
    }
  },
};

</script>
<style lang="scss" scoped></style>
