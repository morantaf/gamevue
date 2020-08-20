<template>
  <div class="home">
    <GamesList :home="home" />
  </div>
</template>

<script>
// @ is an alias to /src
import GamesList from "@/components/GamesList.vue";

export default {
  name: "home",
  components: {
    GamesList,
  },
  data() {
    return {
      home: true,
    };
  },
};
</script>
