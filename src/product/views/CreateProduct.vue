<template>
  <v-main>
    <h1>Create Product</h1>
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
  </v-main>
</template>

<script>
import CreateProductForm from "../components/CreateProductForm.vue";
export default {
  components: { CreateProductForm },
  data: () => ({
    isPending: false,
  }),
  methods: {
    createProduct(product, file) {
      this.isPending = true;
      this.$store
        .dispatch("product/createProduct", {
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
h1 {
  color: #4f2566;
  margin-bottom: 3rem;
}
.form-container {
  padding: 0;
}
</style>
