<template>
  <div>
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
    ></div>
    <h1>
      {{ displayedGame.name }}
    </h1>
    <div class="columns">
      <div class="game-description">
        <h3>About</h3>
        <p v-html="displayedGame.description"></p>
      </div>
      <div class="column-2">
        <div v-if="displayedGame.clip">
          <youtube
            :video-id="displayedGame.clip.video"
            player-width="100%"
          ></youtube>
        </div>
        <GameMeta
          v-bind:platforms="platforms"
          v-bind:genres="genres"
          v-bind:developers="developers"
          v-bind:website="displayedGame.website"
        />
      </div>
    </div>
    <div class="recommandations">
      <h2>Similar to {{ displayedGame.name }}</h2>
      <GamesList
        v-bind:displayedGameGenres="genres"
        v-bind:displayedGameName="displayedGame.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import request from "superagent";
import GameMeta from "./GameMeta.vue";
import GamesList from "./GamesList.vue";

@Component({
  components: {
    GameMeta,
    GamesList,
  },
})
export default class GameDetails extends Vue {
  @Prop() gameId!: number;
  @Prop() random!: boolean;

  loading = false;
  error = null;
  displayedGame = {
    name: "",
    description: "",
    platforms: [],
    genres: [],
    developers: [],
    backgroundImage: "",
    clip: null,
  };

  get platforms(): string[] {
    return this.displayedGame.platforms.map(
      (platform: any) => platform.platform.name
    );
  }

  get genres(): string[] {
    return this.displayedGame.genres.map((genre: any) => genre.name);
  }
  get developers(): string[] {
    return this.displayedGame.developers.map(
      (developer: any) => developer.name
    );
  }

  async fetchGames() {
    try {
      this.loading = true;

      if (this.random) {
        const randomNumber = Math.floor(Math.random() * 10000 + 1);

        const response = await request
          .get(
            `https://rawg-video-games-database.p.rapidapi.com/games/${randomNumber}`
          )
          .set("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com")
          .set(
            "x-rapidapi-key",
            "58fc62e76dmsh80ce19cd8cbea27p16bd17jsnbbc7c11d51dc"
          );

        const {
          description,
          name,
          platforms,
          genres,
          developers,
          clip,
        } = response.body;

        const backgroundImage = response.body.background_image;

        this.displayedGame = {
          description,
          name,
          platforms,
          genres,
          developers,
          backgroundImage,
          clip,
        };
        this.loading = false;
        console.log("displayedGame ?", this.displayedGame);
      } else {
        const response = await request
          .get(
            `https://rawg-video-games-database.p.rapidapi.com/games/${this.gameId}`
          )
          .set("x-rapidapi-host", "rawg-video-games-database.p.rapidapi.com")
          .set(
            "x-rapidapi-key",
            "58fc62e76dmsh80ce19cd8cbea27p16bd17jsnbbc7c11d51dc"
          );

        const {
          description,
          name,
          platforms,
          genres,
          developers,
          clip,
        } = response.body;

        const backgroundImage = response.body.background_image;

        this.displayedGame = {
          description,
          name,
          platforms,
          genres,
          developers,
          backgroundImage,
          clip,
        };
        this.loading = false;
        console.log("displayedGame ?", this.displayedGame);
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
.image-header {
  background-attachment: fixed;
  background-repeat: no-repeat;
  width: 100%;
  height: 500px;
  background-position: center;
  background-size: cover;
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

.game-description {
  box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.13);
  flex: 1;
  padding: 10px;
}

.game-description p {
  text-align: left;
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
</style>
