import Vue from "vue";
import VueRouter from "vue-router";
import Catalog from "../components/catalog/Catalog.vue";
import Cart from "../components/cart/Cart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Catalog",
    component: Catalog
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    props: true
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () =>
  //     import("../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
