<template>
  <!--
  -------------------------------------------------------------------------------------
  Weather view.
  -------------------------------------------------------------------------------------
  Displays:
  - Latest weather observation.
  - Historical weather data retrieved from the backend.
-->
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

      <table>
        <thead>
        <tr>
          <th>Date</th>
          <th>Weather</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Wind</th>
        </tr>
        </thead>

        <tbody>
        <tr
          v-for="w in dailyWeather.slice(0, 10)"
          :key="w.day"
        >
          <td>{{ w.day }}</td>
          <td>{{ weatherCodes[w.most_common_weather_code] || "❓ Unknown" }}</td>
          <td>
            {{ w.avg_temperature }} °C
            ({{ w.min_temperature }} – {{ w.max_temperature }} °C)
          </td>
          <td>{{ w.avg_humidity }} %</td>
          <td>{{ w.avg_wind_speed }} km/h</td>

        </tr>
        </tbody>
      </table>

    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {getWeatherHistory, getWeatherDaily} from "../api/weather";
import weatherCodes from "../assets/weatherCodes";

console.log("WeatherView loaded");

const weather = ref([]);
const dailyWeather = ref([]);
const loading = ref(true);
const latestWeather = ref(null);


// -----------------------------------------------------
// API
// -----------------------------------------------------
const fetchWeather = async () => {

  try {
    const history = await getWeatherHistory();
    const daily = await getWeatherDaily();

    weather.value = history.data;
    dailyWeather.value = daily.data;

    latestWeather.value = history.data[0];

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

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  font-weight: 600;
}

</style>
