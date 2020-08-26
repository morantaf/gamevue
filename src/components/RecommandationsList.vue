<template>
  <div>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div class="recommandations-list">
      <GameCard
        v-for="game in recommandationList"
        :key="game.id"
        v-bind:id="game.id"
        v-bind:name="game.name"
        v-bind:image="game.backgroundImage"
        v-bind:rating="game.rating"
        v-bind:platforms="game.platforms"
      ></GameCard>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as request from "superagent";
import GameCard from "./GameCard.vue";

const API_KEY = process.env.VUE_APP_API_KEY;

type Game = {
  id: number;
  name: string;
  backgroundImage: string;
  platforms: Platform[];
  rating: number;
};

type Platform = {
  id: number;
  name: string;
  slug: string;
};

@Component({
  components: {
    GameCard,
  },
})
export default class GamesList extends Vue {
  gamesList = [];
  loading = false;
  error = null;
  @Prop() displayedGameGenres!: string[];
  @Prop() displayedGameName!: string;

  get recommandationList() {
    const maxIndex = this.gamesList.length - 4;
    const randomIndex = Math.floor(Math.random() * (maxIndex - 1) + 1);
    return this.gamesList.splice(randomIndex, 3);
  }

  async fetchGames(): Promise<Game[] | undefined> {
    try {
      this.loading = true;
      const response = await request
        .get(`https://rawg-video-games-database.p.rapidapi.com/games`)
        .set("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com")
        .set("x-rapidapi-key", `${API_KEY}`);

      const dataReceived = response.body;

      this.loading = false;

      const gamesListReceived = dataReceived.results;
      const filteredGamesList = gamesListReceived.filter((game: any) => {
        if (game.name === this.displayedGameName) {
          return false;
        } else {
          const genresList = game.genres;
          const formattedGenreList = genresList.map((genre: any) => genre.name);
          const intersectionArray = formattedGenreList.filter((genre: any) =>
            this.displayedGameGenres.includes(genre)
          );
          if (intersectionArray.length !== 0) return true;
        }
      });
      return (this.gamesList = filteredGamesList.map((game: any) => {
        return {
          id: game.id,
          name: game.name,
          backgroundImage: game.background_image,
          platforms: game.parent_platforms,
          rating: game.rating,
        };
      }));
    } catch (e) {
      this.error = e.toString();
      console.error(e);
    }
  }

  mounted() {
    this.fetchGames();
  }
}
</script>

<style scoped lang="scss">
.recommandations-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 90px;
}
</style>
