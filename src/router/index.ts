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
    name: "home",
    component: Homepage,
  },
  {
    path: "/categories/:category",
    name: "category",
    props: true,
    component: CategoryPage,
  },
  {
    path: "/game/:id",
    name: "detail-page",
    props: true,
    component: DetailPage,
  },
  {
    path: "/random",
    name: "randomizer",
    component: Randomizer,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
