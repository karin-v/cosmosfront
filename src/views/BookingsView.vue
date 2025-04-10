<template>
  <div class="bookings-container">
    <div class="title-wrapper">
      <div class="main-title">
        <h5>My Bookings</h5>
      </div>
    </div>

    <div>

    </div>

    <div>
      <p>Your bookings will be here...</p>
    </div>

    <div class="bottom-nav">
      <router-link to="/" class="bottom-nav-link">Home</router-link>
      <span class="divider">|</span>
      <router-link to="/planets" class="bottom-nav-link">Routes</router-link>
      <template v-if="isLoggedIn">
        <span class="divider">|</span>
        <button @click="handleLogout" class="bottom-nav-link logout-btn">Logout</button>
      </template>
      <template v-else>
        <span class="divider">|</span>
        <router-link to="/login" class="bottom-nav-link">Login</router-link>
      </template>
    </div>
  </div>
</template>

<script>
import NavigationService from "@/services/NavigationService";
import BookingsService from "@/services/BookingService";

export default {
  name: "BookingsView",
  data() {
    return {
      bookings: [],
      errorMessage: ""
    };
  },
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem("customerId") !== null;
    }
  },
  mounted() {
    if (!this.isLoggedIn) {
      NavigationService.navigateToLoginView();
      return;
    }

    this.loadBookings();
  },
  methods: {
    loadBookings() {
      const customerId = sessionStorage.getItem("customerId");
      BookingsService.getBookingsByCustomerId(customerId)
          .then(response => {
            this.bookings = response.data;
          })
          .catch(() => {
            this.errorMessage = "Failed to load your bookings.";
          });
    },
    handleLogout() {
      sessionStorage.clear();
      NavigationService.navigateToHomeView();
    }
  }
};
</script>

<style scoped>
.bookings-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #cfc4ab;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-wrapper {
  margin-top: 3rem;
  text-align: center;
}

.main-title {
  color: #00e5ff;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.9rem;
  text-shadow: 2px 2px 4px #00000099, 0 0 15px #00e5ff;
  font-family: 'Arial', sans-serif;
  font-size: 1.9rem;
}

.bottom-nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.bottom-nav-link {
  color: #001c3c;
  text-decoration: none;
  margin: 0 15px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 600;
}

.logout-btn {
  background: none;
  border: none;
  color: #001c3c;
  font: inherit;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: underline;
  padding: 0;
  margin: 0 15px;
}

.divider {
  color: #001c3c;
  opacity: 0.8;
}
</style>