<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      show-select
      hide-default-footer
      disable-pagination
      class="elevation-1"
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
            <v-list-item @click="deleteCompany(item.id)">
              <span style="color: #e12d39"> Delete company</span>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <div class="mt-10"></div>
     <Dialog

      :title="dialogTitle"
      :content="dialogContent"
      :isShowDialog="isShowDialog"
      @setShowDialog="setShowDialog"
      :btnAccept="'OK'"
      :btnNotAccept="'Cancel'"
      @confirmDeleteCompany="deleteCompany()"
    ></Dialog>
  </div>
</template>
<script>
import Dialog from "@/components/dialogs/views/ConFirmDialog.vue";
export default {
  components: {
    Dialog,
  },
  props: {
    items: Array,
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
      isShowDialog: false,
      dialogTitle: "",
      dialogContent: "",
    };
  },

  methods: {
    confirmDeleteCompany() {
      this.dialogTitle = `Confirm company deletion`;
      this.dialogContent = `Deleting a company will remove all data related to the company in the system and the data cannot be retrieved later. Are you sure you want to delete company?`;
      this.isShowDialog = true;
    },
    setShowDialog(value) {
      this.isShowDialog = value;
    },
    deleteCompany(companyId) {
      this.$emit("delete-company", companyId);
    },
  },
};
</script>

<style lang="scss" scoped></style>
