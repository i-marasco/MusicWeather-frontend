<template>
  <div class="app">
    <nav class="navbar">

      <router-link to="/dashboard">
        🌦️ Dashboard
      </router-link>

      <router-link to="/artist">
        🎤 Artists
      </router-link>

      <router-link to="/weather">
        🌤️ Weather
      </router-link>
    </nav>

    <router-view />

  </div>
</template>


<style scoped>

.navbar {
  display: flex;
  gap: 20px;
  padding: 15px 30px;
  background: #ffffff;
  box-shadow:
    0 2px 8px rgba(0,0,0,0.08);
}

.navbar a {
  text-decoration: none;
  color: #444;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 20px;
  transition: 0.2s;
}

.navbar a:hover {
  background: #eeeeee;
}

.navbar a.router-link-active {
  background: #1db954;
  color: white;
}

</style>
