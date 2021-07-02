<template>
  <div class="bg-main d-flex align-item-center j-center">
    <v-col class="mx-auto">
      <ForgotPasswordForm
        @submit="onSubmit"
        :isButtonDisabled="isButtonDisabled"
        :errorMessage="errorMessageGetter"
        :isSuccess="isSuccessGetter"
      />
    </v-col>
  </div>
</template>

<script>
import ForgotPasswordForm from "@/forgotPassword/components/ForgotPasswordForm.vue";
import { mapGetters } from "vuex";
import "@/shared/style/style.css";
export default {
  components: { ForgotPasswordForm },
  data() {
    return {
      isButtonDisabled: false,
    };
  },
  methods: {
    onSubmit(email) {
      this.isButtonDisabled = true;
      this.$store
        .dispatch("forgotPassword/forgotPassword", { email })
        .then(() => {
          this.isButtonDisabled = false;
        });
    },
  },
  computed: {
    ...mapGetters({
      errorMessageGetter: "forgotPassword/errorMessageGetter",
      isSuccessGetter: "forgotPassword/isSuccessGetter",
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
