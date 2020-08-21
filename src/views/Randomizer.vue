<template>
  <div class="randomizer">
    <transition name="fade" mode="out-in">
      <GameDetails
        :random="random"
        :key="componentKey"
        v-on:update-key="changeComponentKey"
      />
    </transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
