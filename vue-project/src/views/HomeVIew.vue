<template>
  <div class="dashboard">

    <header class="hero">
      <h1>🌦️ MusicWeather</h1>
      <p>
        Your listening history meets the weather.
      </p>
    </header>

    <section class="stats">
      <div class="stat-card">
        <h2>🎵</h2>
        <p>Tracks</p>
        <strong>
          {{ dashboard?.tracks }}
        </strong>
      </div>

      <div class="stat-card">
        <h2>🎤</h2>
        <p>Artists</p>
        <strong>
          {{ dashboard?.artists }}
        </strong>
      </div>

      <div class="stat-card">
        <h2>🎸</h2>
        <p>Genres</p>
        <strong>
          {{ dashboard?.genres }}
        </strong>
      </div>

    </section>
  </div>
</template>


<script setup>

import { ref, onMounted } from "vue";
import { getDashboard } from "../api/dashboard";

const dashboard = ref(null);

const fetchDashboard = async () => {
  try {
    const response = await getDashboard();
    console.log("Dashboard:", response.data);
    dashboard.value = response.data;
  } catch(error) {
    console.error("Dashboard error:", error);
  }
};


onMounted(fetchDashboard);

</script>

<style scoped>

.dashboard {
  padding: 30px;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.hero p {
  color: #666;
  font-size: 1.2rem;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.stat-card {
  width: 180px;
  padding: 25px;
  text-align: center;
  background: white;
  border-radius: 16px;
  box-shadow:
    0 2px 10px rgba(0,0,0,0.08);
}

.stat-card h2 {
  margin: 0;
  font-size: 2rem;
}

.stat-card p {
  margin: 10px 0;
  color: #777;
}

.stat-card strong {
  font-size: 2rem;
}

</style>
