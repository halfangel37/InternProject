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
            @click.capture.native.stop="changeStatus(item)"
            insert
            :label="labelStatus(item.status)"
            color="success"
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
            <v-list-item v-if="item.status === 0" @click="changeStatus(item)">
              Enable
            </v-list-item>
            <v-list-item
              v-else
              @click="changeStatus(item)"
              :rules="item.status === 0"
            >
              Disable
            </v-list-item>
            <v-list-item @click="deleteProduct(item)"> Delete </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    search: {
      type: String,
    },
    employeesDisplay: {
      type: Array,
    },
  },
  data: () => ({
    headers: [
      {
        text: "Status",
        align: "start",
        value: "status",
      },
      { text: "Employee number", value: "employeeNumber" },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Phone number", value: "phoneNumber" },
      { text: "Address", value: "address" },
      { text: "Birth date", value: "birthDate" },
      { text: "", value: "actions", sortable: false },
    ],
  }),

  methods: {
    labelStatus(status) {
      if (status === 1 || status) return "Enable";
      else return "Disable";
    },

    statusSliderChanged(status) {
      const statusEmployee =
        status === 1 ? 0 : status === 0 ? 1 : !status ? 0 : 1;
      return statusEmployee;
    },

    changeStatus(employee) {
      let employeeStatus = this.statusSliderChanged(employee.status);
      this.$emit("change-status", employee.id, employeeStatus);
    },

    redirectUpdateEmployee(employee) {
      this.$emit("click-row", employee)
    },
  },
};
</script>

<style>
.redColor {
  color: red;
}
</style>
