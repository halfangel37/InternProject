<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="employeesDisplay"
      show-select
      item-key="employeeNumber"
      disable-pagination
      hide-default-footer
      :search="search"
      dense
      @click:row="redirectUpdateEmployee"
      class="row-pointer"
    >
      <template v-slot:[`header.status`]="{ header }">
        {{ header.text.toUpperCase() }}
      </template>

      <template v-slot:[`header.employeeNumber`]="{ header }">
        {{ header.text.toUpperCase() }}
      </template>

      <template v-slot:[`header.name`]="{ header }">
        {{ header.text.toUpperCase() }}
      </template>

      <template v-slot:[`header.email`]="{ header }">
        {{ header.text.toUpperCase() }}
      </template>

      <template v-slot:[`header.phoneNumber`]="{ header }">
        {{ header.text.toUpperCase() }}
      </template>

      <template v-slot:[`header.address`]="{ header }">
        {{ header.text.toUpperCase() }}
      </template>

      <template v-slot:[`header.birthDate`]="{ header }">
        {{ header.text.toUpperCase() }}
      </template>

      <template v-slot:[`item.name`]="{ item }">
        <td class="itemFormat">
          {{ item.firstName + " " + item.lastName }}
        </td>
      </template>

      <template v-slot:[`item.birthDate`]="{ item }">
        <td class="itemFormat">
          {{
            new Date(item.birthDate).toLocaleDateString("nl", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          }}
        </td>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <td class="itemFormat">
          <v-switch
            v-model="item.status"
            :false-value="DISABLED_STATUS"
            :true-value="ENABLED_STATUS"
            @click.capture.native.stop="confirmChangeStatus(item)"
            insert
            :label="item.status | status"
            color="success"
            readonly
          ></v-switch>
        </td>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2" v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="confirmChangeStatus(item)">
              {{ item.status == ENABLED_STATUS ? "Disable" : "Enable" }}
            </v-list-item>
            <v-list-item @click="confirmDeleteEmployee(item)">
              Delete
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <confirmDialog
      :title="dialogTitle"
      :content="dialogContent"
      :isDialog="isDialog"
      @on-close="isDialog = false"
      :btnAccept="'OK'"
      :btnNotAccept="'Cancel'"
      @on-confirm="
        actionType === 'changeStatus' ? changeStatus() : deleteEmployee()
      "
    ></confirmDialog>
  </div>
</template>

<script>
import confirmDialog from "@/components/dialogs/views/ConfirmDialog.vue";
import "@/shared/style/style.css";
import "@/shared/style/style.scss";
import { ENABLE_STATUS, DISABLE_STATUS } from "@/shared/variables/index";
export default {
  components: {
    confirmDialog,
  },
  props: {
    search: {
      type: String,
    },
    employeesDisplay: {
      type: Array,
    },
  },
  data: () => ({
    dialogDelete: false,
    headers: [
      {
        text: "Status",
        align: "start",
        value: "status",
      },
      { text: "Number", value: "employeeNumber" },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Phone number", value: "phoneNumber" },
      { text: "Address", value: "address" },
      { text: "", value: "actions", sortable: false },
    ],

    selectedEmployee: undefined,
    isDialog: false,
    dialogTitle: "",
    dialogContent: "",
    ENABLED_STATUS: ENABLE_STATUS,
    DISABLED_STATUS: DISABLE_STATUS,
  }),

  methods: {
    statusSliderChanged(status) {
      const statusEmployee =
        status === 1 ? 0 : status === 0 ? 1 : !status ? 0 : 1;
      return statusEmployee;
    },
    redirectUpdateEmployee(employee) {
      this.$emit("click-row", employee);
    },

    confirmChangeStatus(employee) {
      const actionTypeName =
        employee.status === this.ENABLED_STATUS ? "disable" : "enable";
      this.actionType = "changeStatus";
      this.selectedEmployee = employee;
      this.isDialog = true;
      this.dialogTitle = `Confirm ${actionTypeName} selected employee!`;
      this.dialogContent = `Are you sure you want to ${actionTypeName} selected employee?`;
    },

    changeStatus() {
      const employeeStatus = this.statusSliderChanged(
        this.selectedEmployee.status
      );
      this.$emit("change-status", {
        employeeId: this.selectedEmployee.id,
        employeeStatus: employeeStatus,
      });
    },

    confirmDeleteEmployee(employee) {
      this.selectedEmployee = employee;
      this.actionTypeName = "delete";
      this.actionType = "deleteEmployee";
      this.isDialog = true;
      this.dialogTitle = "Confirm delete selected employee!";
      this.dialogContent = "Are you sure you want to delete selected employee?";
    },

    deleteEmployee() {
      this.$emit("delete-employee", { employeeId: this.selectedEmployee.id });
    },
  },
};
</script>

<style>
.redColor {
  color: red;
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.06) !important;
}
</style>
