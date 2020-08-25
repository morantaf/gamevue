<template>
  <div>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- <div class="games-list" v-if="home">
    <GameCard
      v-for="game in reducedGamesList"
      :key="game.id"
      v-bind:id="game.id"
      v-bind:name="game.name"
      v-bind:image="game.backgroundImage"
      v-bind:platforms="game.platforms"
      v-bind:rating="game.rating"
    ></GameCard>
  </div> -->
    <h1 v-if="category">{{ categoryTitle }}</h1>

    <div
      class="sort-options"
      @mouseover="sortingMenuOpen = true"
      @mouseleave="sortingMenuOpen = false"
    >
      <div class="selected">Sort by <i class="fas fa-caret-down"></i></div>
      <div
        class="option-container"
        v-if="sortingMenuOpen"
        @mouseover="sortingMenuOpen = true"
        @mouseleave="sortingMenuOpen = false"
      >
        <div class="option" @click="sortLowestRating">Rating ascending</div>
        <div class="option" @click="sortHighestRating">Rating descending</div>
        <div class="option" @click="sortByNameAscending">Name ascending</div>
        <div class="option" @click="sortByNameDescending">
          Name descending
        </div>
      </div>
    </div>
    <div class="games-list">
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

const API_KEY = process.env.VUE_APP_API_KEY;

type Game = {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: Platform[];
  rating: number;
  genres: Genre[];
};

type Platform = {
  id: number;
  name: string;
  slug: string;
};

type Genre = {
  games_count: number;
  id: number;
  name: string;
  background_image: string;
  slug: string;
};

@Component({
  components: {
    GameCard,
  },
})
export default class GamesList extends Vue {
  gamesList: Game[] = [];
  loading = false;
  error = null;
  sortingMenuOpen = false;
  @Prop() category!: string;
  @Prop() home!: boolean;
  @Prop() displayedGameGenres!: string[];
  @Prop() displayedGameName!: string;

  get categoryTitle(): string {
    const category = this.category;

    const capitalStr =
      category === "rpg"
        ? category.toUpperCase()
        : category.charAt(0).toUpperCase() + category.slice(1);
    return capitalStr;
  }

  // get reducedGamesList(): Game[] {
  //   const copy = this.gamesList.slice(0);
  //   const maxIndex = copy.length - 11;
  //   const minIndex = 1;
  //   const randomStartIndex = Math.floor(
  //     Math.random() * (maxIndex - minIndex) + minIndex
  //   );
  //   const endIndex = randomStartIndex + 10;
  //   return copy.slice(randomStartIndex, endIndex);
  // }

  sortLowestRating() {
    this.gamesList.sort((a: Game, b: Game) => a.rating - b.rating);
    this.sortingMenuOpen = false;
  }
  sortHighestRating() {
    this.gamesList.sort((a: Game, b: Game) => b.rating - a.rating);
    this.sortingMenuOpen = false;
  }
  sortByNameAscending() {
    this.gamesList.sort((a: Game, b: Game) => (a.name > b.name ? -1 : 1));
    this.sortingMenuOpen = false;
  }
  sortByNameDescending() {
    this.gamesList.sort((a: Game, b: Game) => (a.name < b.name ? -1 : 1));
    this.sortingMenuOpen = false;
  }

  async fetchGames(): Promise<Game[] | undefined> {
    try {
      this.loading = true;
      const response = await request
        .get(`https://rawg-video-games-database.p.rapidapi.com/games`)
        .set("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com")
        .set("x-rapidapi-key", `${API_KEY}`);
      const receivedData = response.body;

      this.loading = false;

      return receivedData.results.map((game: Game) => {
        return {
          id: game.id,
          name: game.name,
          backgroundImage: game.background_image,
          platforms: game.parent_platforms,
          rating: game.rating,
          genres: game.genres,
        };
      });
    } catch (e) {
      this.error = e.toString();
      console.error(e);
    }
  }

  reduceGamesList(list: Game[]): Game[] {
    return list.slice(0, 10);
  }

  filterByCategory(list: Game[]): Game[] {
    return list.filter((game: Game) => {
      const genresList = game.genres;
      const formattedGenreList = genresList.map((genre: Genre) =>
        genre.name.toLowerCase()
      );

      if (formattedGenreList.includes(this.category)) {
        return true;
      }
    });
  }

  async mounted() {
    try {
      const receivedGamesList = await this.fetchGames();

      if (receivedGamesList) {
        this.gamesList = this.category
          ? this.filterByCategory(receivedGamesList)
          : this.reduceGamesList(receivedGamesList);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
.games-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 90px;
}

.sort-options {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 150px;
  margin-left: 50px;
  position: relative;
  top: 20px;
}

.selected {
  background-color: #fff;
  width: 100%;
  color: #000;
}

.option-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  position: absolute;
  top: 100%;
}

.option {
  padding: 5px 0;
  align-self: start;
  width: 100%;
}

.option:hover {
  background-color: #80bfff;
  color: #fff;
}
</style>
