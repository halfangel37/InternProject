<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="contacts"
      class="mt-10 row-pointer"
      item-key="contactNumber"
      disable-pagination
      hide-default-footer
      :search="search"
      dense
      @click:row="navigateContact"
      show-select
    >
      <template v-slot:[`item.role`]="{ item }">
        <td class="d-flex">
          <span
            class="role mr-3 bg-blue"
            v-if="
              item.contactType === CUSTOMER_TYPE ||
              item.contactType === BOTH_TYPE
            "
            >Customer</span
          >
          <span
            class="role bg-green"
            v-if="
              item.contactType === SUPPLIER_TYPE ||
              item.contactType === BOTH_TYPE
            "
            >Supplier</span
          >
        </td>
      </template>
      <template v-slot:[`item.contactNumber`]="{ item }"
        ><td>{{ item.contactNumber }}</td>
      </template>

      <template v-slot:[`item.name`]="{ item }"
        ><td class="height-40 white-space-nowrap overflow-hidden">
          {{ item.firstName + " " + item.lastName }}
        </td>
      </template>
      <template v-slot:[`item.customerStatus`]="{ item }">
        <td
          v-if="
            item.contactType === CUSTOMER_TYPE || item.contactType === BOTH_TYPE
          "
          class="d-flex"
        >
          <v-switch
            v-model="item.customerStatus"
            :true-value="ENABLE_STATUS"
            :false-value="DISABLE_STATUS"
            :label="item.customerStatus | status"
            @click.capture.native.stop="
              confirmChangeStatus(item, CUSTOMER_TYPE)
            "
            readonly
          >
          </v-switch>
        </td>
      </template>
      <template v-slot:[`item.supplierStatus`]="{ item }">
        <td
          v-if="
            item.contactType === SUPPLIER_TYPE || item.contactType === BOTH_TYPE
          "
          class="d-flex"
        >
          <v-switch
            v-model="item.supplierStatus"
            :label="item.supplierStatus | status"
            :true-value="ENABLE_STATUS"
            :false-value="DISABLE_STATUS"
            @click.capture.native.stop="
              confirmChangeStatus(item, SUPPLIER_TYPE)
            "
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
            <v-list-item
              v-if="
                item.contactType === CUSTOMER_TYPE ||
                item.contactType === BOTH_TYPE
              "
              @click="confirmChangeStatus(item, CUSTOMER_TYPE)"
            >
              {{
                item.customerStatus === DISABLE_STATUS
                  ? "Enable customer status"
                  : "Disable customer status"
              }}
            </v-list-item>
            <v-list-item
              v-if="
                item.contactType === SUPPLIER_TYPE ||
                item.contactType === BOTH_TYPE
              "
              @click="confirmChangeStatus(item, SUPPLIER_TYPE)"
            >
              {{
                item.supplierStatus === DISABLE_STATUS
                  ? "Enable supplier status"
                  : "Disable supplier status"
              }}
            </v-list-item>
            <v-list-item @click="confirmDeleteContact(item)">
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
        actionType === 'changeStatus' ? changeStatus() : deleteContact()
      "
    ></ConfirmDialog>
  </div>
</template>

<script>
import ConfirmDialog from "@/components/dialogs/views/ConfirmDialog.vue";
import "@/shared/style/style.css";
import "@/shared/style/style.scss";
import {
  ENABLE_STATUS,
  DISABLE_STATUS,
  CUSTOMER_TYPE,
  SUPPLIER_TYPE,
  BOTH_TYPE,
} from "@/shared/variables";
export default {
  components: {
    ConfirmDialog,
  },
  props: {
    contacts: [],
    search: String,
  },
  data() {
    return {
      headers: [
        {
          text: "CONTACT NUMBER",
          align: "start",
          sortable: true,
          value: "contactNumber",
          width: "10%",
        },
        { text: "NAME", value: "name", sortable: true },
        { text: "ROLE", value: "role", sortable: true, width: "20%" },
        {
          text: "PHONE NUMBER",
          value: "phoneNumber",
          sortable: true,
          width: "15%",
        },
        {
          text: "CUSTOMER STATUS",
          value: "customerStatus",
          sortable: true,
          width: "5%",
        },
        {
          text: "SUPPLIER STATUS",
          value: "supplierStatus",
          sortable: true,
          width: "5%",
        },
        { text: "", value: "actions", width: "5%" },
      ],
      selectedContact: undefined,
      contactTypeChange: undefined,
      contactStatusChange: undefined,
      isDialog: false,
      dialogTitle: "",
      dialogContent: "",
      ENABLE_STATUS: ENABLE_STATUS,
      DISABLE_STATUS: DISABLE_STATUS,
      CUSTOMER_TYPE: CUSTOMER_TYPE,
      SUPPLIER_TYPE: SUPPLIER_TYPE,
      BOTH_TYPE: BOTH_TYPE,
    };
  },
  methods: {
    confirmChangeStatus(contact, contactTypeChange) {
      let actionTypeName;
      if (contactTypeChange === CUSTOMER_TYPE) {
        if (contact.customerStatus === ENABLE_STATUS) {
          actionTypeName = "disable customer status";
        } else {
          actionTypeName = "enable customer status";
        }
      } else {
        if (contact.supplierStatus === ENABLE_STATUS) {
          actionTypeName = "disable supplier status";
        } else {
          actionTypeName = "enable supplier status";
        }
      }
      this.contactStatusChange =
        contactTypeChange === CUSTOMER_TYPE
          ? contact.customerStatus
          : contact.supplierStatus;

      this.actionType = "changeStatus";
      this.contactTypeChange = contactTypeChange;
      this.selectedContact = contact;
      this.isDialog = true;
      this.dialogTitle = `Confirm ${actionTypeName} from selected contact!`;
      this.dialogContent = `Are you sure you want to ${actionTypeName} from selected contact!`;
    },
    changeStatus() {
      this.$emit("changeStatus", {
        contactId: this.selectedContact.id,
        contactStatus: this.contactStatusChange,
        contactTypeChange: this.contactTypeChange,
      });
    },
    confirmDeleteContact(contact) {
      this.selectedContact = contact;
      this.actionType = "deleteContact";
      this.dialogTitle = `Confirm delete selected contact!`;
      this.dialogContent = `Are you sure you want to delete selected contact!`;
      this.isDialog = true;
    },
    deleteContact() {
      this.$emit("deleteContact", {
        contactId: this.selectedContact.id,
      });
    },
    navigateContact(contact) {
      this.$emit("navigateContact", contact);
    },
    onClose() {
      this.isDialog = false;
    },
  },
};
</script>

<style lang="scss">
.role {
  padding: 5px 10px;
  border-radius: 16px;
  color: white;
  font-size: 14px;
}
.bg-blue {
  background: #95c9da;
}
.bg-green {
  background: #95dacd;
}
</style>
