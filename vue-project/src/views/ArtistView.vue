<template>
  <div>

    <header class="page-header">
      <div>
        <h1>
          Artists
        </h1>
        <p>
          The soundtrack of your days, one artist at a time
        </p>
      </div>

      <div class="artist-count">
        <strong>{{ artists.length }}</strong>
        <span>Artists</span>
      </div>

    </header>

    <div class="sort-buttons">

      <button @click="changeSort('plays')">
        Plays
        <span v-if="sortBy === 'plays'">
      {{ sortDirection === 'asc' ? '↑' : '↓' }}
    </span>
      </button>

      <button @click="changeSort('name')">
        Name
        <span v-if="sortBy === 'name'">
      {{ sortDirection === 'asc' ? '↑' : '↓' }}
    </span>
      </button>

      <button @click="changeSort('date')">
        First listened
        <span v-if="sortBy === 'date'">
      {{ sortDirection === 'asc' ? '↑' : '↓' }}
    </span>
      </button>

    </div>

    <div class="artist-list">

      <div
        v-for="(artist, index) in sortedArtists"
        :key="artist.artist_name"
        class="artist-row"
      >

        <h2>
          <span v-if="index === 0">🥇</span>
          <span v-else-if="index === 1">🥈</span>
          <span v-else-if="index === 2">🥉</span>
          🎤 {{ artist.artist_name }}
        </h2>

        <div class="plays-bar-container">
          <div
            class="plays-bar"
            :style="{ width: getPlayPercentage(artist.plays) + '%' }"
          >
          </div>
        </div>

        <p>
          🎧 {{ artist.plays }} plays
        </p>

        <p>
          📅 First listened:
          {{ formatDate(artist.listened_at) }}
        </p>
      </div>
    </div>
  </div>
</template>


<script setup>

import { ref, computed, onMounted } from "vue";
import { getArtists } from "../api/artist";
const artists = ref([]);
const sortBy = ref("plays");
const sortDirection = ref("desc");

const fetchArtists = async () => {
  try {
    const res = await getArtists();
    artists.value = res.data.artists;
  } catch (error) {
    console.error(error);
  }
};

const changeSort = (field) => {
  if (sortBy.value === field) {
    // Same button clicked: invert direction
    sortDirection.value =
      sortDirection.value === "asc"
        ? "desc"
        : "asc";
  } else {
    // New button clicked
    sortBy.value = field;

    // Default direction
    sortDirection.value =
      field === "name" ? "asc" : "desc";
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getPlayPercentage = (plays) => {
  const maxPlays = Math.max(
    ...artists.value.map(a => a.plays)
  );

  return (plays / maxPlays) * 100;
};

const sortedArtists = computed(() => {
  const copy = [...artists.value];

  copy.sort((a, b) => {
    let result = 0;
    if (sortBy.value === "plays") {
      result = a.plays - b.plays;
    }
    if (sortBy.value === "name") {
      result = a.artist_name.localeCompare(
        b.artist_name
      );
    }

    if (sortBy.value === "date") {
      result =
        new Date(a.listened_at) -
        new Date(b.listened_at);
    }

    return sortDirection.value === "asc"
      ? result
      : -result;
  });

  return copy;
});

onMounted(fetchArtists);

</script>

<style scoped>

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(
    135deg,
    #42b883,
    #35495e
  );

  border-radius: 16px;
  color: white;
}

.page-header h1 {
  margin: 0;
  font-size: 2.2rem;
}

.page-header p {
  margin-top: 8px;
  opacity: 0.9;
  font-size: 1.1rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 25px;
}

.artist-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255,255,255,0.2);
  padding: 15px 25px;
  border-radius: 12px;
}

.artist-count strong {
  font-size: 2rem;
}

.artist-count span {
  font-size: 0.9rem;
}

/* -------------------------
   Sorting buttons
------------------------- */

.sort-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.sort-buttons button {
  border: none;
  padding: 8px 18px;
  border-radius: 20px;
  background: #eeeeee;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.sort-buttons button:hover {
  background: #ddd;
}

.sort-buttons button.active {
  background: #1db954;
  color: white;
}


/* -------------------------
   Artist list
------------------------- */

.artist-list {
  margin-top: 20px;
}

.artist-row {
  padding: 16px 20px;
  margin-bottom: 12px;
  background: white;
  border-radius: 14px;
  box-shadow:
    0 2px 8px rgba(0,0,0,0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.artist-row:hover {
  transform: translateX(5px);
  box-shadow:
    0 5px 12px rgba(0,0,0,0.12);
}


/* -------------------------
   Artist information
------------------------- */

.artist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.artist-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.artist-row p {
  margin: 5px 0;
  color: #555;
}


/* -------------------------
   Plays visualization
------------------------- */

.plays-bar-container {
  height: 12px;
  background: #e5e5e5;
  border-radius: 10px;
  margin: 15px 0;
}

.plays-bar {
  height: 100%;
  background: #1db954;
  border-radius: 10px;
  transition: width 0.3s ease;
}

</style>
