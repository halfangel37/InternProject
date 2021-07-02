<template>
  <div class="bg-main d-flex align-item-center j-center">
    <v-col class="mx-auto">
      <ResetPasswordForm
        @submit="onSubmit"
        :isButtonDisabled="isButtonDisabled"
        :errorMessage="errorMessageGetter"
        :isSuccess="isSuccessGetter"
      />
    </v-col>
  </div>
</template>

<script>
import ResetPasswordForm from "@/resetPassword/components/ResetPasswordForm.vue";
import { mapGetters } from "vuex";
import "@/shared/style/style.css";
export default {
  components: { ResetPasswordForm },
  props: {
    key: String,
  },
  data() {
    return {
      isButtonDisabled: false,
    };
  },
  methods: {
    onSubmit(newPassword) {
      this.isButtonDisabled = true;
      this.$store
        .dispatch("resetPassword/resetPassword", {
          newPassword: newPassword,
          key: this.key,
        })
        .then(() => {
          this.isButtonDisabled = false;
        });
    },
  },
  computed: {
    ...mapGetters({
      errorMessageGetter: "resetPassword/errorMessageGetter",
      isSuccessGetter: "resetPassword/isSuccessGetter",
    }),
  },
};
</script>

<style lang="scss" scoped>
.v-main__.v-application--wrap v-application--wrap {
  min-height: none !important;
  max-width: none !important;
}
@media screen and (min-width: 240px) {
  .bg-main {
    background: white;
  }
}
@media screen and (min-width: 414px) {
  .bg-main {
    background: #4f2566;
  }
}
</style>
