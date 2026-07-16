import { createRouter, createWebHistory} from "vue-router";
import WeatherView from "../views/WeatherView.vue";
import ArtistView from "../views/ArtistView.vue";

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

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
