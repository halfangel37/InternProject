<template>
  <v-form @submit.prevent="onSubmit" ref="createProductForm" class="form">
    <v-text-field
      v-model="product.imageUrl"
      label="Product Image"
      outlined
      dense
      :rules="imageRules"
      validate-on-blur
    />
    <v-switch
      v-model="product.status"
      flat
      color="success"
      true-value="Enabled"
      false-value="Disabled"
      :label="`${product.status.toString()}`"
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
    <v-btn class="add" @click="addPrice" block rounded color="#F2B334" dark>
      +ADD
    </v-btn>
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
          v-model="product.productPrices[index].price"
          label="Product Price"
          :rules="priceRules"
          outlined
          dense
          validate-on-blur
        />
      </v-col>

      <v-col class="column" cols="2">
        <v-btn @click="removePrice(index)" block rounded color="#F2B334" dark>
          REMOVE
        </v-btn>
      </v-col>
    </v-row>
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
    <v-btn @click="cancelCreate" class="cancel-btn" block>
      <span>Cancel</span></v-btn
    >
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
      nameRules: [validators.required("Product name is required")],
      typeRules: [validators.required("Product type is required")],
      priceRules: [validators.required("Product price is required")],
      imageRules: [validators.mustBeImage("The url is invalid")],

      currencyRules: [
        validators.mustNotExistTwice(
          "Different currency should not be the same!",
          () => this.currenciesArray
        ),
        validators.required("Currency is required"),
      ],

      productType: ["Item", "Service"],
      product: {
        productType: "",
        name: "",
        status: "Disabled",
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
        this.$emit("create-product", this.product);
      }
    },
    cancelCreate() {
      this.$router.push({
        path: `/companies/${this.$route.params.companyId}/products `,
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
  beforeUpdate() {},
  computed: {
    currencies() {
      return currencyCodes.map((item) => item.cc);
    },
    currenciesArray() {
      const mapCurrencies = this.product.productPrices.map(
        (item) => item.currency
      );
      return mapCurrencies;
    },
  },
};
</script>

<style lang="scss" scoped>
.submit-btn {
  float: right;
  width: 91px;
}
.submit-btn span {
  color: white;
}

.form {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 1rem 2rem 3.5rem 2rem;
}
.cancel-btn {
  float: right;
  margin-right: 1.5rem;
}
.cancel-btn span {
  color: #4f2566;
}
.add {
  margin-bottom: 2rem;
}
.column {
  padding: 0.5rem;
  max-height: 4rem;
}
.row {
  margin-bottom: 2rem;
}
</style>
