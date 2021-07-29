<template>
  <v-main>
    <h1>Update Company</h1>
    <v-container class="form-container">
      <v-row>
        <v-col cols="12" sm="10" md="10" lg="10">
          <UpdateCompanyForm
            :isPending="isPending"
            :company="company"
            @update-company="updateCompany"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import UpdateCompanyForm from "../../companySettings/components/UpdateCompanyForm.vue";
import { mapGetters } from "vuex";
export default {
  components: { UpdateCompanyForm },
  data: () => ({
    isPending: false,
  }),
  created() {
    this.$store.dispatch("companies/getCompanyId",
      this.$route.params.companyId
    )
  },
  methods: {
    updateCompany(company) {
      this.isPending = true;
      this.$store
        .dispatch("companies/updateCompany", {
          companyId: this.$route.params.companyId,
          company,
        })
        .then(() => {
          this.isPending = false;
          });
    },
  },
  computed: {
    ...mapGetters({
      company: "companies/selectCompanyUpdate",
      user: "profile/userGetter",
    }),
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: #4f2566;
  margin-bottom: 3rem;
}
.form-container {
  padding: 0;
}
</style>
