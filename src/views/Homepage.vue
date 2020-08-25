<template>
  <div class="home">
    <div class="banner">
      <h1>Welcome to GameZone</h1>
      <h3>The best video game ressources of the internet</h3>
    </div>
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

<style>
.banner {
  background-image: url("https://wallpapercave.com/wp/wp6082158.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 700px;
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner h1 {
  font-size: 5em;
}

.banner h3 {
  font-size: 2em;
}
</style>
