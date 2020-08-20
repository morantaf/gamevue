<template>
  <nav id="nav">
    <router-link to="/">Home</router-link> |
    <Dropdown v-bind:title="'Categories'" v-bind:items="listOfCategories" />|
    <router-link to="/random">Random</router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Dropdown from "./Dropdown.vue";
import request from "superagent";

@Component({
  components: {
    Dropdown,
  },
})
export default class Navbar extends Vue {
  listOfCategories = [
    {
      title: "Adventure",
      slug: "adventure",
    },
    {
      title: "RPG",
      slug: "rpg",
    },
    {
      title: "Action",
      slug: "action",
    },
    {
      title: "Shooter",
      slug: "shooter",
    },
  ];

  // async fetchCategories() {
  //   try {
  //     const response = await request
  //       .get(`https://rawg-video-games-database.p.rapidapi.com/genres`)
  //       .set("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com")
  //       .set(
  //         "x-rapidapi-key",
  //         "58fc62e76dmsh80ce19cd8cbea27p16bd17jsnbbc7c11d51dc"
  //       );

  //     this.listOfCategories = response.body.results.map((category: any) => ({
  //       title: category.name,
  //       slug: category.slug,
  //     }));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // mounted() {
  //   this.fetchCategories();
  // }
}
</script>

<style scoped lang="scss">
#nav {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #dae4eb;
  display: flex;
  justify-content: center;
}

a {
  color: #42b983;
}
</style>
