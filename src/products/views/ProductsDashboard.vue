<template>
  <div>
    <h1 class="title fs-40">Products</h1>
    <div class="d-flex h-40 j-content-space-between mt-40 header">
      <CreateButton @onCreate="onCreate"/>
      <div class="w-200">
        <v-select
          dense
          :items="status"
          :value="currentStatus"
          v-on:change="filterStatus"
          label="Select"
          solo
          :append-icon="'mdi-chevron-down'"
        ></v-select>
      </div>
      <span class="d-flex a-items-center mr-5"
        ><v-icon class="color-light-orange">{{ settingIcon }}</v-icon></span
      >
      <div class="d-flex">
        <span class="d-flex a-items-center mr-5">Rows per page:</span>
        <div class="w-100">
          <v-select
            dense
            :items="rowsPerPage"
            :value="currentRowsPerPage"
            label="Select"
            solo
            v-on:change="changeRow"
            :append-icon="'mdi-chevron-down'"
          ></v-select>
        </div>
      </div>
      <div>
        <v-text-field
          dense
          outlined
          label="Search"
          v-model="search"
          :append-icon="searchIcon"
        >
        </v-text-field>
      </div>
    </div>
    <Products
      :products="productsDisplay"
      :search="search"
      @changeStatus="changeStatus"
      @navigateProduct="navigateProduct"
      @deleteProduct="deleteProduct"
    />
    <div class="mt-5">
      <v-pagination
        circle
        @input="next"
        previous="prePage"
        :total-visible="5"
        v-model="currentPage"
        :length="totalPages"
        v-if="totalPages > 1"
      >
      </v-pagination>
    </div>
  </div>
</template>

<script>
import "@/shared/style/style.css";
import { mdiMagnify, mdiCogOutline } from "@mdi/js";
import { mapGetters } from "vuex";
import store from "@/store";
import Products from "@/products/components/Products.vue";
import CreateButton from '@/components/CreateButton.vue';
export default {
  components: { Products,CreateButton },
  props: {
    companyId: String,
  },
  data() {
    return {
      status: ["Show all", "Show enabled", "Show disabled"],
      rowsPerPage: [10, 20, 50, 100],
      currentRowsPerPage: 10,
      currentPage: 1,
      currentStatus: "Show all",
      showAll: true,
      statusProduct: 2,
      searchIcon: mdiMagnify,
      settingIcon: mdiCogOutline,
      search: "",
      ON_STATUS: 1,
      OFF_STATUS: 0,
    };
  },
  methods: {
    changeRow(rowsPerPage) {
      this.currentRowsPerPage = rowsPerPage;
      this.currentPage = 1;
      store.dispatch("products/getProducts", {
        pageNumber: this.currentPage,
        pageSize: this.currentRowsPerPage,
        id: this.companyId,
      });
    },
    next() {
      store.dispatch("products/getProducts", {
        pageNumber: this.currentPage,
        pageSize: this.currentRowsPerPage,
        id: this.companyId,
      });
    },
    filterStatus(status) {
      this.showAll = status === "Show all" ? true : false;
      this.statusProduct = status === "Show enabled" ? 1 : 0;
    },
    changeStatus({ productId, productStatus }) {
      const status =
        productStatus === this.ON_STATUS
          ? 0
          : productStatus === this.OFF_STATUS
          ? 1
          : !productStatus
          ? 0
          : 1;
      this.$store.dispatch("products/updateStatusProduct", {
        companyId: this.companyId,
        productId: productId,
        productStatus: status,
      });
    },
    deleteProduct({ productId }) {
      debugger;
      this.$store.dispatch("products/deleteProduct", {
        companyId: this.companyId,
        productId: productId,
      });
    },
    navigateProduct(product) {
      this.$router.push({
        path: `products/${product.id}`,
      });
    },
    onCreate() {
      this.$router.push({ name: "createProduct" });
    },
  },
  computed: {
    ...mapGetters({
      products: "products/selectAllProducts",
      totalPages: "products/selectTotalPage",
    }),
    productsDisplay: function () {
      if (this.showAll) {
        return this.products;
      }
      if (this.statusProduct === 0) {
        return this.products.filter((item) => item.status === 0);
      }
      return this.products.filter((item) => item.status == 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.color-light-orange {
  color: #df7f01;
}
.w-100 {
  width: 100px;
}
.max-width {
  max-width: 200px;
}
.fs-40 {
  font-size: 40px !important;
}
</style>
