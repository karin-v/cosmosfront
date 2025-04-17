<template>
  <div class="bookings-container">
    <div class="title-wrapper">
      <div class="main-title">
        <div>
          <h5>My Bookings</h5>
        </div>
        <div class="customer-name">
          <h6>{{ customerName }}</h6>
        </div>
      </div>
    </div>

    <div class="bookings-section">
      <div class="bookings-table" v-if="bookings.length > 0">
        <div class="booking-row header-row">
          <span>Booked At</span>
          <span>From</span>
          <span>To</span>
          <span>Departure</span>
          <span>Arrival</span>
          <span>Travel Time</span>
          <span>Company</span>
          <span>Price</span>
        </div>

        <div class="bookings-content">
          <div
              v-for="booking in bookings"
              :key="booking.id"
              class="booking-row"
          >
            <span>{{ formatDate(booking.createdAt) }}</span>
            <span>{{ booking.fromPlanetName }}</span>
            <span>{{ booking.toPlanetName }}</span>
            <span>{{ formatDate(booking.flightStart) }}</span>
            <span>{{ formatDate(booking.flightEnd) }}</span>
            <span>{{ booking.travelTimeFormatted }}</span>
            <span>{{ booking.companyName }}</span>
            <span>{{ booking.price }} CC</span>
          </div>
        </div>
      </div>

      <div v-else class="no-bookings">
        <p>You have no bookings yet</p>
      </div>
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
import BookingService from "@/services/BookingService";

export default {
  name: "BookingsView",
  data() {
    return {
      bookings: [],
      errorMessage: "",
      customerName: ""
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

      BookingService.getBookingsByCustomerId(customerId)
          .then(response => {
            this.bookings = response.data;

            if (this.bookings.length > 0) {
              const booking = this.bookings[0];
              this.customerName = `${booking.customerFirstName} ${booking.customerLastName}`;
            }
          })
          .catch(() => {
            this.errorMessage = "Failed to load your bookings.";
          });
    },


    handleLogout() {
      sessionStorage.clear();
      NavigationService.navigateToHomeView();
    },

    formatDate(datetime) {
      if (!datetime) return '';
      const options = {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'};
      return new Date(datetime).toLocaleString('en-GB', options);
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
  padding-bottom: 80px;
}

.bookings-section {
  width: 90%;
  max-width: 1200px;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.bookings-table {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.bookings-content {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 5px;
}

.booking-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr 1.2fr 1fr 1fr 0.8fr;
  gap: 10px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 0.95rem;
  align-items: center;
}

.header-row {
  font-weight: bold;
  background: #e3e3e3;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  z-index: 1;
}

.no-bookings {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
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

.customer-name {
  margin-top: 10px;
  color: #001c3c;
  font-size: 1.2rem;
  font-weight: normal;
  font-family: 'Arial', sans-serif;
  text-transform: none;
  letter-spacing: normal;
  text-shadow: none;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #cfc4ab;
  padding: 1rem 0;
  text-align: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
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

/* Scrollbar */
.bookings-content::-webkit-scrollbar {
  width: 8px;
}

.bookings-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.bookings-content::-webkit-scrollbar-thumb {
  background: #00e5ff;
  border-radius: 4px;
}

.bookings-content::-webkit-scrollbar-thumb:hover {
  background: #008c99;
}
</style>
