<template>
  <PageContainer>
    <template #page-title> Update Product </template>
    <template #page-content>
      <v-container class="form-container">
        <v-row>
          <v-col cols="12" sm="10" md="10" lg="10">
            <UpdateProductForm
              v-show="product"
              :isPending="isPending"
              :product="product"
              :user="user"
              @update-product="updateProduct"
              @update-product-image="updateProductImage"
            />
            <p v-show="!product" class="mt-10 box">Product is not found</p>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </PageContainer>
</template>

<script>
import UpdateProductForm from "../components/UpdateProductForm.vue";
import "@/shared/style/style.css";
import { mapGetters } from "vuex";
export default {
  components: { UpdateProductForm },
  data: () => ({
    isPending: false,
  }),
  created() {
    this.$store.dispatch("products/getProductById", {
      companyId: this.$route.params.companyId,
      productId: this.$route.params.productId,
    });
  },
  methods: {
    updateProduct(product) {
      this.isPending = true;
      this.$store
        .dispatch("products/updateProduct", {
          companyId: this.$route.params.companyId,
          productId: this.$route.params.productId,
          product,
        })
        .then(() => {
          this.isPending = false;
        });
    },
    updateProductImage(file) {
      this.$store.dispatch("products/updateProductImage", {
        companyId: this.$route.params.companyId,
        productId: this.$route.params.productId,
        file,
      });
    },
  },

 beforeDestroy() {
    this.$store.dispatch("products/clearStates");
  },
  computed: {
    ...mapGetters({
      product: "products/selectSeletedProduct",
      user: "profile/userGetter",
    }),
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  padding: 0;
}
.box {
  width: 1000px;
  background: #fdf4e3;
  padding: 10px;
}
</style>
