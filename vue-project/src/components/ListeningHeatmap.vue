<template>

  <div class="heatmap-wrapper">

    <div class="weekday-labels">

      <span></span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
      <span>Sun</span>

    </div>

    <div class="heatmap-container">
      <div class="month-labels">

      <span
        v-for="month in months"
        :key="month.name"
        :style="{
          width: `${month.weeks * 21}px`
        }"
      >
        {{ month.name }}
      </span>

      </div>

      <div class="heatmap">

        <div
          v-for="(week, index) in weeks"
          :key="index"
          class="week"
        >

          <div
            v-for="(day, index) in week"
            :key="day ? day.day : index"
            class="day"
            :class="day ? getLevel(day.plays) : 'empty'"
            @mouseenter="day && showTooltip($event, day)"
            @mouseleave="hideTooltip"
          >
          </div>

        </div>

      </div>
    </div>

    <div
      v-if="tooltip.visible"
      class="tooltip"
      :style="{
    left: tooltip.x + 'px',
    top: tooltip.y + 'px'
  }"
    >

      <strong>
        🎵 {{ tooltip.day.plays }} songs
      </strong>
      <br>
      📅 {{ tooltip.day.day }}
    </div>

  </div>

</template>


<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  calendar: {
    type: Array,
    required: true
  }
});


const weeks = computed(() => {
  const result = [];
  let week = Array(7).fill(null);

  props.calendar.forEach(day => {
    const date = new Date(day.day);
    let weekday = date.getDay();

    // Convert JavaScript:
    // Sunday = 0
    // Monday = 1
    //
    // Into:
    // Monday = 0
    // Tuesday = 1
    // ...
    // Sunday = 6

    weekday = weekday === 0 ? 6 : weekday - 1;
    week[weekday] = day;

    // When Sunday arrives, the week is complete
    if (weekday === 6) {
      result.push(week);
      week = Array(7).fill(null);
    }
  });

  // Add remaining days
  if (week.some(day => day !== null)) {
    result.push(week);
  }

  return result;
});

const getLevel = (plays) => {
  if (plays === 0) {
    return "level-0";
  }
  if (plays <= 5) {
    return "level-1";
  }
  if (plays <= 10) {
    return "level-2";
  }
  if (plays <= 20) {
    return "level-3";
  }

  return "level-4";
};

const months = computed(() => {

  const result = [];
  let currentMonth = null;

  weeks.value.forEach((week, index) => {

    const firstDay = week.find(day => day !== null);

    if (!firstDay) {
      return;
    }

    const date = new Date(firstDay.day);

    const month = date.toLocaleString(
      "default",
      {
        month: "short"
      }
    );

    if (month !== currentMonth) {
      result.push({
        name: month,
        weeks: 1
      });

      currentMonth = month;

    } else {
      result[result.length - 1].weeks++;
    }
  });
  return result;
});

const tooltip = ref({
  visible: false,
  day: null,
  x: 0,
  y: 0
});

const showTooltip = (event, day) => {
  tooltip.value = {
    visible: true,
    day: day,
    x: event.pageX + 10,
    y: event.pageY + 10
  };
};

const hideTooltip = () => {
  tooltip.value.visible = false;
};

</script>


<style scoped>

.heatmap-wrapper {
  display: flex;
}

.weekday-labels {
  display: grid;
  grid-template-rows: repeat(7, 16px);
  gap: 5px;
  margin-right: 10px;
  font-size: 12px;
  color: #777;
}

.heatmap {
  display: flex;
  gap: 5px;
}

.week {
  display: grid;
  grid-template-rows: repeat(7, 16px);
  gap: 5px;
}

.day {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.level-0 {
  background: #eeeeee;
}

.level-1 {
  background: #b7e4c7;
}

.level-2 {
  background: #74c69d;
}

.level-3 {
  background: #40916c;
}

.level-4 {
  background: #1b4332;
}

.month-labels {
  display: flex;
  font-size: 12px;
  color: #777;
  margin-bottom: 8px;
}

.month-labels span {
  flex-shrink: 0;
}

.empty {
  background: transparent;
}

.tooltip {
  position: fixed;
  background: #222;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  z-index: 1000;
}

</style>
