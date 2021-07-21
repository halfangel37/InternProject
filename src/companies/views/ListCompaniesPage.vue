<template>
  <div>
    <v-container>
      <v-row class="align-baseline justify-center justify-space-around">
        <CreateButton @onCreate="onCreate()" />
        <ShowCompanies />
        <FilterCompanies />
        <RowsPerPage :rowsPerPage="currentRowsPerPage" />
        <SearchCompanies />
      </v-row>
      <v-row>
        <v-col cols="12">
          <CompaniesTable :items="companies" @delete-company="deleteCompany" />
          <v-pagination
            circle
            @input="next"
            previous="prePage"
            :total-visible="5"
            v-model="currentPage"
            :length="pagination.totalPages"
          >
          </v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";
import CreateButton from "@/components/CreateButton.vue";
import ShowCompanies from "@/companies/components/ShowCompanies.vue";
import FilterCompanies from "@/companies/components/FilterCompanies.vue";
import RowsPerPage from "@/companies/components/RowsPerPage.vue";
import SearchCompanies from "@/companies/components/SearchCompanies.vue";
import CompaniesTable from "@/companies/components/CompaniesTable.vue";

export default {
  components: {
    ShowCompanies,
    CreateButton,
    FilterCompanies,
    RowsPerPage,
    SearchCompanies,
    CompaniesTable,
  },
  data() {
    return {
      link: "/companies/create",
      currentRowsPerPage: 10,
      currentPage: 1,
    };
  },

  computed: {
    ...mapGetters({
      companies: "companies/selectAllCompanies",
      pagination: "companies/selectCompanyPaging",
    }),
  },
  methods: {
    changeRowsPerPage(rowsPerPage) {
      this.currentRowsPerPage = rowsPerPage;
      this.currentPage = 1;
      store.dispatch("companies/Companies", {
        PageNumber: this.currentPage,
        PageSize: this.currentRowsPerPage,
        id: this.companyId,
      });
    },
    next() {
      store.dispatch("companies/getCompanies", {
        PageNumber: this.currentPage,
        PageSize: this.currentRowsPerPage,
        id: this.companyId,
      });
    },
    mounted() {
      this.$store.dispatch("companies/getCompanies", {
        PageNumber: 1,
        PageSize: 10,
      });
    },
    deleteCompany(companyId) {
      this.$store.dispatch("companies/deleteCompany", companyId);
    },
    onCreate() {
      this.$router.push({ name: "RegisterCompany" });
    },
  },
};
</script>
<style lang="scss" scoped></style>
