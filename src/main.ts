import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueYouTubeEmbed from "vue-youtube-embed";

Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
