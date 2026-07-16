<template>
  <div>

    <h1>Artists</h1>

    <div class="sort-buttons">
      <button @click="sortBy = 'plays'">
        Plays
      </button>

      <button @click="sortBy = 'name'">
        Name
      </button>

      <button @click="sortBy = 'date'">
        First listened
      </button>
    </div>


    <p>Total artists: {{ artists.length }}</p>
    <div class="artist-grid">
      <div
        v-for="artist in sortedArtists"
        :key="artist.artist_name"
        class="artist-card"
      >
        <h2>🎤 {{ artist.artist_name }}</h2>

        <div class="artist-info">
          <p>
            🎧 <strong>Plays:</strong> {{ artist.plays }}
          </p>

          <p>
            📅 <strong>First listened:</strong>
            {{ formatDate(artist.listened_at) }}
          </p>
        </div>
      </div>
    </div>



  </div>
</template>


<script setup>

import { ref, computed, onMounted } from "vue";
import { getArtists } from "../api/artist";
const artists = ref([]);
const sortBy = ref("plays");

const fetchArtists = async () => {
  try {
    const res = await getArtists();
    artists.value = res.data.artists;
  } catch (error) {
    console.error(error);
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const sortedArtists = computed(() => {
  const copy = [...artists.value];

  if (sortBy.value === "plays") {
    copy.sort((a, b) => b.plays - a.plays);
  }

  if (sortBy.value === "name") {
    copy.sort((a, b) =>
      a.artist_name.localeCompare(b.artist_name)
    );
  }

  if (sortBy.value === "date") {
    copy.sort(
      (a, b) =>
        new Date(a.listened_at) -
        new Date(b.listened_at)
    );
  }

  return copy;
});

onMounted(fetchArtists);

</script>

<style scoped>

.artist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.artist-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.artist-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.artist-card h2 {
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.artist-info p {
  margin: 8px 0;
}

</style>
