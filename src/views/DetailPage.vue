<template>
  <div class="game-details">
    <transition name="fade" mode="out-in">
      <GameDetails :gameId="$route.params.id" :key="$route.params.id" />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import GameDetails from "@/components/GameDetails.vue";

export default {
  name: "detail-page",
  components: {
    GameDetails,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
