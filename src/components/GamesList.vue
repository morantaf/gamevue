<template>
  <div>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div class="games-list" v-if="home">
      <GameCard
        v-for="game in reducedGamesList"
        :key="game.id"
        v-bind:id="game.id"
        v-bind:name="game.name"
        v-bind:image="game.backgroundImage"
        v-bind:platforms="game.platforms"
        v-bind:rating="game.rating"
      ></GameCard>
    </div>
    <div
      class="games-list"
      v-else-if="
        this.$route.name === 'detail-page' || this.$route.name === 'randomizer'
      "
    >
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
    <div class="games-list" v-else>
      <GameCard
        v-for="game in gamesList"
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as request from "superagent";
import GameCard from "./GameCard.vue";

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
  @Prop() category!: string;
  @Prop() home!: boolean;
  @Prop() displayedGameGenres!: string[];
  @Prop() displayedGameName!: string;

  get reducedGamesList() {
    const maxIndex = this.gamesList.length - 11;
    const minIndex = 1;
    const randomIndex = Math.floor(
      Math.random() * (maxIndex - minIndex) + minIndex
    );
    return this.gamesList.splice(randomIndex, 10);
  }

  get recommandationList() {
    const maxIndex = this.gamesList.length - 4;
    const randomIndex = Math.floor(Math.random() * (maxIndex - 1) + 1);
    return this.gamesList.splice(randomIndex, 3);
  }

  async fetchGames(): Promise<Game[] | undefined> {
    try {
      this.loading = true;
      const randomPage = Math.floor(Math.random() * 3 + 1);
      const response = await request
        .get(
          `https://rawg-video-games-database.p.rapidapi.com/games?page=${randomPage}`
        )
        .set("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com")
        .set(
          "x-rapidapi-key",
          "58fc62e76dmsh80ce19cd8cbea27p16bd17jsnbbc7c11d51dc"
        );
      const dataReceived = response.body;

      this.loading = false;

      if (this.category) {
        console.log("category ?", this.category);
        const gamesListReceived = dataReceived.results;
        const filteredGamesList = gamesListReceived.filter((game: any) => {
          const genresList = game.genres;
          const formattedGenreList = genresList.map((genre: any) =>
            genre.name.toLowerCase()
          );

          if (formattedGenreList.includes(this.category)) {
            return true;
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
      } else if (this.displayedGameGenres) {
        const gamesListReceived = dataReceived.results;
        const filteredGamesList = gamesListReceived.filter((game: any) => {
          if (game.name === this.displayedGameName) {
            return false;
          } else {
            const genresList = game.genres;
            const formattedGenreList = genresList.map(
              (genre: any) => genre.name
            );
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
      } else {
        return (this.gamesList = dataReceived.results.map((game: any) => {
          return {
            id: game.id,
            name: game.name,
            backgroundImage: game.background_image,
            platforms: game.parent_platforms,
            rating: game.rating,
          };
        }));
      }
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
.games-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
