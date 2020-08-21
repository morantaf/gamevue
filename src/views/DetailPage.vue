<template>
  <div class="game-details">
    <GameDetails :gameId="$route.params.id" :key="$route.params.id" />
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
  data() {
    return {
      gameId: this.$route.params.id,
    };
  },
};
</script>

<style>
.game-details {
  margin-top: 80px;
}
</style>
