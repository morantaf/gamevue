<template>
  <main id="app">
    <NavBar />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
    <Footer />
  </main>
</template>

<script>
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "app",
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style lang="scss">
body {
  background-color: #191c22;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
