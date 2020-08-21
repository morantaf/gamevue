<template>
  <nav>
    <div class="menu-item">
      <router-link to="/">Home</router-link>
    </div>
    <Dropdown v-bind:title="'Categories'" v-bind:items="listOfCategories" />
    <div class="menu-item">
      <router-link to="/random">Random</router-link>
    </div>
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
}
</script>

<style scoped lang="scss">
nav {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #626d84;
  border-bottom: 1px solid #dae4eb;
  display: flex;
  justify-content: center;
  height: 70px;
  align-items: center;
}

.menu-item a {
  text-decoration: none;
  padding: 20px;
  color: inherit;
  font-weight: bold;
  transition-duration: 0.5s;
}

.menu-item a:hover {
  background-color: #414958;
}
</style>
