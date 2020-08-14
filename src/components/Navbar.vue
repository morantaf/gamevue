<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/categories">Categories</router-link> |
    <router-link to="/random">Random</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Navbae extends Vue {
  msg = "NavBar";
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
