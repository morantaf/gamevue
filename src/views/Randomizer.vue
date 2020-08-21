<template>
  <div class="randomizer">
    <GameDetails
      :random="random"
      :key="componentKey"
      v-on:update-key="changeComponentKey"
    />
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
      componentKey: 0,
    };
  },
  methods: {
    changeComponentKey() {
      this.componentKey++;
    },
  },
};
</script>

<style>
.randomizer {
  margin-top: 90px;
}
</style>
