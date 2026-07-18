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

    <section class="highlight-card" v-if="dashboard">
      <h2>🎤 Top Artist</h2>
      <div class="top-artist">
        <h3>
          {{ dashboard.top_artist.artist_name }}
        </h3>
        <p>
          {{ dashboard.top_artist.plays }} plays
        </p>
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

.highlight-card {
  margin-top: 40px;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow:
    0 2px 10px rgba(0,0,0,0.08);
}

.highlight-card h2 {
  margin-bottom: 20px;
}

.top-artist {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-artist h3 {
  margin: 0;
  font-size: 2rem;
}

.top-artist p {
  font-size: 1.2rem;
  color: #1db954;
  font-weight: bold;
}

</style>
