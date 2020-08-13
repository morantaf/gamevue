<template>
  <div>
    <h1>{{ fullPageName }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DetailPage extends Vue {
  msg = "Page";
  @Prop() page!: string;

  get fullPageName() {
    return this.page + " " + this.msg;
  }
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
