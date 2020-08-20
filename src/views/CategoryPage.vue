<template>
  <div class="category">
    <GamesList
      page="category"
      v-bind:category="$route.params.category"
      v-bind:key="$route.params.category"
    />
  </div>
</template>

<script>
import GamesList from "@/components/GamesList.vue";

export default {
  name: "category",
  components: {
    GamesList,
  },
};
</script>

<style>
.category {
  margin-top: 90px;
}
</style>
