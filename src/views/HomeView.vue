<template>
  <div class="fullscreen-wrapper">
    <div class="image-container">
      <img src="../assets/solar.png" height="1024" width="1536" class="bg-image" alt="Cosmos Odyssey"/>

      <div class="title-wrapper">
        <h1 class="main-title">Cosmos Odyssey</h1>
        <h6 class="subtitle">Solar System Travel Deals</h6>
      </div>

      <div class="bottom-links">
        <router-link to="/planets" class="nav-link-custom">Routes</router-link>

        <template v-if="isLoggedIn">
          <span class="divider">|</span>
          <router-link to="/my-bookings" class="nav-link-custom">My Bookings</router-link>
          <span class="divider">|</span>
          <button @click="handleLogout" class="nav-link-custom logout-btn">Logout</button>
        </template>

        <template v-else>
          <span class="divider">|</span>
          <router-link to="/login" class="nav-link-custom">Login</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationService from "@/services/NavigationService";

export default {
  name: 'HomeView',
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem('firstName') !== null &&
          sessionStorage.getItem('lastName') !== null;
    }
  },
  methods: {
    handleLogout() {
      sessionStorage.clear();
      NavigationService.navigateToHomeView()
    }
  },
}
</script>

<style scoped>

.fullscreen-wrapper {
  margin: 0;
  padding: 0;
  max-width: 100%;
  height: 100vh;
  overflow: hidden;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding-top: 3rem;
}

.main-title {
  color: #00e5ff;
  font-weight: bold;
  font-size: 2.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  text-shadow: 2px 2px 4px #000000cc,
  0 0 15px #cfc4ab,
  0 0 25px #cfc4ab;
  font-family: 'Arial', sans-serif;
}

.subtitle {
  color: #cfc4ab;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.9rem;
  margin-top: 0.5rem;
  text-shadow: 2px 2px 4px #000000cc,
  0 0 15px #cfc4ab,
  0 0 25px #cfc4ab;
  font-family: 'Arial', sans-serif;
}

.bottom-links {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding-bottom: 3rem;
}

.nav-link-custom {
  color: #cfc4ab;
  text-decoration: none;
  margin: 0 15px;
  font-size: 1.0rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 600;
  text-shadow: 1px 1px 3px #000000e6,
  0 0 10px #cfc4ab80;
}

.logout-btn {
  background: none;
  border: none;
  font: inherit;
  color: #cfc4ab;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: underline;
  padding: 0;
  margin: 0 15px;
}

.divider {
  color: #cfc4ab;
  opacity: 0.8;
}
</style>
