<template>
  <v-row class="form-container">
    <v-col cols="12" sm="12" md="6" lg="6">
      <v-form @submit.prevent="onSubmit" ref="createBankAccountForm">
        <div class="form">
          <v-switch
            v-model="bankAccountValue.status"
            flat
            color="success"
            :true-value="0"
            :false-value="1"
            :label="`${bankAccountStatusConvert}`"
          ></v-switch>

          <v-text-field
            v-model="bankAccountValue.name"
            label="Account name"
            :rules="nameRules"
            outlined
            dense
            validate-on-blur
          />

          <v-text-field
            v-model="bankAccountValue.accountNumber"
            label="Account number"
            :rules="numberRules"
            outlined
            dense
            validate-on-blur
            type="number"
            :disabled="selectedBankAccount ? true : false"
          />

          <v-select
            outlined
            dense
            v-model="defaultSelected"
            :items="accountTypes"
            label="Account type"
            :rules="typeRules"
            validate-on-blur
          ></v-select>
        </div>
        <v-row class="btn-row">
          <v-col class="column" cols="6">
            <v-btn @click="cancelCreate" class="cancel-btn" block>
              <span>Cancel</span></v-btn
            >
          </v-col>
          <v-col class="column" cols="6">
            <v-btn
              type="submit"
              class="submit-btn"
              block
              color="#4f2566"
              :disabled="isPending"
            >
              <span v-if="!isPending && !selectedBankAccount">CREATE</span>
              <span v-if="!isPending && selectedBankAccount">Update</span>
              <span v-if="isPending">
                <v-progress-circular
                  :size="20"
                  width="3"
                  color="white"
                  indeterminate
                ></v-progress-circular>
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import validators from "@/shared/form-validators";
export default {
  components: {},
  props: { selectedBankAccount: Object, isPending: Boolean },
  data() {
    return {
      nameRules: [validators.required("Account name is required")],
      typeRules: [validators.required("Account type is required")],
      numberRules: [validators.requiredPositiveNumber("Only number required")],
      defaultSelected: "BANK",
      accountTypes: ["BANK"],
      bankAccount: {
        name: "",
        accountNumber: undefined,
        status: 0,
      },
    };
  },
  methods: {
    onSubmit() {
      if (
        this.$refs.createBankAccountForm.validate() &&
        !this.selectedBankAccount
      ) {
        this.$emit("create-bank-account", this.bankAccountValue);
      } else {
        this.$emit("update-bank-account", this.bankAccountValue);
      }
    },
    cancelCreate() {
      this.$emit("cancel-bank-account");
    },
  },
  computed: {
    bankAccountValue() {
      if (this.selectedBankAccount) return this.selectedBankAccount;
      else return this.bankAccount;
    },
    bankAccountStatusConvert() {
      return this.bankAccountValue.status == 0 ? "Enabled" : "Disabled";
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
  padding: 2rem;
  margin-bottom: 2rem;
}
.cancel-btn span {
  color: #4f2566;
}
.column {
  max-height: 4rem;
}
.form-container {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
}
</style>
