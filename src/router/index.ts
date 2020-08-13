import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Homepage from "../views/Homepage.vue";
import CategoriesPage from "../views/CategoriesPage.vue";
import DetailPage from "../views/DetailPage.vue";
import Randomizer from "../views/Randomizer.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Homepage,
  },
  {
    path: "/categories/:categorie",
    name: "Categories",
    component: CategoriesPage,
  },
  {
    path: "/game/:id",
    name: "Gamepage",
    component: DetailPage,
  },
  {
    path: "/random/:id",
    name: "Randomizer",
    component: Randomizer,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
