<template>
  <div>
    <h1>{{ fullPage }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Feed extends Vue {
  msg = "Feed";
  @Prop() page!: string;

  get fullPage() {
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
