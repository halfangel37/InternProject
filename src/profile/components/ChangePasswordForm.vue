<template>
  <v-form class="form" @submit.prevent="onSubmit" ref="changePasswordForm">
    <h3>Contact Info</h3>

    <v-text-field
      v-model="oldPassword"
      label="Current Password"
      :type="showCurrentPassword ? 'text' : 'password'"
      outlined
      dense
      :rules="passwordRules"
      :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showCurrentPassword = !showCurrentPassword"
      validate-on-blur
    />
    <v-text-field
      v-model="newPassword"
      label="New Password"
      :type="showNewPassword ? 'text' : 'password'"
      outlined
      dense
      :rules="newPasswordRules"
      :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showNewPassword = !showNewPassword"
      validate-on-blur
    />
    <v-text-field
      label="Repeat New Password"
      :type="showRepeatPassword ? 'text' : 'password'"
      outlined
      dense
      v-model="confirmPassword"
      :rules="passwordAgainRules"
      :append-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showRepeatPassword = !showRepeatPassword"
      validate-on-blur
    />

    <v-btn
      :disabled="isButtonDisabled"
      class="submit-btn"
      block
      color="#4f2566"
      type="submit"
      ><span
        >CHANGE PASSWORD
        <v-progress-circular
          :size="20"
          width="3"
          color="white"
          indeterminate
          v-if="isButtonDisabled"
        ></v-progress-circular></span
    ></v-btn>
  </v-form>
</template>

<script>
import validators from "@/shared/form-validators";
export default {
  props: {
    isButtonDisabled: Boolean,
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: null,
      showCurrentPassword: false,
      showNewPassword: false,
      showRepeatPassword: false,
      passwordRules: [
        validators.required("Password is required"),
        validators.min("Min 6 characters", 6),
      ],
      newPasswordRules: [
        validators.required("Password is required"),
        validators.min("Min 6 characters", 6),
        validators.mustNotMatch(
          "New password and existing password should not be the same!",
          () => this.oldPassword
        ),
      ],
      passwordAgainRules: [
        validators.required("Password is required"),
        validators.min("Min 6 characters", 6),
        validators.mustMatch(
          "Verifiability password and newpassword should be the same!",
          () => this.newPassword
        ),
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.changePasswordForm.validate()) {
        this.$emit("change-password", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        });
      }
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
.submit-btn {
  width: 11rem;
}
</style>
