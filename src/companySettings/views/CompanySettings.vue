<template>
  <PageContainer>
    <template #page-title>Company Settings </template>
    <template #page-content>
      <div class="mb-10 mt-10">
        <v-tabs
          v-model="tab"
          class="tabs"
          color="#4f2566"
          slider-color="#E7AC28"
          slider-size="3"
        >
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items
          class="tabs-items"
          v-model="tab"
          :class="{ active: tab === 1 }"
        >
          <v-tab-item v-for="item in items" :key="item">
            <div class="d-flex h-40 j-content-space-between header">
              <CreateButton @onCreate="onCreate" />
              <div class="w-200">
                <v-select
                  dense
                  :items="status"
                  :value="currentStatus"
                  v-on:change="filterStatus"
                  label="Select"
                  solo
                  :append-icon="'mdi-chevron-down'"
                ></v-select>
              </div>
              <span class="d-flex a-items-center mr-5"
                ><v-icon class="color-light-orange">{{
                  settingIcon
                }}</v-icon></span
              >
              <div class="d-flex">
                <span class="d-flex a-items-center mr-5">Rows per page:</span>
                <div class="w-100">
                  <v-select
                    dense
                    :items="rowsPerPage"
                    :value="currentRowsPerPage"
                    label="Select"
                    solo
                    v-on:change="changeRow"
                    :append-icon="'mdi-chevron-down'"
                  ></v-select>
                </div>
              </div>
              <div>
                <v-text-field
                  dense
                  outlined
                  label="Search"
                  v-model="search"
                  :append-icon="searchIcon"
                >
                </v-text-field>
              </div>
            </div>
            <BankAccountsList
              :bankAccounts="bankAccountsDisplay"
              :search="search"
              @changeStatus="changeStatus"
              @onRowSelect="onRowSelect"
              @deleteBankAccount="deleteBankAccount"
            />
            <div class="mt-5">
              <v-pagination
                circle
                @input="next"
                previous="prePage"
                :total-visible="5"
                v-model="currentPage"
                :length="totalPages"
                v-if="totalPages > 1"
              >
              </v-pagination>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </template>
  </PageContainer>
</template>

<script>
import "@/shared/style/style.css";
import { mdiMagnify, mdiCogOutline } from "@mdi/js";
import { mapGetters } from "vuex";
import store from "@/store";
import BankAccountsList from "@/companySettings/components/BankAccountsList.vue";
import PageContainer from "@/components/PageContainer.vue";
import CreateButton from "@/components/CreateButton.vue";
import { ENABLE_STATUS, DISABLE_STATUS } from "@/shared/variables/index";
export default {
  components: {
    BankAccountsList,
    CreateButton,
    PageContainer,
  },
  props: {
    companyId: String,
  },
  data() {
    return {
      status: ["Show all", "Show enabled", "Show disabled"],
      rowsPerPage: [10, 20, 50, 100],
      currentRowsPerPage: 10,
      currentPage: 1,
      currentStatus: "Show all",
      showAll: true,
      statusBankAccount: 2,
      searchIcon: mdiMagnify,
      settingIcon: mdiCogOutline,
      search: "",
      tab: null,
      items: ["General", "Bank Account"],
    };
  },

  methods: {
    changeRow(rowsPerPage) {
      this.currentRowsPerPage = rowsPerPage;
      this.currentPage = 1;
      store.dispatch("companySettings/getBankAccounts", {
        pageNumber: this.currentPage,
        pageSize: this.currentRowsPerPage,
        companyId: this.companyId,
      });
    },
    next() {
      store.dispatch("companySettings/getBankAccounts", {
        pageNumber: this.currentPage,
        pageSize: this.currentRowsPerPage,
        companyId: this.companyId,
      });
    },
    filterStatus(status) {
      this.showAll = status === "Show all" ? true : false;
      this.statusBankAccount =
        status === "Show enabled" ? ENABLE_STATUS : DISABLE_STATUS;
    },
    changeStatus({ bankAccountId, bankAccountStatus }) {
      const status =
        bankAccountStatus === ENABLE_STATUS ? DISABLE_STATUS : ENABLE_STATUS;
      this.$store.dispatch("companySettings/updateStatusBankAccount", {
        companyId: this.companyId,
        bankAccountId: bankAccountId,
        bankAccountStatus: status,
      });
    },
    deleteBankAccount({ bankAccountId }) {
      this.$store.dispatch("companySettings/deleteBankAccount", {
        companyId: this.companyId,
        bankAccountId: bankAccountId,
      });
    },
    onRowSelect(bankAccount) {
      this.$router.push({
        path: `bank-accounts/${bankAccount.id}`,
      });
    },
    onCreate() {
      this.$router.push({ name: "createBankAccount" });
    },
  },
  computed: {
    ...mapGetters({
      totalPages: "companySettings/selectTotalPage",
      bankAccounts: "companySettings/selectAllBankAccounts",
    }),
    bankAccountsDisplay: function () {
      if (this.showAll) {
        return this.bankAccounts;
      }
      if (this.statusBankAccount === ENABLE_STATUS) {
        return this.bankAccounts.filter(
          (item) => item.status === ENABLE_STATUS
        );
      }
      return this.bankAccounts.filter((item) => item.status == DISABLE_STATUS);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  margin-bottom: 2rem;
}
.tabs-items {
  display: none;
}
.active {
  display: block;
}

.color-light-orange {
  color: #df7f01;
}
.w-100 {
  width: 100px;
}
.max-width {
  max-width: 200px;
}
</style>
