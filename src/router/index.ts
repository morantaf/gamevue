import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Homepage from "../views/Homepage.vue";
import CategoryPage from "../views/CategoryPage.vue";
import DetailPage from "../views/DetailPage.vue";
import Randomizer from "../views/Randomizer.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    props: true,
    component: Homepage,
  },
  {
    path: "/categories/:category",
    name: "Category",
    props: true,
    component: CategoryPage,
  },
  {
    path: "/game/:id",
    name: "Detail-page",
    props: true,
    component: DetailPage,
  },
  {
    path: "/random",
    name: "Randomizer",
    props: true,
    component: Randomizer,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
