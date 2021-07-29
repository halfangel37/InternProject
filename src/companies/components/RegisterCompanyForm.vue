<template>
  <div>
    <v-form ref="createCompanyForm" v-model="formValidity" lazy-validation @submit.prevent="onSubmit()">
        <v-text-field
          v-model="companyInfo.name"
          :rules="nameRules"
          label="Name"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="companyInfo.phoneNumber"
          label="Phone number"
          type="phone"
          :rules="phoneNumberRules"
          required
          outlined
          validate-on-blur
        ></v-text-field>

        <v-text-field
          v-model="companyInfo.website"
          label="Website"
          :rules="websiteRules"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="companyInfo.address"
          label="Address"
          :rules="addressRules"
          required
          outlined
        ></v-text-field>

        <v-select
          v-model="companyInfo.currency"
          :items="currencies"
          label="Currency"
          :rules="currencyRules"
          dense
          outlined
        ></v-select>
 
      <v-btn color="#72418b" outlined @click="cancelCreateCompany()" class="mr-5" x-large>CANCEL</v-btn>
      <v-btn color="#72418b" dark @click="validate()" type="submit" x-large>CREATE</v-btn>
    </v-form>
  </div>
</template>

<script>
import { currencyCodes } from "../currency.js";
import validators from "@/shared/form-validators";
export default {
  data() {
    return {
      companyInfo: {
        name: "",
        phoneNumber: "",
        website: "",
        address: "",
        currency: "",
      },
      formValidity: false,
      nameRules: [validators.required("Company name is required")],
      websiteRules: [
        validators.required("Company website is required"),
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
      addressRules: [validators.required("Company address is required")],
      currencyRules: [validators.required("Currency is required")],
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.createCompanyForm.validate()) {
        this.$emit("register-company", this.companyInfo);
      }
    },
    validate() {
      this.$refs.createCompanyForm.validate();
    },
    cancelCreateCompany() {
      this.$emit("prev-step")
    }
  },
  computed: {
    currencies() {
      return currencyCodes.map((item) => item.cc);
    },
  },
};
</script>

<style></style>
