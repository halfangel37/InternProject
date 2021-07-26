<template>
  <v-form @submit.prevent="onSubmit" ref="createProductForm" class="form">
    <v-col cols="12" sm="6" md="8" lg="8">
      <v-img class="avatar" :src="url"></v-img>
      <v-file-input
        @change="onFileChange"
        v-model="imageFile"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        dense
        hide-input
        validate-on-blur
        class="file-input"
      >
      </v-file-input>
    </v-col>
    <v-switch
      v-model="product.status"
      flat
      color="success"
      :true-value="0"
      :false-value="1"
      :label="`${productStatusConvert}`"
    ></v-switch>
    <v-text-field
      v-model="product.name"
      label="Product Name"
      :rules="nameRules"
      outlined
      dense
      validate-on-blur
    />
    <v-select
      v-model="product.productType"
      outlined
      dense
      :items="productType"
      label="Product type"
      :rules="typeRules"
      validate-on-blur
    ></v-select>

    <v-row
      class="row"
      v-for="(productPrices, index) in product.productPrices"
      :key="index"
    >
      <v-col class="column" cols="12" sm="4" md="5" lg="5">
        <v-select
          v-model="product.productPrices[index].currency"
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
          v-model.number="product.productPrices[index].price"
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
          <span v-if="!isPending">CREATE</span>
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
        <v-btn @click="cancelCreate" class="cancel-btn" block>
          <span>Cancel</span></v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import validators from "@/shared/form-validators";
import { currencyCodes } from "../../companies/currency.js";

export default {
  props: {
    isPending: Boolean,
  },
  data() {
    return {
      imageRules: [validators.mustBeImage("File must be an image")],
      nameRules: [validators.required("Product name is required")],
      typeRules: [validators.required("Product type is required")],
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
      url: null,
      productType: ["Item", "Service"],
      imageFile: null,
      product: {
        productType: "",
        name: "",
        status: 0,
        imageUrl: "",
        productPrices: [
          {
            currency: "",
            price: null,
          },
        ],
      },
    };
  },

  methods: {
    onSubmit() {
      if (this.$refs.createProductForm.validate()) {
        this.$emit("create-product", this.product, this.imageFile);
      }
    },
    onFileChange(e) {
      this.url = URL.createObjectURL(e);
    },
    cancelCreate() {
      this.$router.push({
        path: `/companies/${this.$route.params.companyId}/products`,
      });
    },
    addPrice() {
      this.product.productPrices.push({
        currency: "",
        price: null,
      });
    },
    removePrice(index) {
      this.product.productPrices.splice(index, 1);
    },
  },

  computed: {
    currencies() {
      return currencyCodes.map((item) => item.cc);
    },
    productCurrencies() {
      const mapCurrencies = this.product.productPrices.map(
        (item) => item.currency
      );
      return mapCurrencies;
    },
    productStatusConvert() {
      return this.product.status == 0 ? "Enabled" : "Disabled";
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
