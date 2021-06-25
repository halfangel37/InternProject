<template>
  <div class="bg-main changhe d-flex align-item-center j-center">
    <v-col class="mx-auto">
      <SignForm
        @submit="signin"
        v-bind:isButtonDisabled="isButtonDisabled"
        v-bind:errorMessage="errorMessage"
      />
    </v-col>
  </div>
</template>

<script>
import SignForm from "@/signin/components/SigninForm.vue";
import NProgress from "nprogress";
export default {
  components: { SignForm },
  name: "Signin",
  data() {
    return {
      isButtonDisabled: false,
      errorMessage: "",
    };
  },
  computed: {
    test() {
      const test = localStorage.getState().token;
      console.log(test);
      return test;
    },
  },
  methods: {
    signin(infor) {
      this.isButtonDisabled = true;
      NProgress.start();
      this.$store
        .dispatch("signin/signinAccount", {
          username: infor.email,
          password: infor.password,
        })
        .then(() => {
          this.$router.push({ path: "/companies" });
          NProgress.done();
        })
        .catch((err) => {
          this.error = err.response.data.error;
          this.errorMessage = "Account was wrong!";
          NProgress.done();
          this.isButtonDisabled = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.d-flex {
  display: flex;
}
.align-item-center {
  align-items: center;
}
.j-center {
  justify-content: center;
}
.v-main__.v-application--wrap v-application--wrap {
  min-height: none !important;
  max-width: none !important;
}
.bg-main {
  background: #4f2566;
}
.mt-90 {
  margin-top: 130px;
}
.position-relative {
  position: relative;
}
.d-flex {
  display: flex;
}
.align-item-center {
  align-items: center;
}
.o-flow-hiden {
  overflow: hidden;
}
</style>
