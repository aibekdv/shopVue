<template>
  <div class="cart">
    <router-link :to="{ name: 'Catalog' }">
      <div class="catalog__link_to_cart">Вернуться</div>
    </router-link>
    <h1>Корзина</h1>
    <p v-if="!cart_data.length">Ничего не найдено</p>

    <app-cart-item
      v-for="(item, index) of cart_data"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />

    <div class="cart__total">
      <p class="total_name">Суммы:</p>
      <p>{{ cartTotalSum | toFix | formatPrice }}</p>
    </div>
  </div>
</template>

<script>
import aCartItem from "./a-cart-item";
import { mapActions } from "vuex";
import formatPrice from "../../fixeds/format-price";
import toFix from "../../fixeds/toFix";
export default {
  name: "Cart",
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  filters: {
    formatPrice,
    toFix
  },
  components: {
    appCartItem: aCartItem
  },
  methods: {
    ...mapActions([
      "DELETE_FROM_CART",
      "INCREMENT_CART_ITEM",
      "DECREMENT_CART_ITEM"
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
    increment(index) {
      this.INCREMENT_CART_ITEM(index);
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index);
    }
  },

  computed: {
    cartTotalSum() {
      let result = [];
      if (this.cart_data.length) {
        for (let item of this.cart_data) {
          result.push(item.price * item.quantity);
        }
        result = result.reduce(function(sum, el) {
          return sum + el;
        });
        return result;
      }
      return 0;
    }
  }
};
</script>

<style lang="scss">
.cart {
  margin-bottom: 73px;
  &__total {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $green_bg;
    color: white;
    font-size: 20px;
    padding: 5px 0;
  }
  .total_name {
    margin-right: 5px;
  }
}
</style>
