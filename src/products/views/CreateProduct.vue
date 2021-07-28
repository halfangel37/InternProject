<template>
  <PageContainer>
    <template #page-title> Create Product </template>
    <template #page-content>
      <v-container class="form-container">
        <v-row>
          <v-col cols="12" sm="10" md="10" lg="10">
            <CreateProductForm
              :isPending="isPending"
              @create-product="createProduct"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </PageContainer>
</template>

<script>
import CreateProductForm from "../components/CreateProductForm.vue";
import PageContainer from "@/components/PageContainer.vue";
export default {
  components: {
    CreateProductForm,
    PageContainer,
  },
  data: () => ({
    isPending: false,
  }),
  methods: {
    createProduct(product, file) {
      this.isPending = true;
      this.$store
        .dispatch("products/createProduct", {
          companyId: this.$route.params.companyId,
          product,
          file,
        })
        .then(() => {
          this.isPending = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>

.form-container {
  padding: 0;
}
</style>
