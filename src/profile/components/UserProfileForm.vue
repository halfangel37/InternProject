<template>
  <v-form
    v-if="profileCopy"
    @submit.prevent="onSubmit"
    ref="userProfileForm"
    class="form"
  >
    <v-col cols="12" sm="6" md="8" lg="8">
      <v-img
        class="avatar"
        :src="imageUrl + this.user.id + '/' + this.user.imageName"
      ></v-img>
      <v-file-input
        @change="onFileChange"
        v-model="imageFile"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        dense
        hide-input
        class="file-input"
      >
      </v-file-input>
    </v-col>

    <v-text-field
      label="First Name"
      outlined
      dense
      :rules="nameRules"
      v-model="profileCopy.firstName"
      validate-on-blur
    />
    <v-text-field
      label="Last Name"
      outlined
      dense
      :rules="nameRules"
      v-model="profileCopy.lastName"
      validate-on-blur
    />

    <v-btn
      type="submit"
      class="submit-btn"
      block
      color="#4f2566"
      :disabled="isButtonDisabled"
    >
      <span v-if="!isButtonDisabled">SAVE</span>
      <span v-else>
        <v-progress-circular
          :size="20"
          width="3"
          color="white"
          indeterminate
        ></v-progress-circular
      ></span>
    </v-btn>
  </v-form>
</template>

<script>
import validators from "@/shared/form-validators";
import { imageBaseUrl } from "@/config.js";
import _ from "lodash";
export default {
  props: {
    user: Object,
    isButtonDisabled: Boolean,
  },
  data() {
    return {
      profileCopy: undefined,
      imageUrl: imageBaseUrl,
      nameRules: [validators.required("Name is required")],
      imageFile: null,
    };
  },

  watch: {
    user() {
      this.profileCopy = _.cloneDeep(this.user);
    },
  },
  methods: {
    onFileChange() {
      const formData = new FormData();
      formData.append("File", this.imageFile);
      this.$emit("update-avatar", formData);
    },
    onSubmit() {
      if (this.$refs.userProfileForm.validate()) {
        this.$emit("update-profile", this.profileCopy);
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
}
.file-input {
  margin-left: 3.3rem;
}
span {
  color: #ffff;
}
.form {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 1.5rem;
}
.submit-btn {
  color: white;
}
</style>
