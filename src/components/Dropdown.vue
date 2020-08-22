<template>
  <div
    class="menu-item"
    @mouseover="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <a href="#">
      {{ title }}
      <i class="fas fa-caret-down"></i>
    </a>
    <transition name="fade" appear>
      <div
        class="sub-menu"
        v-if="isOpen"
        @mouseover="isOpen = true"
        @mouseleave="isOpen = false"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          class="dropdown-item"
          @click="isOpen = false"
        >
          <router-link :to="`/categories/${item.slug}`">{{
            item.title
          }}</router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Dropdown extends Vue {
  @Prop() title!: string;
  @Prop() items!: string;
  isOpen = false;
}
</script>

<style>
.menu-item a {
  text-decoration: none;
  padding: 20px;
  color: inherit;
  font-weight: bold;
  transition-duration: 0.5s;
  width: 100%;
}
.menu-item a:hover {
  background-color: #414958;
}

.dropdown-item {
  background-color: #626d84;
  padding: 20px 0;
  border-bottom: 1px solid #dae4eb;
}

.dropdown-item:hover {
  background-color: #414958;
}

nav .sub-menu {
  position: absolute;
  background-color: #414958;
  left: 50%;
  top: 80%;
  transform: translateX(-59%);
  width: max-content;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
