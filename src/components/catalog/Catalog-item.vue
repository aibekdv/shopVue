<template>
  <div class="catalog-item">
    <img :src="require('../../assets/img/' + product_data.image)" alt="" />
    <p class="catalog_item_name">{{ product_data.name }}</p>
    <p class="catalog_item_price">
      Цена: {{ product_data.price | toFix | formatPrice }}
    </p>
    <v-popup
      v-if="isPopupVisible"
      @closePopup="closeInfoPopup"
      rightBtnTitle="В корзину"
      :popupTitle="product_data.name"
      @rightBtnAction="addToCart"
    >
      <img :src="require('../../assets/img/' + product_data.image)" alt="" />
      <div>
        <p class="catalog_item_name">{{ product_data.name }}</p>
        <p class="catalog_item_price">
          Цена: {{ product_data.price | toFix | formatPrice }}
        </p>
      </div>
    </v-popup>
    <button class="catalog-item__showInfo btn" @click="showPopupInfo">
      Инфо..
    </button>

    <button class="catalog_item_add_to_cart btn" @click="addToCart">
      В корзину
    </button>
  </div>
</template>

<script>
import vPopup from "./../popup/v-popup.vue";
import toFix from "./../../fixeds/toFix";
import formatPrice from "./../../fixeds/format-price";
export default {
  name: "CatalogItem",
  props: {
    product_data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isPopupVisible: false
    };
  },
  filters: {
    toFix,
    formatPrice
  },
  components: {
    vPopup
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product_data);
    },
    showPopupInfo() {
      this.isPopupVisible = true;
    },
    closeInfoPopup() {
      this.isPopupVisible = false;
    }
  }
};
</script>

<style lang="scss">
.catalog-item {
  flex-basis: 25%;
  box-shadow: 0 0 8px 0 #c9c9c9e0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;
  &__showInfo {
    background-color: rgb(235, 118, 118) !important;
    margin: 0px 10px 0px 0px;
    &:hover {
      background-color: rgb(245, 43, 43) !important;
    }
  }
}
</style>
