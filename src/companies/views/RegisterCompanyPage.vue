<template>
  <v-container>
    <v-row justify="end" class="px-50">
      <v-col cols="12" md="12">
        <v-stepper v-model="nextStep">
          <v-stepper-header>
            <v-stepper-step :complete="nextStep > 1" step="1">
              New company
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="nextStep > 2" step="2">
              Add company information
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3"> Company created </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                class="mb-12"
                height="400px"
                width="800px"
                color="#f8f9fa"
              >
                <v-card-title class="fs-35 colorOrange mb-6">
                  Test Company
                </v-card-title>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-divider></v-divider>

                <v-card-text class="fs-20 mt-3 mb-15">
                  Do you want to test our services using a demo company? Use
                  this option do that. We will create a demo company for you
                  where you may try out our services without any effect on your
                  real company.
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    x-large
                    @click="nextStep = 2"
                    class="ma-2"
                    color="#f2b334"
                    outlined
                  >
                    REGISTER A TEST COMPANY
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-divider></v-divider>
            </v-stepper-content>

            <v-stepper-content step="2">
              <p class="fs-40 py-40">Register a test company</p>
              <p class="fs-20">
                Please fill out the below to set up your company profile.<br />
                The name and organization number will be auto-generated.
              </p>
              <RegisterCompanyForm @register-company="register" @prev-step="cancelCreateCompany"/>
            </v-stepper-content>

            <v-stepper-content step="3">
              <p class="fs-40 py-40">Company created successfully</p>
              <p class="mb-12 fs-20">
                discreet desk is registered successfully and ready to be used.
                Click here if you want to go to
                <a href="" style="text-decoration: none">discreet desk</a>
              </p>

              <v-btn
                color="#72418b"
                dark
                class="mr-5"
                x-large
                to="/companies"
              >
                COMPANY LIST
              </v-btn>
              <v-btn color="#f2b334" dark x-large @click="nextStep = 1">
                CREATE NEW COMPANY
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RegisterCompanyForm from "../components/RegisterCompanyForm.vue";
import "@/shared/style/style.css";
export default {
  data() {
    return {
      nextStep: 1,
    };
  },
  components: {
    RegisterCompanyForm,
  },
  methods: {
    register(value) {
      this.nextStep = 3;
      this.$store.dispatch("companies/registerCompany", value);
    },
    cancelCreateCompany() {
      this.nextStep = 1;
    }
  },
};
</script>

<style>
.colorOrange {
  color: #f2b334;
}
.backgroundContainer {
  background: chocolate;
}
</style>
