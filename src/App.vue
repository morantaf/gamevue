<template>
  <main id="app">
    <NavBar />
    <router-view />
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
</style>
