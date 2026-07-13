<template>
  <div>
    <h1>Weather Dashboard</h1>

    <p v-if="loading">
      Loading...
    </p>

    <div v-else>
      <p>Total records: {{ weather.length }}</p>

      <ul>
        <li v-for="w in weather.slice(0, 20)" :key="w.OBSERVED_AT">
          {{ w.OBSERVED_AT }}
          -
          {{ w.TEMPERATURE }} °C
          -
          {{ w.CITY }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getWeatherHistory } from "../api/weather";

console.log("WeatherView loaded");

const weather = ref([]);
const loading = ref(true);

const fetchWeather = async () => {
  console.log("fetchWeather started");

  try {
    const res = await getWeatherHistory();

    console.log("API response:", res.data);

    weather.value = res.data;

  } catch (error) {
    console.error("API error:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWeather);
</script>
