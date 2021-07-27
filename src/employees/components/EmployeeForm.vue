<template>
  <div>
    <v-form ref="EmployeeForm" @submit.prevent="onSubmit()" lazy-validation>
      <v-card class="mb-5">
        <v-card-title>Name</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                v-model="employeeInfo.firstName"
                :rules="firstNameRules"
                label="First name"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="employeeInfo.lastName"
                :rules="lastNameRules"
                label="Last name"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mb-10">
        <v-card-title>Contact info</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                v-model="employeeInfo.email"
                :rules="emailRules"
                label="Email"
                required
                validate-on-blur
                outlined
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model="employeeInfo.phoneNumber"
                label="Phone number"
                type="phone"
                :rules="phoneNumberRules"
                required
                outlined
                validate-on-blur
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="employeeInfo.address"
                label="Address"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col>
              <v-menu
                v-model="calendarOpen"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="employeeInfo.birthDate"
                    label="Birth date"
                    outlined
                    persistent-hint
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="employeeInfo.birthDate"
                  no-title
                  @input="calendarOpen = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="1">
              <v-switch
                :true-value="ENABLED_STATUS"
                :false-value="DISABLED_STATUS"
                v-model="employeeInfo.status"
                :label="employeeInfo.status | status"
              ></v-switch>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <div class="d-flex justify-space-between">
        <div>
          <v-btn
            outlined
            color="#72418b"
            @click="cancelUpdateEmployee()"
            class="mr-5"
            >CANCEL</v-btn
          >
          <v-btn color="#72418b" dark type="submit" @click="validate()">{{
            employeeCopy.id ? "SAVE" : "CREATE"
          }}</v-btn>
        </div>
        <v-btn
          outlined
          color="#F44336"
          @click="confirmDeleteEmployee(employeeCopy.id)"
          v-if="employeeCopy.id"
          >DELETE</v-btn
        >
      </div>

      <confirmDialog
        :title="dialogTitle"
        :content="dialogContent"
        :isDialog="isDialog"
        @on-close="isDialog = false"
        :btnAccept="'OK'"
        :btnNotAccept="'Cancel'"
        @on-confirm="deleteEmployee()"
      ></confirmDialog>
    </v-form>
  </div>
</template>

<script>
import validators from "@/shared/form-validators";
import confirmDialog from "@/components/dialogs/views/ConfirmDialog.vue";
import { ENABLE_STATUS, DISABLE_STATUS } from "@/shared/variables/index";
import "@/shared/style/style.css";
import _ from "lodash";
export default {
  components: {
    confirmDialog,
  },
  props: {
    employee: Object,
  },
  data() {
    return {
      employeeInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        birthDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        status: DISABLE_STATUS,
      },
      isDialog: false,
      dialogTitle: "",
      dialogContent: "",
      selectedEmployeeId: "",
      calendarOpen: false,
      employeeCopy: "",
      ENABLED_STATUS: ENABLE_STATUS,
      DISABLED_STATUS: DISABLE_STATUS,
      firstNameRules: [validators.required("First name is required")],
      lastNameRules: [validators.required("Last name is required")],
      emailRules: [
        validators.required("Email is required"),
        validators.email("Email must be valid"),
        validators.space("No spaces allowed"),
      ],
      phoneNumberRules: [
        validators.required("Phone number is required"),
        validators.maxLength(
          "Phone number must be less than 11 characters",
          10
        ),
        validators.min("Phone number must be more than 9 characters", 10),
      ],
    };
  },
  watch: {
    employee() {
      this.employeeCopy = _.cloneDeep(this.employee);
      if (this.employeeCopy) {
        this.employeeInfo = this.employeeCopy;
        this.employeeCopy.birthDate = this.formatDate(
          this.employeeCopy.birthDate
        );
      }
    },
  },
  methods: {
    onSubmit() {
      if (this.$refs.EmployeeForm.validate()) {
        if (this.employeeCopy.id) {
          this.$emit("update-employee", this.employeeInfo);
        } else {
          this.$emit("create-employee", this.employeeInfo);
        }
      }
    },
    validate() {
      this.$refs.EmployeeForm.validate();
    },
    cancelUpdateEmployee() {
      this.$router.push({
        path: `/companies/${this.$route.params.companyId}/employees`,
      });
    },
    confirmDeleteEmployee(employeeId) {
      this.selectedEmployeeId = employeeId;
      this.isDialog = true;
      this.dialogTitle = "Confirm delete employee!";
      this.dialogContent = `Are you sure want to delete the employee '${this.employeeCopy.firstName} ${this.employeeCopy.lastName}'?`;
    },
    deleteEmployee() {
      this.$emit("delete-employee", { employeeId: this.selectedEmployeeId });
      this.$router.push({
        path: `/companies/${this.$route.params.companyId}/employees`,
      });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
};
</script>

<style></style>
