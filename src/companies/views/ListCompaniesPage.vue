<template>
  <PageContainer>
    <template #page-title> Company List </template>
    <template #page-content>
      <div class="d-flex justify-space-between align-baseline">
        <CreateButton @onCreate="onCreate()" />
        <div class="mr-2"></div>
        <ShowCompanies />
        <div class="mr-2"></div>
        <FilterCompanies />
        <div class="mr-2"></div>
        <RowsPerPage
          :items="rowsPerPage"
          :value="currentRowsPerPage"
          @change-row="changeRow"
        />
        <div class="mr-2"></div>
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
        >
        </v-text-field>
      </div>
      <div>
        <CompaniesTable
          :search="search"
          :companiesDisplay="companies"
          @delete-company="deleteCompany"
        />
        <v-pagination
          v-if="totalPages > 1"
          circle
          @input="next"
          previous="prePage"
          :total-visible="5"
          v-model="currentPage"
          :length="pagination.totalPages"
        >
        </v-pagination>
      </div>
    </template>
  </PageContainer>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";
import PageContainer from "@/components/PageContainer.vue";
import CreateButton from "@/components/CreateButton.vue";
import ShowCompanies from "@/companies/components/ShowCompanies.vue";
import FilterCompanies from "@/companies/components/FilterCompanies.vue";
import RowsPerPage from "@/companies/components/RowsPerPage.vue";
import CompaniesTable from "@/companies/components/CompaniesTable.vue";

export default {
  components: {
    PageContainer,
    ShowCompanies,
    CreateButton,
    FilterCompanies,
    RowsPerPage,
    CompaniesTable,
  },
  data() {
    return {
      search: "",
      link: "/companies/create",
    };
  },

  computed: {
    ...mapGetters({
      companies: "companies/selectAllCompanies",
      pagination: "companies/selectCompanyPaging",
    }),
  },
  methods: {
    changeRow(rowsPerPage) {
      this.currentRowsPerPage = rowsPerPage;
      this.currentPage = 1;
      store.dispatch("companies/updatePagination", this.currentRowsPerPage);
      store.dispatch("companies/getCompanies");
    },
    next() {
      store.dispatch("companies/getCompanies", {
        pageNumber: this.currentPage,
        pageSize: this.currentRowsPerPage,
      });
    },
    mounted() {
      this.$store.dispatch("companies/getCompanies", {
        pageNumber: 1,
        pageSize: 10,
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
