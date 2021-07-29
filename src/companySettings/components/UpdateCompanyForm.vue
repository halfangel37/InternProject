<template>
  <v-form @submit.prevent="onSubmit" ref="updateCompanyForm" class="form">
    <v-text-field
      v-model="companyCopy.name"
      label="Name"
      :rules="nameRules"
      outlined
      dense
      validate-on-blur
    />
	<v-text-field
      v-model="companyCopy.phoneNumber"
      label="Phone Number"
      :rules="phoneNumberRules"
      outlined
      dense
      validate-on-blur
    />
    <v-text-field
      v-model="companyCopy.website"
      label="Website"
      :rules="websiteRules"
      outlined
      dense
      validate-on-blur
    />
	<v-text-field
      v-model="companyCopy.address"
      label="Address"
      :rules="addressRules"
      outlined
      dense
      validate-on-blur
    />

     <v-select
          v-model="companyCopy.currency"
          :items="currencies"
          label="Currency"
          :rules="currencyRules"
          dense
          outlined
        ></v-select>
    <v-row class="btn-row">
      <v-col class="column" cols="6">
        <v-btn
          type="submit"
          class="submit-btn"
          block
          color="#4f2566"
          :disabled="isPending"
        >
          <span  v-if="!isPending">Update</span>
          <span  v-else>
            <v-progress-circular
              :size="20"
              width="3"
              color="white"
              indeterminate
            ></v-progress-circular
          ></span>
        </v-btn>
      </v-col>
      <v-col class="column" cols="6">
        <v-btn @click="cancelUpdate" class="cancel-btn" block>
          <span>Cancel</span></v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import validators from "@/shared/form-validators";
import { currencyCodes } from "../../companies/currency";
import _ from "lodash";
export default {
  props: {
    company: Object,
    isPending: Boolean,
  },
  data() {
    return {
     companyCopy:"",
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

  watch: {
    company() {
      this.companyCopy = _.cloneDeep(this.company);
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.updateCompanyForm.validate()) {
        this.$emit("update-company", this.companyCopy);
      }
    },
    cancelUpdate() {
      this.$router.push({
        path: `/companies`,
      });
    },
  },

  computed: {
    currencies() {
      return currencyCodes.map((item) => item.cc);
    },
   },
};
</script>

<style lang="scss" scoped>
.btn-row {
  float: right;
}
.submit-btn span {
  color: white;
}

.form {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 1rem 2rem 3.5rem 2rem;
}

.cancel-btn span {
  color: #4f2566;
}
.add {
  margin-top: -0.5rem;
}
.column {
  max-height: 4rem;
}
.row {
  margin-bottom: 0.5rem;
}
.avatar {
  width: 8rem;
  height: 8rem;
  background: #f5f5f5;
  border-radius: 4px;
}
.file-input {
  margin-left: 3.3rem;
}
</style>
