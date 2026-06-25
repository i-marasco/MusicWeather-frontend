<template>
  <div>
    <h1>Weather Dashboard</h1>

    <p v-if="loading">Loading...</p>

    <ul v-else>
      <li v-for="w in weather" :key="w.OBSERVED_AT">
        {{w.OBSERVED_AT}} - {{w.TEMPERATURE}}°C - {{w.CITY}}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const weather = ref([]);
const loading = ref(true);

const fetchWeather = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/weather/history");
    weather.value = res.data;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWeather);
</script>
