<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="products"
      class="mt-10 row-pointer"
      item-key="productNumber"
      disable-pagination
      hide-default-footer
      :search="search"
      dense
      @click:row="navigateProduct"
      show-select
      sort-by="productPrices"
    >
      <template v-slot:[`item.productNumber`]="{ item }"
        ><td>{{ item.productNumber }}</td>
      </template>
      <template v-slot:[`item.name`]="{ item }"
        ><td class="height-40 white-space-nowrap overflow-hidden">
          {{ item.name }}
        </td>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <td class="d-flex">
          <v-switch
            v-model="item.status"
            :label="item.status | status"
            :true-value="ENABLE_STATUS"
            :false-value="DISABLE_STATUS"
            @click.capture.native.stop="confirmChangeStatus(item)"
            readonly
          >
          </v-switch>
        </td>
      </template>
      <template v-slot:[`item.productPrices`]="{ item }">
        <td class="d-flex j-content-space-between">
          <div v-if="item.productPrices.length > 0">
            <span class="w-100per t-align-right mr-1"
              ><b>{{ item.productPrices[0].price | number }}</b></span
            >
            <span>{{ item.productPrices[0].currency | upperCase }}</span>
          </div>
          <div v-else>0.0</div>
        </td>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="confirmChangeStatus(item)">
              {{ item.status === ENABLE_STATUS ? "Disable" : "Enable" }}
            </v-list-item>
            <v-list-item @click="confirmDeleteProduct(item)">
              Delete
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <ConfirmDialog
      :title="dialogTitle"
      :content="dialogContent"
      :isDialog="isDialog"
      @on-close="isDialog = false"
      :btnAccept="'OK'"
      :btnNotAccept="'Cancel'"
      @on-confirm="
        actionType === 'changeStatus' ? changeStatus() : deleteProduct()
      "
    ></ConfirmDialog>
  </div>
</template>

<script>
import ConfirmDialog from "@/components/dialogs/views/ConfirmDialog.vue";
import "@/shared/style/style.css";
import "@/shared/style/style.scss";
import { ENABLE_STATUS, DISABLE_STATUS } from "@/shared/variables/index";
export default {
  components: {
    ConfirmDialog,
  },
  props: {
    products: [],
    search: String,
  },
  data() {
    return {
      headers: [
        {
          text: "PRODUCT NUMBER",
          align: "start",
          sortable: true,
          value: "productNumber",
          width: "16%",
        },
        { text: "NAME", value: "name", sortable: true },
        { text: "STATUS", value: "status", sortable: true, width: "15%" },
        {
          text: "PRICE",
          value: "productPrices",
          sortable: true,
          width: "20%",
        },
        { text: "", value: "actions", sortable: false, width: "5%" },
      ],
      selectedProduct: undefined,
      isDialog: false,
      dialogTitle: "",
      dialogContent: "",
      ENABLE_STATUS: ENABLE_STATUS,
      DISABLE_STATUS: DISABLE_STATUS,
    };
  },
  methods: {
    confirmChangeStatus(product) {
      const actionTypeName =
        product.status === ENABLE_STATUS ? "disable" : "enable";
      this.actionType = "changeStatus";
      this.selectedProduct = product;
      this.isDialog = true;
      this.dialogTitle = `Confirm ${actionTypeName} selected product!`;
      this.dialogContent = `Are you sure you want to ${actionTypeName} selected product!`;
    },
    changeStatus() {
      this.$emit("changeStatus", {
        productId: this.selectedProduct.id,
        productStatus: this.selectedProduct.status,
      });
    },
    confirmDeleteProduct(product) {
      this.selectedProduct = product;
      this.actionType = "deleteProduct";
      this.dialogTitle = "Confirm delete selected product!";
      this.dialogContent = "Are you sure you want to delete selected product!";
      this.isDialog = true;
    },
    deleteProduct() {
      this.$emit("deleteProduct", {
        productId: this.selectedProduct.id,
      });
    },
    navigateProduct(product) {
      this.$emit("navigateProduct", product);
    },
    onClose() {
      this.isDialog = false;
    },
  },
};
</script>

<style lang="scss">
</style>
