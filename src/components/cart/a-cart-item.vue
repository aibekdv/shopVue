<template>
  <div class="cart-item">
    <img :src="require('../../assets/img/' + cart_item_data.image)" alt="" />
    <div class="cart-item__info">
      <p>{{ cart_item_data.name }}</p>
      <p>{{ cart_item_data.price | toFix | formatPrice }}</p>
      <p>{{ cart_item_data.article }}</p>
    </div>
    <div class="cart-item__quanity">
      <p>Кол-во:</p>
      <span class="cart-item__crement">
        <span @click="decrementItem" class="crement">-</span>
        {{ cart_item_data.quantity }}
        <span @click="incrementItem" class="crement">+</span>
      </span>
    </div>
    <button @click="deleteFromCart" class="btn">Удалить</button>
  </div>
</template>

<script>
import toFix from "../../fixeds/toFix";
import formatPrice from "../../fixeds/format-price";
export default {
  name: "aCartItem",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.$set(this.cart_item_data, "quantity", 1);
  },
  methods: {
    deleteFromCart() {
      this.$emit("deleteFromCart");
    },
    incrementItem() {
      this.$emit("increment");
    },
    decrementItem() {
      this.$emit("decrement");
    }
  },
  filters: {
    toFix,
    formatPrice
  }
};
</script>

<style lang="scss">
.cart-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 #c9c9c9e0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;
  &__crement {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .crement {
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
