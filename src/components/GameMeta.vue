<template>
  <div class="game-meta">
    <div class="meta-block">
      <div class="block-title"><b>Platforms</b></div>
      <div class="block-content">
        <ul>
          <li v-for="platform in platforms" :key="platform">{{ platform }},</li>
        </ul>
      </div>
    </div>
    <div class="meta-block">
      <div class="block-title"><b>Genre</b></div>
      <div class="block-content">
        <ul>
          <li v-for="genre in genres" :key="genre">{{ genre }},</li>
        </ul>
      </div>
    </div>
    <div class="meta-block">
      <div class="block-title"><b>Developer</b></div>
      <div class="block-content">
        <ul>
          <li v-for="developer in developers" :key="developer">
            {{ developer }},
          </li>
        </ul>
      </div>
    </div>
    <div class="meta-block" v-if="metacritic">
      <div class="block-title"><b>Metacritic</b></div>
      <div class="block-content" v-bind:style="metacriticStyle">
        {{ metacritic }}
      </div>
    </div>
    <div class="meta-block">
      <div class="block-title"><b>Website</b></div>
      <div class="block-content">
        <a :href="website">{{ website }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class GameMeta extends Vue {
  @Prop() platforms!: string[];
  @Prop() genres!: string[];
  @Prop() developers!: string[];
  @Prop() metacritic!: number;
  @Prop() website!: string;

  get metacriticStyle() {
    if (this.metacritic > 80) {
      return {
        border: "solid 1px",
        "border-radius": "5px",
        "font-weight": "bold",
        "margin-top": "12px",
        color: "#00ff00",
        width: "20px",
        padding: "4px",
      };
    } else if (this.metacritic > 60 && this.metacritic < 80) {
      return {
        border: "solid 1px",
        "border-radius": "5px",
        "font-weight": "bold",
        "margin-top": "12px",
        color: "#ff9900",
        width: "20px",
        padding: "4px",
      };
    } else {
      return {
        border: "solid 1px",
        "border-radius": "5px",
        "font-weight": "bold",
        "margin-top": "12px",
        color: "#ff3300",
        width: "20px",
        padding: "4px",
      };
    }
  }
}
</script>

<style>
.game-meta {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin-top: 20px;
  align-content: flex-start;
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

.block-content a {
  color: inherit;
}
</style>
