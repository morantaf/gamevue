<template>
  <div class="game-details">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div
      class="image-header"
      :style="{
        backgroundImage: `url(${this.displayedGame.backgroundImage})`,
      }"
      v-if="displayedGame.backgroundImage"
    ></div>
    <h1>
      {{ displayedGame.name }}
      <i v-if="random" class="fas fa-sync" @click="changeComponentKey"></i>
    </h1>
    <div class="columns">
      <div class="game-description">
        <h3>About</h3>
        <p v-html="displayedGame.description"></p>
      </div>
      <div class="column-2">
        <div v-if="displayedGame.video">
          <youtube
            :video-id="displayedGame.video"
            player-width="100%"
          ></youtube>
        </div>
        <GameMeta
          v-bind:platforms="platforms"
          v-bind:genres="genres"
          v-bind:developers="developers"
          v-bind:website="displayedGame.website"
          v-bind:metacritic="displayedGame.metacritic"
        />
      </div>
    </div>
    <div class="recommandations">
      <h2>Similar to {{ displayedGame.name }}</h2>
      <RecommandationsList
        v-bind:displayedGameGenres="genres"
        v-bind:displayedGameName="displayedGame.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import request from "superagent";
import GameMeta from "./GameMeta.vue";
import RecommandationsList from "./RecommandationsList.vue";

const API_KEY = process.env.VUE_APP_API_KEY;

type Game = {
  name: string;
  description: string;
  backgroundImage: string;
  website: string;
  platforms: Platform[];
  genres: Genre[];
  developers: Developer[];
  video: string | null;
  metacritic: number;
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

type Developer = {
  games_count: number;
  id: number;
  name: string;
  background_image: string;
  slug: string;
};

@Component({
  components: {
    GameMeta,
    RecommandationsList,
  },
})
export default class GameDetails extends Vue {
  @Prop() gameId!: number;
  @Prop() random!: boolean;

  @Emit("update-key")
  changeComponentKey() {
    return true;
  }

  loading = false;
  error = null;
  displayedGame: Game = {
    name: "",
    description: "",
    platforms: [],
    genres: [],
    developers: [],
    backgroundImage: "",
    video: null,
    website: "",
    metacritic: 0,
  };

  get platforms(): string[] {
    return this.displayedGame.platforms
      .slice(0)
      .map((platform: any) => platform.platform.name);
  }

  get genres(): string[] {
    return this.displayedGame.genres.slice(0).map((genre: any) => genre.name);
  }
  get developers(): string[] {
    return this.displayedGame.developers
      .slice(0)
      .map((developer: any) => developer.name);
  }

  async fetchGame(): Promise<Game | undefined> {
    try {
      this.loading = true;
      const randomNumber = Math.floor(Math.random() * 10000 + 1);

      const response = this.random
        ? await request
            .get(
              `https://rawg-video-games-database.p.rapidapi.com/games/${randomNumber}`
            )
            .set("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com")
            .set("x-rapidapi-key", `${API_KEY}`)
        : await request
            .get(
              `https://rawg-video-games-database.p.rapidapi.com/games/${this.gameId}`
            )
            .set("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com")
            .set("x-rapidapi-key", `${API_KEY}`);

      // if there is no game at this id, restart the component to refetch a game
      if (response.body.redirect === true) this.changeComponentKey();

      const {
        description,
        name,
        platforms,
        genres,
        developers,
        website,
        metacritic,
      } = response.body;

      const backgroundImage = response.body.background_image;
      const video = response.body.clip ? response.body.clip.video : null;

      this.loading = false;

      return (this.displayedGame = {
        description,
        name,
        platforms,
        genres,
        developers,
        backgroundImage,
        video,
        website,
        metacritic,
      });
    } catch (e) {
      this.error = e.toString();
      console.error(e);
    }
  }

  mounted() {
    this.fetchGame();
  }
}
</script>

<style scoped lang="scss">
.game-details {
  margin-top: 80px;
}

.image-header {
  background-attachment: fixed;
  background-repeat: no-repeat;
  width: 100%;
  height: 500px;
  background-position: center;
  background-size: cover;
}

.fas {
  cursor: pointer;
}

.game-details h1 {
  font-size: 5em;
}

.columns {
  display: flex;
  padding: 0 10%;
}

.column-2 {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin-left: 50px;
  flex-direction: column;
}

@media screen and (max-width: 1024px) {
  .columns {
    flex-direction: column;
  }

  .column-2 {
    margin-left: initial;
    margin-top: 50px;
  }
}

.game-description {
  flex: 1;
  padding: 10px;
}

.game-description h3 {
  font-size: 1.6em;
}

.game-description p {
  font-size: 1.2em;
  text-align: justify;
}

.meta-block {
  display: flex;
  flex-direction: column;
  text-align: left;
  height: fit-content;
  width: 50%;
}

.block-content ul {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
}

.block-content li {
  list-style-type: none;
  margin-right: 5px;
}

.recommandations h2 {
  margin: 90px 0 0 0;
  font-size: 2em;
}
</style>
