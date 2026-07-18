<template>
  <div class="dashboard">

    <h1>Weather Dashboard</h1>

    <section class="card">
      <h2>Latest Weather</h2>

      <div v-if="latestWeather">
        <p>🌡 Temperature: {{ latestWeather.temperature }} °C</p>
        <p>💧 Humidity: {{ latestWeather.humidity }} %</p>
        <p>💨 Wind: {{ latestWeather.wind_speed }} km/h</p>
        <p>📍 City: {{ latestWeather.city }}</p>
      </div>

      <p v-else>
        Loading...
      </p>
    </section>


    <section class="card">
      <h2>Historical Data</h2>

      <ul>
        <li
          v-for="w in weather.slice(0, 10)"
          :key="w.observed_at"
        >
          {{ w.observed_at }}
          -
          {{ w.temperature }} °C
        </li>
      </ul>

    </section>


  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getWeatherHistory } from "../api/weather";

console.log("WeatherView loaded");

const weather = ref([]);
const loading = ref(true);
const latestWeather = ref(null);

const fetchWeather = async () => {
  console.log("fetchWeather started");

  try {
    const res = await getWeatherHistory();

    console.log("API response:", res.data);

    weather.value = res.data;

    latestWeather.value = res.data[0];

  } catch (error) {
    console.error("API error:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWeather);
</script>


<style scoped>

.dashboard {
  padding: 20px;
}

.card {
  background: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}

h1 {
  margin-bottom: 30px;
}

</style>
