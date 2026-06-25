import { createRouter, createWebHistory} from "vue-router";
import WeatherView from "../views/WeatherView.vue";

const routes = [
  {
    path: "/weather",
    name: "weather",
    component: WeatherView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
