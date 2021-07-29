<template>
  <div>
    <v-form ref="creatingContact">
      <v-card class="mt-20">
        <v-card-title>Contact info </v-card-title>
        <v-card-text>
          <span class="fs_titlle"><b>Contact person name *</b></span>
          <v-row class="name">
            <v-col>
              <v-text-field
                :rules="nameRules"
                outlined
                dense
                validate-on-blur
                label="First name"
                v-model="contact.firstName"
              />
            </v-col>
            <v-col>
              <v-text-field
                :rules="nameRules"
                outlined
                dense
                validate-on-blur
                label="Last name"
                v-model="contact.lastName"
              />
            </v-col>
          </v-row>
          <v-row class="roles">
            <v-col>
              <span class="fs_titlle"><b>Role *</b></span>
              <v-select
                dense
                :items="roles"
                label="Select"
                v-model="selectedRole"
                item-value="val"
                :rules="roleRules"
                solo
                required
                :append-icon="'mdi-chevron-down'"
              >
                <template v-slot:selection="{ item }">
                  <v-chip text-color="white" :color="item.color">{{
                    item.name
                  }}</v-chip>
                </template>
                <template v-slot:item="{ item, on, attrs }">
                  <v-list-item v-on="on" v-bind="attrs">
                    <v-list-item-action>
                      {{ item.name }}
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
            <v-col class="d-flex a-items-center">
              <v-switch
                v-if="
                  selectedRole === SUPPLIER_TYPE || selectedRole === BOTH_TYPE
                "
                v-model="contact.supplierStatus"
                :label="'Supplier'"
                :true-value="ENABLE_STATUS"
                :false-value="DISABLE_STATUS"
                class="mr-10"
              >
              </v-switch>
              <v-switch
                v-if="
                  selectedRole === CUSTOMER_TYPE || selectedRole === BOTH_TYPE
                "
                v-model="contact.customerStatus"
                :label="'Customer'"
                :true-value="ENABLE_STATUS"
                :false-value="DISABLE_STATUS"
              >
              </v-switch>
            </v-col>
          </v-row>
          <v-row class="email">
            <v-col cols="6">
              <span class="fs_titlle"><b>Email *</b></span>
              <v-text-field
                :rules="emailRules"
                outlined
                dense
                validate-on-blur
                v-model="contact.email"
              />
            </v-col>
          </v-row>

          <v-row class="phone">
            <v-col cols="6">
              <span class="fs_titlle"><b>Phone number *</b></span>
              <v-text-field
                :rules="phoneNumberRules"
                outlined
                dense
                validate-on-blur
                v-model="contact.phoneNumber"
                class="fill-width"
              />
            </v-col>
            <v-col cols="6">
              <span class="fs_titlle"><b>Address *</b></span>
              <v-text-field
                :rules="addressRules"
                outlined
                dense
                validate-on-blur
                v-model="contact.address"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>

    <div class="d-flex j-content-flex-end mt-40 mb-40">
      <div>
        <v-btn outlined color="#72418b" class="mr-5" @click="onCancel"
          >CANCEL</v-btn
        >
        <v-btn
          :disabled="isButtonDisable"
          class="bg-purple"
          @click="onSubmit"
          ><span style="color:white" v-if="!isButtonDisable">{{ contact.id ? "UPDATE" : "CREATE" }}</span>
          <span v-else>REQUESTING</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import validators from "@/shared/form-validators";
import "@/shared/style/style.css/";
import {
  ENABLE_STATUS,
  DISABLE_STATUS,
  CUSTOMER_TYPE,
  SUPPLIER_TYPE,
  BOTH_TYPE,
} from "@/shared/variables";
export default {
  props: {
    contact: Object,
    isButtonDisable: Boolean,
  },
  data() {
    return {
      roles: [
        { name: "Customer", val: 0, color: "#95c9da" },
        { name: "Supplier", val: 1, color: "#95dacd" },
        { name: "Both", val: 2, color: "#f2b334" },
      ],
      selectedRole: null,
      roleRules: [validators.required("Role is required")],
      emailRules: [
        validators.required("Email is required"),
        validators.email("Email must be valid"),
        validators.space("No spaces allowed"),
      ],
      nameRules: [validators.required("Name is required")],
      typeRules: [validators.required("Contact type is required")],
      addressRules: [validators.required("Address is required")],
      phoneNumberRules: [
        validators.number("Phone number must be number!"),
        validators.required("Phone number is required"),
        validators.maxLength(
          "Phone number must be less than 11 characters",
          10
        ),
        validators.min("Phone number must be more than 9 characters", 10),
      ],
      ENABLE_STATUS: ENABLE_STATUS,
      DISABLE_STATUS: DISABLE_STATUS,
      CUSTOMER_TYPE: CUSTOMER_TYPE,
      SUPPLIER_TYPE: SUPPLIER_TYPE,
      BOTH_TYPE: BOTH_TYPE,
      countries: [
        { name: "Vietnam", value: "+84", color: "#f2b334" },
        { name: "English", value: "+965", color: "#f2b334" },
      ],
    };
  },
  methods: {
    onCancel() {
      this.$emit("on-cancel");
    },
    onSubmit() {
      if (this.$refs.creatingContact.validate()) {
        if (this.selectedRole === CUSTOMER_TYPE) {
          this.contact.contactType = CUSTOMER_TYPE;
          this.contact.supplierStatus = null;
        } else if (this.selectedRole === SUPPLIER_TYPE) {
          this.contact.contactType = SUPPLIER_TYPE;
          this.contact.customerStatus = null;
        } else {
          this.contact.contactType = BOTH_TYPE;
        }
        this.$emit("on-submit", this.contact);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 8rem;
  height: 8rem;
  background: #f5f5f5;
  border-radius: 4px;
  border: 2px dashed #d8d8d8;
}
.file-input {
  margin-left: 3.3rem;
}
.fs_titlle {
  font-size: 14px;
}
.w-110 {
  width: 110px;
}
.col {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.row {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.bg-purple{
  background-color: #72418b !important;
}
@media screen and (min-width: 768px) {
  .address,
  .name,
  .roles,
  .email,
  .phone {
    max-width: 600px;
  }
  .fs_titlle{
    font-size: 18px;
  }
}
</style>
