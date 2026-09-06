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

    <section class="weather-card">
      <div v-if="latestWeather">

        <div class="weather-header">
          <div>
            <h2>Latest Weather</h2>
            <p class="weather-city">📍 {{ latestWeather.city }}</p>
          </div>

          <div class="weather-condition">
            {{ weatherCodes[latestWeather.weather_code] || "❓ Unknown" }}
          </div>
        </div>

        <div class="weather-main">

          <div class="temperature">
            🌡️ {{ latestWeather.temperature }}°C
          </div>

          <div class="weather-details">
            <div>
              <span>💧</span>
              <strong>{{ latestWeather.humidity }}%</strong>
              <small>Humidity</small>
            </div>

            <div>
              <span>💨</span>
              <strong>{{ latestWeather.wind_speed }} km/h</strong>
              <small>Wind</small>
            </div>
          </div>

        </div>

        <p class="weather-updated">
          Updated: {{ latestWeather.observed_at }}
        </p>

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

.weather-card {
  background: #f5f5f5;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 12px;
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.weather-header h2 {
  margin: 0 0 5px;
}

.weather-city {
  margin: 0;
  color: #666;
}

.weather-condition {
  font-size: 18px;
  font-weight: 600;
}

.weather-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.temperature {
  font-size: 42px;
  font-weight: 600;
}

.weather-details {
  display: flex;
  gap: 35px;
}

.weather-details div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.weather-details span {
  font-size: 20px;
}

.weather-details strong {
  font-size: 18px;
}

.weather-details small {
  color: #777;
}

.weather-updated {
  margin: 25px 0 0;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  color: #777;
  font-size: 13px;
}
</style>
