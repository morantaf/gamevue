<template>
  <div class="footer">
    <div class="informations">
      <div class="sitemap">
        <h3>Sitemap</h3>
        <ul>
          <li v-for="(route, index) in routerList" v-bind:key="index">
            <router-link :to="route.path">{{ route.name }}</router-link>
          </li>
        </ul>
      </div>
      <div class="contact">
        <h3>Contact</h3>
        <ul>
          <li>
            <i class="fas fa-map-marker-alt footer-icon"></i>Langswater 812,
            1069 EH Amsterdam
          </li>
          <li><i class="fas fa-envelope footer-icon"></i>support@email.com</li>
          <li><i class="fa fa-phone footer-icon"></i>0687654321</li>
        </ul>
      </div>
    </div>
    <p>Made by Moranta Fall</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";

@Component
export default class Footer extends Vue {
  routerList: RouteConfig[] | undefined = [];

  getRoutesList(
    routes: RouteConfig[] | undefined,
    pre: string
  ): RouteConfig[] | undefined {
    if (routes) {
      return routes.reduce((accumulator: RouteConfig[], route: RouteConfig) => {
        const splitRoute = route.path.split("/");
        const isDynamic = splitRoute[splitRoute.length - 1][0] === ":";
        console.log(route);
        if (!isDynamic) {
          return [...accumulator, { path: route.path, name: route.name }];
        } else {
          return accumulator;
        }
      }, []);
    }
  }

  mounted() {
    this.routerList = this.getRoutesList(
      this.$router.options.routes,
      "https://localhost:8080"
    );
    console.log(this.routerList);
  }
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  background-color: #2b303b;
  border-top: 1px solid #dae4eb;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 90px;
}

.informations {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.footer ul {
  padding: 0;
}

.sitemap {
  margin-left: 60px;
}

.contact {
  margin-right: 60px;
}

.footer li {
  text-align: left;
  list-style: none;
  margin-bottom: 5px;
}

.footer a {
  color: #fff;
}

.footer-icon {
  margin-right: 20px;
}

@media screen and (max-width: 500px) {
  .informations {
    flex-direction: column;
  }
  .sitemap {
    margin-left: 0;
    width: 90%;
  }

  .contact {
    margin-right: 20px;
  }
}
</style>
