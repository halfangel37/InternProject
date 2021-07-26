<template>
  <div>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="companiesDisplay"
      show-select
      hide-default-footer
      disable-pagination
      class="elevation-1 row-pointer"
    >
      <template v-slot:item.actions="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="editCompany(item)">
              <span>Edit company</span></v-list-item
            >
            <v-list-item @click="confirmDeleteCompany(item.id)">
              <span style="color: #e12d39"> Delete company</span>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <div class="mt-10"></div>
    <ConfirmDialog
      :title="dialogTitle"
      :content="dialogContent"
      :isDialog="isDialog"
      @on-close="isDialog = false"
      :btnAccept="'OK'"
      :btnNotAccept="'Cancel'"
      @on-confirm="actionType === deleteCompany()"
    ></ConfirmDialog>
  </div>
</template>
<script>
import ConfirmDialog from "@/components/dialogs/views/ConfirmDialog.vue";
import "@/shared/style/style.css";
import "@/shared/style/style.scss";
export default {
  components: {
    ConfirmDialog,
  },
  props: {
    search: String,
    companiesDisplay: Array,
  },
  data() {
    return {
      headers: [
        { text: "Name", align: "start", value: "name" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "Website", value: "website" },
        { text: "Address", value: "address" },
        { text: "Currency", value: "currency" },
        { text: "Image Name", value: "imageName" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      selectedCompany: undefined,
      isDialog: false,
      dialogTitle: "",
      dialogContent: "",
    };
  },

  methods: {
    confirmDeleteCompany(companyId) {
      this.actionType = "deleteCompany";
      this.selectedCompany = companyId;
      this.dialogTitle = `Confirm company deletion`;
      this.dialogContent = `Deleting a company will remove all data related to the company in the system and the data cannot be retrieved later. Are you sure you want to delete company?`;
      this.isDialog = true;
    },
    onClose() {
      this.isDialog = false;
    },
    deleteCompany() {
      this.$emit("delete-company", this.selectedCompany);
    },
  },
};
</script>

<style lang="scss" scoped></style>
