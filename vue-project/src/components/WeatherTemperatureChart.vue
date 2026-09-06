<template>
  <div class="weather-chart">
    <h2>Average Temperature</h2>

    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed, watch } from "vue";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  weather: {
    type: Array,
    required: true,
  },
});

const chartData = computed(() => {
  const reversed = [...props.weather].reverse();

  console.log(
    "Chart data:",
    reversed.length,
    reversed[0],
    reversed[reversed.length - 1]
  );

  return {
    labels: reversed.map(w => w.day),

    datasets: [
      {
        label: "Average Temperature",
        data: reversed.map(w => w.avg_temperature),
      },
    ],
  };
});

const chartOptions = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    y: {
      title: {
        display: true,
        text: "Temperature (°C)",
      },
    },

    x: {
      title: {
        display: true,
        text: "Date",
      },
    },
  },
};
</script>

<style scoped>
.weather-chart {
  background: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.weather-chart h2 {
  margin-top: 0;
}
</style>
