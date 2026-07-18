import { createRouter, createWebHistory} from "vue-router";
import WeatherView from "../views/WeatherView.vue";
import ArtistView from "../views/ArtistView.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/weather",
    name: "weather",
    component: WeatherView,
  },

{
  path: "/artist",
    name: "artist",
  component: ArtistView
},

  {
    path: "/dashboard",
    name: "dashboard",
    component: HomeView
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
