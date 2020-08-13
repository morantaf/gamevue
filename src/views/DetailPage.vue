<template>
  <div class="about">
    <GamePage page="Specific game" />
  </div>
</template>

<script>
// @ is an alias to /src
import GamePage from "@/components/GamePage.vue";

export default {
  name: "Home",
  components: {
    GamePage,
  },
};
</script>
