<template>
  <PageContainer>
    <template #page-title> Contacts </template>
    <template #page-content>
      <div class="d-flex h-40 j-content-space-between mt-40 header">
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
          ><v-icon class="color-light-orange">{{ settingIcon }}</v-icon></span
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
      <Contacts
        :contacts="contactsDisplay"
        :search="search"
        @changeStatus="changeStatus"
        @navigateContact="navigateContact"
        @deleteContact="deleteContact"
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
    </template>
  </PageContainer>
</template>

<script>
import "@/shared/style/style.css";
import { mdiMagnify, mdiCogOutline } from "@mdi/js";
import { mapGetters } from "vuex";
import store from "@/store";
import Contacts from "@/contacts/components/Contacts.vue";
import CreateButton from "@/components/CreateButton.vue";
import PageContainer from "@/components/PageContainer.vue";
import { ENABLE_STATUS, DISABLE_STATUS } from "@/shared/variables/index";
export default {
  components: { Contacts, CreateButton, PageContainer },
  props: {
    companyId: String,
  },
  data() {
    return {
      status: [
        "Show all",
        "Show enabled customer status",
        "Show disabled customer status",
        "Show enabled supplier status",
        "Show disabled supplier status",
      ],
      rowsPerPage: [10, 20, 50, 100],
      currentRowsPerPage: 10,
      currentPage: 1,
      currentStatus: "Show all",
      searchIcon: mdiMagnify,
      settingIcon: mdiCogOutline,
      search: "",
    };
  },
  methods: {
    changeRow(rowsPerPage) {
      this.currentRowsPerPage = rowsPerPage;
      this.currentPage = 1;
      store.dispatch("contacts/setPagination", {
        pageSize: this.currentRowsPerPage,
        pageNumber: 1,
      });
      store.dispatch("contacts/getContacts", {
        id: this.companyId,
      });
    },
    next() {
      store.dispatch("contacts/setPagination", {
        pageSize: this.currentRowsPerPage,
        pageNumber: this.currentPage,
      });
      store.dispatch("contacts/getContacts", {
        id: this.companyId,
      });
    },
    filterStatus(status) {
      this.showAll = status === "Show all" ? true : false;
      this.currentStatus = status;
    },
    changeStatus({ contactId, contactStatus, contactTypeChange }) {
      const status =
        contactStatus === ENABLE_STATUS ? DISABLE_STATUS : ENABLE_STATUS;
      this.$store.dispatch("contacts/updateContactStatus", {
        companyId: this.companyId,
        contactId: contactId,
        contactStatus: status,
        contactTypeChange: contactTypeChange,
      });
    },
    deleteContact({ contactId }) {
      this.$store.dispatch("contacts/deleteContact", {
        companyId: this.companyId,
        contactId: contactId,
      });
    },
    navigateContact(contact) {
      this.$router.push({
        path: `contacts/${contact.id}`,
      });
    },
    onCreate() {
      this.$router.push({ name: "createContact" });
    },
  },
  computed: {
    ...mapGetters({
      contacts: "contacts/selectAllContacts",
      totalPages: "contacts/selectTotalPages",
    }),
    contactsDisplay: function () {
      if (this.currentStatus === "Show all") {
        return this.contacts;
      }
      if (this.currentStatus === "Show enabled customer status") {
        return this.contacts.filter(
          (item) => item.customerStatus === ENABLE_STATUS
        );
      }
      if (this.currentStatus === "Show disabled customer status") {
        return this.contacts.filter(
          (item) => item.customerStatus === DISABLE_STATUS
        );
      }
      if (this.currentStatus === "Show enabled supplier status") {
        return this.contacts.filter(
          (item) => item.supplierStatus === ENABLE_STATUS
        );
      }
      return this.contacts.filter(
        (item) => item.supplierStatus == DISABLE_STATUS
      );
    },
  },
  beforeDestroy() {
    this.$store.dispatch("contacts/clearStates")
  },
};
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100px;
}
.color-light-orange {
  color: #df7f01;
}
</style>
