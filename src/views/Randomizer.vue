<template>
  <div class="randomizer">
    <GameDetails :random="random" />
  </div>
</template>

<script>
// @ is an alias to /src
import GameDetails from "@/components/GameDetails.vue";

export default {
  name: "randomizer",
  components: {
    GameDetails,
  },
  data() {
    return {
      random: true,
    };
  },
};
</script>

<style>
.randomizer {
  margin-top: 90px;
}
</style>
