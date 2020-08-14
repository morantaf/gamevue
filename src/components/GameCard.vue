<template>
  <div class="game-card">
    <div class="card-header" :style="{ backgroundImage: `url(${image})` }">
      <div class="card-header-content"></div>
    </div>
    <div class="card-content">
      <router-link tag="h1" :to="`/game/${id}`">
        <a>{{ name }}</a>
      </router-link>
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
      let logo;
      switch (platform.platform.name) {
        case "PlayStation":
          logo = `<i class="fab fa-playstation"></i>`;
          break;
        case "PC":
          logo = `<i class="fab fa-windows"></i>`;
          break;
        case "Xbox":
          logo = `<i class="fab fa-xbox"></i>`;
          break;
        case "Linux":
          logo = `<i class="fab fa-linux"></i>`;
          break;
        case "Nintendo":
          logo = `<i class="fab fa-neos"></i>`;
          break;
        case "Android":
          logo = `<i class="fab fa-android"></i>`;
          break;
        case "Apple Macintosh":
          logo = `<i class="fab fa-apple"></i>`;
          break;
        case "iOS":
          logo = `<i class="fab fa-app-store-ios"></i>`;
          break;
        default:
          logo = platform.platform.name;
          break;
      }
      return logo;
    });
  }
}
</script>

<style>
.game-card {
  width: 28%;
  margin: 2% 2% 2% 2%;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
  border-radius: 5%;
}

.card-header {
  height: 300px;
  position: relative;
  background-color: #33334d;
  color: white;
  background-size: cover;
  text-align: center;
  background-position: center;
  border-radius: 5% 5% 0 0;
}

.card-header-content {
  content: "";
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  position: absolute;
}

img {
  width: 100%;
  border-radius: 5% 5% 0 0;
}

h1 {
  padding: 2%;
}

.meta-content {
  display: flex;
  justify-content: space-around;
}

.rating {
  color: #fff;
  background-color: #404040;
  padding: 2px;
  border-radius: 10%;
}

a {
  text-decoration: none;
  color: inherit;
}

.platforms {
  color: #fff;
  background-color: #404040;
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
