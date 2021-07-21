<template>
  <v-form @submit.prevent="onSubmit" ref="updateProductForm" class="form">
    <v-col cols="12" sm="6" md="8" lg="8">
      <v-img
        class="avatar"
        :src="`
      ${imageUrl}${this.user.id}/companies/${this.$route.params.companyId}/products/${this.product.id}/${this.product.imageName}`"
      ></v-img>
      <v-file-input
        @change="onFileChange"
        v-model="imageFile"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        dense
        hide-input
        class="file-input"
      >
      </v-file-input>
    </v-col>
    <v-switch
      v-model="productCopy.status"
      color="success"
      :true-value="0"
      :false-value="1"
      :label="`${productStatusConvert}`"
    ></v-switch>
    <v-text-field
      v-model="productCopy.name"
      label="Product Name"
      :rules="nameRules"
      outlined
      dense
      validate-on-blur
    />

    <v-select
      v-model="productCopy.productType"
      outlined
      dense
      :items="productType"
      item-text="text"
      item-value="value"
      validate-on-blur
    ></v-select>

    <v-row
      class="row"
      v-for="(productPrices, index) in productCopy.productPrices"
      :key="index"
    >
      <v-col class="column" cols="12" sm="4" md="5" lg="5">
        <v-select
          v-model="productCopy.productPrices[index].currency"
          outlined
          dense
          :items="currencies"
          label="Currency"
          :rules="currencyRules"
          validate-on-blur
        ></v-select>
      </v-col>
      <v-col class="column" cols="12" sm="4" md="5" lg="5">
        <v-text-field
          v-model.number="productCopy.productPrices[index].price"
          label="Product Price"
          :rules="priceRules"
          outlined
          dense
          validate-on-blur
          type="number"
        />
      </v-col>

      <v-col class="column" cols="2">
        <v-btn @click="removePrice(index)" block rounded color="#F2B334" dark>
          REMOVE
        </v-btn>
      </v-col>
    </v-row>
    <v-col class="column" cols="2">
      <v-btn class="add" @click="addPrice" block rounded color="#F2B334" dark>
        +ADD CURRENCIES
      </v-btn>
    </v-col>
    <v-row class="btn-row">
      <v-col class="column" cols="6">
        <v-btn
          type="submit"
          class="submit-btn"
          block
          color="#4f2566"
          :disabled="isPending"
        >
          <span v-if="!isPending">Update</span>
          <span v-else>
            <v-progress-circular
              :size="20"
              width="3"
              color="white"
              indeterminate
            ></v-progress-circular
          ></span>
        </v-btn>
      </v-col>
      <v-col class="column" cols="6">
        <v-btn @click="cancelUpdate" class="cancel-btn" block>
          <span>Cancel</span></v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import validators from "@/shared/form-validators";
import { currencyCodes } from "../../companies/currency.js";
import { imageBaseUrl } from "@/config.js";
import _ from "lodash";
export default {
  props: {
    isPending: Boolean,
    product: Object,
    user: Object,
  },
  data() {
    return {
      productCopy: "",
      imageUrl: imageBaseUrl,
      imageFile: null,
      nameRules: [validators.required("Product name is required")],
      priceRules: [
        validators.requiredPositiveNumber("Product price must greater than 0"),
      ],
      currencyRules: [
        validators.mustNotExistTwice(
          "Different currency should not be the same!",
          () => this.productCurrencies
        ),
        validators.required("Currency is required"),
      ],
      productType: [
        { text: "Item", value: 0 },
        { text: "Service", value: 1 },
      ],
    };
  },

  watch: {
    product() {
      this.productCopy = _.cloneDeep(this.product);
    },
  },
  methods: {
    onFileChange() {
      this.$emit("update-product-image", this.imageFile);
    },
    onSubmit() {
      if (this.$refs.updateProductForm.validate()) {
        this.$emit("update-product", this.productCopy);
      }
    },
    cancelUpdate() {
      this.$router.push({
        path: `/companies/${this.$route.params.companyId}/products`,
      });
    },
    addPrice() {
      this.productCopy.productPrices.push({
        currency: "",
        price: null,
      });
    },
    removePrice(index) {
      this.productCopy.productPrices.splice(index, 1);
    },
  },

  computed: {
    currencies() {
      return currencyCodes.map((item) => item.cc);
    },
    productCurrencies() {
      const mapCurrencies = this.productCopy.productPrices.map(
        (item) => item.currency
      );
      return mapCurrencies;
    },
    productTypeConvert() {
      return this.productCopy.productType === 0 ? "Item" : "Service";
    },
    productStatusConvert() {
      return this.productCopy.status == 0 ? "Enabled" : "Disabled";
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-row {
  float: right;
}
.submit-btn span {
  color: white;
}

.form {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 1rem 2rem 3.5rem 2rem;
}

.cancel-btn span {
  color: #4f2566;
}
.add {
  margin-top: -0.5rem;
}
.column {
  max-height: 4rem;
}
.row {
  margin-bottom: 0.5rem;
}
.avatar {
  width: 8rem;
  height: 8rem;
  background: #f5f5f5;
  border-radius: 4px;
}
.file-input {
  margin-left: 3.3rem;
}
</style>
