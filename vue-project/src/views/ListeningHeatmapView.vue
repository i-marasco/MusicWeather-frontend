<template>

  <div class="activity">

    <div class="page-header">

      <h1>🎧 Listening Activity</h1>

      <p>
        Explore your listening habits over time.
      </p>

    </div>

    <ListeningHeatmap
      :calendar="calendar"
    />

  </div>

</template>




<script setup>

import { ref, onMounted } from "vue";
import ListeningHeatmap from "../components/ListeningHeatmap.vue";
import { getListeningActivity } from "../api/activity";

const calendar = ref([]);

const fetchActivity = async () => {

  try {
    const response = await getListeningActivity();
    console.log(response.data);
    calendar.value = response.data.calendar;

  } catch(error) {

    console.error(
      "Activity error:",
      error
    );

  }

};

onMounted(fetchActivity);

</script>

<style scoped>

.activity {
  padding: 30px;
}

.page-header {
  margin-bottom: 25px;
}

.page-header h1 {
  margin: 0;
  font-size: 2.4rem;
}

.page-header p {
  margin-top: 10px;
  color: #666;
  font-size: 1.1rem;
}

</style>
