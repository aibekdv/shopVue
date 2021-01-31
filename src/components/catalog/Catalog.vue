<template>
  <div class="catalog">
    <router-link :to="{ name: 'cart', params: { cart_data: CART } }">
      <div class="catalog__link_to_cart">Корзина: {{ CART.length }}</div>
    </router-link>
    <h1>Каталог товаров</h1>
    <div class="filters">
      <v-select
        class="select"
        :selected="selected"
        :options="categories"
        @select="sortByCategories"
      />
      <div class="range-slider">
        <input
          type="range"
          min="3000"
          max="40000"
          step="10"
          v-model.number="minPrice"
          @change="setRangeslider"
        />
        <input
          type="range"
          min="3000"
          max="40000"
          step="10"
          v-model.number="maxPrice"
          @change="setRangeslider"
        />
      </div>
      <div class="price-values">
        <p>Min: {{ minPrice }}</p>
        <p>Max: {{ maxPrice }}</p>
      </div>
    </div>

    <div class="catalog__list">
      <catalog-item
        v-for="product in filteredProducts"
        :key="product.article"
        :product_data="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import CatalogItem from "./Catalog-item.vue";
import { mapActions, mapGetters } from "vuex";
import vSelect from "./../vSelect.vue";
export default {
  name: "Catalog",
  data() {
    return {
      categories: [
        { name: "Все", value: "all" },
        { name: "Samsung", value: "s" },
        { name: "Honor", value: "h" }
      ],
      selected: "Все",
      sortedProducts: [],
      minPrice: 3000,
      maxPrice: 40000
    };
  },

  components: {
    catalogItem: CatalogItem,
    vSelect
  },

  computed: {
    ...mapGetters(["PRODUCTS", "CART"]),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts;
      } else {
        return this.PRODUCTS;
      }
    }
  },

  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART"]),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },
    sortByCategories(category) {
      let vm = this;
      this.sortedProducts = [...this.PRODUCTS];
      this.sortedProducts = this.sortedProducts.filter(function(item) {
        return item.price >= vm.minPrice && item.price <= vm.maxPrice;
      });
      if (category) {
        this.sortedProducts = this.sortedProducts.filter(function(e) {
          vm.selected === category.name;
          return e.category === category.name;
        });
        this.selected = category.name;
      }
    },
    setRangeslider() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp;
      }
      this.sortByCategories();
    }
  },

  mounted() {
    this.GET_PRODUCTS_FROM_API().then(response => {
      if (response.data) {
        this.sortedProducts;
      }
    });
  }
};
</script>

<style lang="scss">
.catalog {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  &__link_to_cart {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: $padding * 2;
    background-color: $green_bg;
    box-shadow: 0 0 10px 0 #c9c8c8;
    color: white;
  }
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .select {
    margin-bottom: 10px;
  }
  .range-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
    font-family: Calibri;
  }
  .range-slider svg,
  .range-slider input[type="range"] {
    position: absolute;
    left: 0;
    bottom: 0;
    -webkit-appearance: none;
    border-radius: 2px;
    width: 160px;
    height: 4px;
    background-image: -webkit-linear-gradient(
      left,
      rgb(122, 122, 122) 0%,
      rgb(122, 122, 122) 50%,
      rgb(122, 122, 122) 50%,
      rgb(122, 122, 122) 100%
    );
    box-shadow: inset #ebb 0 0 5px;
    outline: none;
    transition: 1s;
  }
}
.range-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  background-color: $green_bg;
  border-radius: 50%;
  z-index: 2;
  position: relative;
  top: 2px;
  margin-top: -7px;
  cursor: pointer;
}
</style>
