<template>
  <!--
  Dashboard view.

  Displays an overview of the MusicWeather project,
  including:
  - Total tracks, artists and genres.
  - Most listened artist.
  - Latest recorded weather information.
-->
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

    <section class="highlight-card" v-if="dashboard">
      <h2>🌤 Latest Weather</h2>
      <div class="weather-info">
        <div>
          <h3>
            {{ dashboard.latest_weather.city }}
          </h3>
          <p>
            Current temperature
          </p>
        </div>

        <strong>
          {{ dashboard.latest_weather.temperature }} °C
        </strong>
      </div>
    </section>
  </div>
</template>


<script setup>

import { ref, onMounted } from "vue";
import { getDashboard } from "../api/dashboard";

const dashboard = ref(null);

// -----------------------------------------------------
// API
// -----------------------------------------------------
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
/* -----------------------------------------------------
   Layout
----------------------------------------------------- */
.dashboard {
  padding: 30px;
}

/* -----------------------------------------------------
   Hero
----------------------------------------------------- */
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

/* -----------------------------------------------------
   Statistics cards
----------------------------------------------------- */
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


/* -----------------------------------------------------
   Highlight cards
----------------------------------------------------- */
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

/* -----------------------------------------------------
   Top artist
----------------------------------------------------- */
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

/* -----------------------------------------------------
   Weather
----------------------------------------------------- */
.weather-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-info h3 {
  margin: 0;
  font-size: 1.8rem;
}

.weather-info p {
  margin-top: 5px;
  color: #777;
}

.weather-info strong {
  font-size: 2.5rem;
  color: #3498db;
}

</style>
