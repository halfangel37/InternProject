<template>
  <v-form
    class="form"
    @submit.prevent="onSubmit"
    ref="changePasswordForm"
    v-model="formValidity"
  >
    <h3>Contact Info</h3>

    <v-text-field
      v-model="password.currentPassword"
      label="Current Password"
      :type="showCurrentPassword ? 'text' : 'password'"
      outlined
      dense
      :rules="passwordRules"
      :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showCurrentPassword = !showCurrentPassword"
    />
    <v-text-field
      v-model="password.newPassword"
      label="New Password"
      :type="showNewPassword ? 'text' : 'password'"
      outlined
      dense
      :rules="passwordRules"
      :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showNewPassword = !showNewPassword"
    />
    <v-text-field
      label="Repeat New Password"
      :type="showRepeatPassword ? 'text' : 'password'"
      outlined
      dense
      v-model="confirmPassword"
      :rules="[
        password.newPassword === confirmPassword || 'Password must match',
      ]"
      :append-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showRepeatPassword = !showRepeatPassword"
    />

    <v-btn
      :disabled="!formValidity || errorMessage === null"
      class="submit-btn"
      block
      color="#4f2566"
      type="submit"
      v-on:click="validateForm"
      ><span
        >CHANGE PASSWORD
        <v-progress-circular
          :size="20"
          width="3"
          color="white"
          indeterminate
          v-if="errorMessage === null"
        ></v-progress-circular></span
    ></v-btn>
  </v-form>
</template>

<script>
import validators from "@/shared/form-validators";
export default {
  props: ["errorMessage"],
  data: () => ({
    password: {
      currentPassword: "",
      newPassword: "",
    },
    formValidity: false,
    confirmPassword: null,
    showCurrentPassword: false,
    showNewPassword: false,
    showRepeatPassword: false,
    passwordRules: [
      validators.required("Password is required"),
      validators.min("Min 6 characters", 6),
    ],
  }),
  methods: {
    validateForm() {
      this.$refs.changePasswordForm.validate();
    },
    onSubmit() {
      this.$emit("change-password", this.password);
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  color: #ffff;
}
h3 {
  color: #3e4c59;
  margin-bottom: 1.5rem;
}
.form {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 1.5rem;
}
</style>
