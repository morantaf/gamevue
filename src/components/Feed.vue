<template>
  <div class="games-list">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <GameCard
      v-for="game in gamesList"
      :key="game.id"
      v-bind:id="game.id"
      v-bind:name="game.name"
      v-bind:image="game.background_image"
      v-bind:rating="game.rating"
      v-bind:platforms="game.parent_platforms"
    ></GameCard>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as request from "superagent";
import { Route } from "vue-router";
import GameCard from "./GameCard.vue";

@Component({
  components: {
    GameCard,
  },
})
export default class Feed extends Vue {
  msg = "Feed";
  gamesList = [];
  loading = false;
  error = null;
  @Prop() category!: string;

  params = this.$route.params;

  async fetchGames() {
    try {
      const response = await request
        .get("https://rawg-video-games-database.p.rapidapi.com/games")
        .set("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com")
        .set(
          "x-rapidapi-key",
          "58fc62e76dmsh80ce19cd8cbea27p16bd17jsnbbc7c11d51dc"
        );

      const dataReceived = response.body;

      if (this.category) {
        const gamesListReceived = dataReceived.results;
        this.gamesList = gamesListReceived.filter((game: any) => {
          const genresList = game.genres;
          const formattedGenreList = genresList.map((genre: any) => genre.name);

          for (let i = 0; i < formattedGenreList.length; i++) {
            if (
              formattedGenreList[i].toLowerCase() ===
              this.category.toLowerCase()
            ) {
              return true;
            }
          }
        });

        console.log("category list ?", this.gamesList);
      } else {
        this.gamesList = dataReceived.results;
        console.log("gamesList ?", this.gamesList);
      }
    } catch (e) {
      console.error(e);
    }
  }

  mounted() {
    this.fetchGames();
    console.log("mounted");
  }
}
</script>

<style scoped lang="scss">
.games-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
