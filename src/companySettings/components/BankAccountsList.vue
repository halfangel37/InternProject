<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="bankAccounts"
      class="mt-10"
      disable-pagination
      hide-default-footer
      :search="search"
      dense
      @click:row="onRowSelect"
    >
      <template v-slot:[`item.name`]="{ item }"
        ><td class="height-40 white-space-nowrap overflow-hidden">
          {{ item.name }}
        </td>
      </template>
      <template v-slot:[`item.accountNumber`]="{ item }">
        <td class="d-flex j-content-space-between">
          <div>
            <span class="w-100per t-align-right mr-1"
              ><b>{{ item.accountNumber }}</b></span
            >
          </div>
        </td>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <td class="d-flex">
          <v-switch
            v-model="item.status"
            :label="item.status | status"
            :true-value="ENABLE_STATUS"
            :false-value="DISABLE_STATUS"
            @click.capture.native.stop="confirmChangeStatus(item)"
            readonly
          >
          </v-switch>
        </td>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="confirmChangeStatus(item)">
              {{ item.status === ENABLE_STATUS ? "Disable" : "Enable" }}
            </v-list-item>
            <v-list-item @click="confirmDeleteBankAccount(item)">
              Delete
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <ConfirmDialog
      :title="dialogTitle"
      :content="dialogContent"
      :isDialog="isDialog"
      @on-close="isDialog = false"
      :btnAccept="'OK'"
      :btnNotAccept="'Cancel'"
      @on-confirm="
        actionType === 'changeStatus' ? changeStatus() : deleteBankAccount()
      "
    ></ConfirmDialog>
  </div>
</template>

<script>
import ConfirmDialog from "@/components/dialogs/views/ConfirmDialog.vue";
import "@/shared/style/style.css";
import { ENABLE_STATUS, DISABLE_STATUS } from "@/shared/variables/index";
export default {
  components: {
    ConfirmDialog,
  },
  props: {
    bankAccounts: [],
    search: String,
  },
  data() {
    return {
      headers: [
        { text: "ACCOUNT NAME", value: "name", sortable: false },
        {
          text: "ACCOUNT NUMBER",
          value: "accountNumber",
          sortable: false,
          width: "40%",
        },
        { text: "STATUS", value: "status", sortable: false, width: "15%" },

        { text: "", value: "actions", sortable: false, width: "5%" },
      ],
      selectedBankAccount: undefined,
      isDialog: false,
      dialogTitle: "",
      dialogContent: "",
      ENABLE_STATUS: ENABLE_STATUS,
      DISABLE_STATUS: DISABLE_STATUS,
    };
  },
  methods: {
    confirmChangeStatus(bankAccount) {
      const actionTypeName =
        bankAccount.status === ENABLE_STATUS ? "disable" : "enable";
      this.actionType = "changeStatus";
      this.selectedBankAccount = bankAccount;
      this.isDialog = true;
      this.dialogTitle = `Confirm ${actionTypeName} selected account!`;
      this.dialogContent = `Are you sure you want to ${actionTypeName} selected account!`;
    },
    changeStatus() {
      this.$emit("changeStatus", {
        bankAccountId: this.selectedBankAccount.id,
        bankAccountStatus: this.selectedBankAccount.status,
      });
    },
    confirmDeleteBankAccount(bankAccount) {
      this.selectedBankAccount = bankAccount;
      this.actionType = "deleteBankAccount";
      this.dialogTitle = "Confirm delete selected account!";
      this.dialogContent = "Are you sure you want to delete selected account!";
      this.isDialog = true;
    },
    deleteBankAccount() {
      this.$emit("deleteBankAccount", {
        bankAccountId: this.selectedBankAccount.id,
      });
    },
    onRowSelect(bankAccount) {
      this.$emit("onRowSelect", bankAccount);
    },
    onClose() {
      this.isDialog = false;
    },
  },
};
</script>

<style lang="scss">
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.06) !important;
}
</style>
