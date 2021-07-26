<template>
  <v-main>
    <h1>Update Product</h1>
    <v-container class="form-container">
      <v-row>
        <v-col cols="12" sm="10" md="10" lg="10">
          <UpdateProductForm
            :isPending="isPending"
            :product="product"
            :user="user"
            @update-product="updateProduct"
            @update-product-image="updateProductImage"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
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

  beforeRouteLeave(routeTo, routeFrom, next) {
    this.$store.dispatch("products/clearStates").then(() => {
      next();
    });
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
h1 {
  color: #4f2566;
  margin-bottom: 3rem;
}
.form-container {
  padding: 0;
}
</style>
