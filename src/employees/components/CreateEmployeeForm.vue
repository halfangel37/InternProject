<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-form
            ref="createEmployeeForm"
            v-model="formValidity"
            @submit.prevent="onSubmit()"
            lazy-validation
          >
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

            <v-btn
              outlined
              color="#72418b"
              x-large
              @click="cancelCreateEmployee()"
              class="mr-5"
              >CANCEL</v-btn
            >

            <v-btn
              color="#72418b"
              dark
              x-large
              type="submit"
              @click="validate()"
              >CREATE</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import validators from "@/shared/form-validators";
import { ENABLE_STATUS, DISABLE_STATUS } from "@/shared/variables/index";
export default {
  data() {
    return {
      calendarOpen: false,
      employeeInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        birthDate: "",
        status: DISABLE_STATUS,
      },
      ENABLED_STATUS: ENABLE_STATUS,
      DISABLED_STATUS: DISABLE_STATUS,
      formValidity: false,
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
  methods: {
    onSubmit() {
      if (this.$refs.createEmployeeForm.validate()) {
        this.$emit("submit", this.employeeInfo);
      }
    },

    validate() {
      this.$refs.createEmployeeForm.validate();
    },

    cancelCreateEmployee() {
      this.$router.push({
        path: `/companies/${this.$route.params.companyId}/employees`,
      });
    },
  },
};
</script>

<style></style>
