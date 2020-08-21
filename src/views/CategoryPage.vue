<template>
  <div class="category">
    <transition name="slide" mode="out-in">
      <GamesList
        page="category"
        v-bind:category="$route.params.category"
        v-bind:key="$route.params.category"
      />
    </transition>
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
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
