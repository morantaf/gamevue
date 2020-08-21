<template>
  <div class="game-card">
    <div
      class="card-header"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>
    <div class="card-content">
      <div class="meta-content">
        <div class="rating"><i class="fas fa-star"></i>{{ rating }}</div>
        <div class="platforms">
          <div
            class="platform-icon"
            v-for="platform in platformsList"
            :key="platform"
            v-html="platform"
          ></div>
        </div>
      </div>
      <router-link tag="h1" :to="`/game/${id}`">
        {{ name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

type Platform = {
  id: number;
  name: string;
  slug: string;
};

type ParentPlatform = {
  platform: Platform;
};

@Component
export default class GameCard extends Vue {
  @Prop() rating!: number;
  @Prop() image!: string;
  @Prop() name!: string;
  @Prop() platforms!: Array<ParentPlatform>;
  @Prop() id!: number;

  get platformsList() {
    return this.platforms.map((platform) => {
      let icon;
      switch (platform.platform.name) {
        case "PlayStation":
          icon = `<i class="fab fa-playstation"></i>`;
          break;
        case "PC":
          icon = `<i class="fab fa-windows"></i>`;
          break;
        case "Xbox":
          icon = `<i class="fab fa-xbox"></i>`;
          break;
        case "Linux":
          icon = `<i class="fab fa-linux"></i>`;
          break;
        case "Nintendo":
          icon = `<i class="fab fa-neos"></i>`;
          break;
        case "Android":
          icon = `<i class="fab fa-android"></i>`;
          break;
        case "Apple Macintosh":
          icon = `<i class="fab fa-apple"></i>`;
          break;
        case "iOS":
          icon = `<i class="fab fa-app-store-ios"></i>`;
          break;
        default:
          icon = platform.platform.name;
          break;
      }
      return icon;
    });
  }
}
</script>

<style>
.game-card {
  width: 29%;
  margin: 2% 2% 2% 2%;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
  border-radius: 5%;
  transition-duration: 0.5s;
  background-color: #576175;
}

@media screen and (max-width: 1310px) {
  .game-card {
    width: 46%;
  }
}

@media screen and (max-width: 840px) {
  .game-card {
    width: 100%;
    margin-bottom: 30px;
  }
}

.game-card:hover {
  transform: translate3d(0, -10px, 0);
}

.card-header {
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 5% 5% 0 0;
}

img {
  width: 100%;
  border-radius: 5% 5% 0 0;
}

.card-content h1 {
  padding: 2%;
  transition-duration: 0.5s;
  cursor: pointer;
}

.card-content h1:hover {
  color: #ffcc66;
}

.meta-content {
  display: flex;
  justify-content: space-around;
  margin: 15px auto;
}

.rating {
  padding: 2px;
  border-radius: 10%;
}

.game-card a {
  text-decoration: none;
  color: inherit;
}

.platforms {
  padding: 3px;
  border-radius: 5%;
}

.platforms {
  display: flex;
}

.platform-icon {
  margin: 0 2px;
}
</style>
