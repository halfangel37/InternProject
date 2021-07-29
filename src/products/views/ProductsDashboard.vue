<template>
  <PageContainer>
    <template #page-title> Products </template>
    <template #page-content>
      <div>
        <div class="d-flex h-40 j-content-space-between header mt-40">
          <CreateButton @onCreate="onCreate" />
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

        <div class="d-flex justify-end mt-5">
          <div>
            <v-btn
              outlined
              color="#72418b"
              :loading="isSelecting"
              @click="openFolder"
              :disabled="isPending"
            >
              <span v-if="!isPending">IMPORT</span>
              <span v-else>
                <v-progress-circular
                  :size="20"
                  width="3"
                  color="purple"
                  indeterminate
                ></v-progress-circular
              ></span>
            </v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              @change="importFile"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </div>
          <v-btn color="#72418b" dark class="ml-2" depressed @click="exportFile"
            >Export</v-btn
          >
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
  </PageContainer>
</template>

<script>
import "@/shared/style/style.css";
import { mdiMagnify, mdiCogOutline } from "@mdi/js";
import { mapGetters } from "vuex";
import store from "@/store";
import Products from "@/products/components/Products.vue";
import PageContainer from "@/components/PageContainer.vue";
import CreateButton from "@/components/CreateButton.vue";
import { ENABLE_STATUS, DISABLE_STATUS } from "@/shared/variables/index";
export default {
  components: {
    Products,
    CreateButton,
    PageContainer,
  },
  props: {
    companyId: String,
  },
  data() {
    return {
      isPending: false,
      isSelecting: false,
      selectedFileProduct: null,
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
    };
  },

  methods: {
    changeRow(rowsPerPage) {
      this.currentRowsPerPage = rowsPerPage;
      this.currentPage = 1;
      store.dispatch("products/setPagination", {
        pageSize: this.currentRowsPerPage,
        pageNumber: 1,
      });
      store.dispatch("products/getProducts", {
        id: this.companyId,
      });
    },

    next() {
      store.dispatch("products/setPagination", {
        pageSize: this.currentRowsPerPage,
        pageNumber: this.currentPage,
      });
      store.dispatch("products/getProducts", {
        id: this.companyId,
      });
    },

    filterStatus(status) {
      this.showAll = status === "Show all" ? true : false;
      this.statusProduct =
        status === "Show enabled" ? ENABLE_STATUS : DISABLE_STATUS;
    },

    changeStatus({ productId, productStatus }) {
      const status =
        productStatus === ENABLE_STATUS ? DISABLE_STATUS : ENABLE_STATUS;
      this.$store.dispatch("products/updateStatusProduct", {
        companyId: this.companyId,
        productId: productId,
        productStatus: status,
      });
    },

    deleteProduct({ productId }) {
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

    importFile(e) {
      this.isPending = true;
      this.selectedFileProduct = e.target.files[0];
      this.$store.dispatch("products/importFileProduct", {
        companyId: this.companyId,
        fileProducts: this.selectedFileProduct,
      })
      .then(() => {
          this.isPending = false;
      });
    },

    exportFile() {
      this.$store.dispatch("products/exportFileProduct", {
        companyId: this.companyId,
      });
    },

    openFolder() {
      this.$refs.uploader.click();
    },
  },
  computed: {
    ...mapGetters({
      products: "products/selectAllProducts",
      totalPages: "products/selectTotalPages",
    }),
    productsDisplay: function () {
      if (this.showAll) {
        return this.products;
      }
      if (this.statusProduct === ENABLE_STATUS) {
        return this.products.filter((item) => item.status === ENABLE_STATUS);
      }
      return this.products.filter((item) => item.status == DISABLE_STATUS);
    },
  },

  beforeRouteLeave(routeTo, routeFrom, next) {
    this.$store.dispatch("products/clearStates").then(() => {
      next();
    });
  },
};
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100px;
}
.color-light-orange {
  color: #df7f01;
}
</style>
