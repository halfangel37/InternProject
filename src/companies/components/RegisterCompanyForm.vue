<template>
  <div>
    <v-form ref="createCompanyForm" v-model="formValidity" lazy-validation>
      <v-card>
        <v-card-title> </v-card-title>

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
      </v-card>

      <v-btn color="#72418b" dark @click="onSubmit()" x-large>CREATE</v-btn>
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
      nameRules: [validators.required("Name company is required")],
      websiteRules: [
        validators.required("Website company is required"),
        validators.space("No spaces allowed"),
      ],
      phoneNumberRules: [
        validators.maxLength(
          "Phone number must be less than 11 characters",
          10
        ),
      ],
      addressRules: [validators.required("Address company is required")],
      currencyRules: [validators.required("Currency is required")],
    };
  },
  methods: {
    onSubmit() {
      this.$emit("register-company", this.companyInfo);
    },
    validate() {
      this.$refs.createCompanyForm.validate();
    },
  },
  computed: {
    currencies() {
      return currencyCodes.map((item) => item.cc);
    },
  },
};
</script>

<style></style>
