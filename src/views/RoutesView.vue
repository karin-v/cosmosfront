<template>
  <div class="route-info-container">

    <LoginRequiredModal
        :modalIsOpen="showLoginModal"
        @login="navigateToLogin"
        @close="closeModal"
    />

    <BookingDetailsModal
        :modalIsOpen="showBookingModal"
        :route="selectedRoute"
        :provider="selectedProvider"
        @confirm="confirmBooking"
        @close="closeBookingModal"
    />

    <AlertSuccess v-if="successMessage" :message="successMessage"/>
    <AlertDanger :message="errorMessage"/>

    <div class="title-wrapper">
      <div class="main-title">
        <h5>Available Routes</h5>
      </div>
    </div>

    <div class="filters-section">
      <div class="filter-item">
        <label>Sort by:</label>
        <select v-model="sortBy" class="filter-select">
          <option value="price">Price</option>
          <option value="distance">Distance</option>
          <option value="travelTime">Travel Time</option>
        </select>
      </div>

      <div class="filter-item">
        <label>Order:</label>
        <select v-model="sortOrder" class="filter-select">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>

    <AlertDanger :message="errorMessage"/>

    <div class="routes-table-wrapper">
      <div class="routes-table-container">
        <table class="routes-table">
          <thead>
          <tr>
            <th>Company</th>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Travel Time</th>
            <th>Distance</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(routeProvider, index) in flatSortedRoutes" :key="index">
            <tr>
              <td>{{ routeProvider.provider.companyName }}</td>
              <td>{{ routeProvider.route.fromPlanetName }}</td>
              <td>{{ routeProvider.route.toPlanetName }}</td>
              <td>{{ routeProvider.provider.flightStartFormatted }}</td>
              <td>{{ routeProvider.provider.flightEndFormatted }}</td>
              <td>{{ routeProvider.provider.travelTime }}</td>
              <td>{{ routeProvider.route.distance }} AU</td>
              <td>{{ routeProvider.provider.price }} CC</td>
              <td>
                <button
                    @click="bookRoute(routeProvider.route, routeProvider.provider)"
                    class="book-button"
                >
                  Book Flight
                </button>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="back-button-container">
      <button @click="navigateToPlanetsView" class="back-button">
        Back to Search
      </button>
    </div>

    <div class="bottom-nav">
      <router-link to="/" class="bottom-nav-link">Home</router-link>
      <span class="divider">|</span>
      <router-link to="/planets" class="bottom-nav-link">Routes</router-link>

      <template v-if="isLoggedIn">
        <span class="divider">|</span>
        <router-link to="/my-bookings" class="bottom-nav-link">My Bookings</router-link>
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
import NavigationService from '@/services/NavigationService';
import LoginRequiredModal from '@/components/LoginRequiredModal.vue';
import BookingDetailsModal from '@/components/BookingDetailsModal.vue';
import RouteService from '@/services/RouteService';
import ReservationService from '@/services/BookingService';
import AlertDanger from '@/components/alerts/AlertDanger.vue';
import AlertSuccess from '@/components/alerts/AlertSuccess.vue';

export default {
  name: 'RoutesView',
  components: {
    LoginRequiredModal,
    BookingDetailsModal,
    AlertDanger,
    AlertSuccess
  },
  data() {
    return {
      showLoginModal: false,
      showBookingModal: false,
      selectedRoute: null,
      selectedProvider: null,
      modalTimeout: null,
      sortBy: 'price',
      sortOrder: 'asc',
      selectedFromPlanet: '',
      selectedToPlanet: '',
      routes: [],
      errorMessage: '',
      successMessage: '',
      alertTimeout: null
    };
  },
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem('firstName') !== null &&
          sessionStorage.getItem('lastName') !== null;
    },

    filteredRoutes() {
      return this.routes.filter(route => {
        const matchesFrom = !this.selectedFromPlanet || route.fromPlanetName === this.selectedFromPlanet;
        const matchesTo = !this.selectedToPlanet || route.toPlanetName === this.selectedToPlanet;
        return matchesFrom && matchesTo;
      });
    },

    flatSortedRoutes() {
      const now = new Date().toISOString();
      const flatList = [];

      this.filteredRoutes.forEach(route => {
        if (route.providers?.length > 0) {
          const validProviders = route.providers.filter(provider => {
            return provider.pricelistValidUntil && provider.pricelistValidUntil > now;
          });

          validProviders.forEach(provider => {
            flatList.push({ route, provider });
          });
        }
      });

      return flatList.sort((a, b) => {
        let comparison = 0;
        if (this.sortBy === "price") {
          comparison = a.provider.price - b.provider.price;
        } else if (this.sortBy === "distance") {
          comparison = a.route.distance - b.route.distance;
        } else if (this.sortBy === "travelTime") {
          comparison = parseDuration(a.provider.travelTime) - parseDuration(b.provider.travelTime);
        }
        return this.sortOrder === "asc" ? comparison : -comparison;
      });
    }
  },
  mounted() {
    this.selectedFromPlanet = this.$route.query.from || "";
    this.selectedToPlanet = this.$route.query.to || "";
    this.getAllRoutes();
  },
  methods: {
    getAllRoutes() {
      RouteService.sendGetRoutesRequest()
          .then(response => this.handleGetRoutesResponse(response))
          .catch(() => NavigationService.navigateToErrorView());
    },

    handleGetRoutesResponse(response) {
      this.routes = response.data;
      if (this.filteredRoutes.length === 0) {
        this.errorMessage = "No available routes found for the selected planets";
        this.startAlertTimer();
      }
    },

    bookRoute(route, provider) {
      if (this.isLoggedIn) {
        this.selectedRoute = route;
        this.selectedProvider = provider;
        this.showBookingModal = true;
      } else {
        this.showLoginModal = true;
        this.modalTimeout = setTimeout(() => {
          this.showLoginModal = false;
        }, 5000);
      }
    },

    confirmBooking() {

      if (!this.selectedProvider.pricelistId) {
        this.errorMessage = "PricelistId is missing";
        this.startAlertTimer();
        return;
      }

      let travelTimeISO;
      if (this.selectedProvider.travelTimeMinutes) {
        const hours = Math.floor(this.selectedProvider.travelTimeMinutes / 60);
        const minutes = this.selectedProvider.travelTimeMinutes % 60;
        travelTimeISO = `PT${hours}H${minutes}M`;
      }

      const reservation = {
        customerId: sessionStorage.getItem("customerId"),
        customerFirstName: sessionStorage.getItem("firstName"),
        customerLastName: sessionStorage.getItem("lastName"),
        providerId: this.selectedProvider.id,
        price: this.selectedProvider.price,
        flightStart: this.selectedProvider.flightStart,
        flightEnd: this.selectedProvider.flightEnd,
        travelTime: travelTimeISO || `PT0H0M`,
        companyId: this.selectedProvider.companyId,
        companyName: this.selectedProvider.companyName,
        legId: this.selectedProvider.legId,
        routeId: this.selectedRoute.id,
        fromPlanetName: this.selectedRoute.fromPlanetName,
        toPlanetName: this.selectedRoute.toPlanetName,
        distance: this.selectedRoute.distance,
        pricelistId: this.selectedProvider.pricelistId,
        pricelistValidUntil: this.selectedProvider.pricelistValidUntil
      };

      ReservationService.sendBooking(reservation)
          .then(() => {
            this.successMessage = "Booking confirmed!";
            this.showBookingModal = false;

            this.$emit("booking-confirmed)")
            setTimeout(() => {
              this.successMessage = "";
              NavigationService.navigateToBookingsView();
            }, 2000);
          })
          .catch((error) => {
            this.showBookingModal = false;
            this.errorMessage = "Booking confirmation failed";
            this.startAlertTimer();
          });
    },

    closeBookingModal() {
      this.showBookingModal = false;
    },

    closeModal() {
      this.showLoginModal = false;
      if (this.modalTimeout) clearTimeout(this.modalTimeout);
    },

    startAlertTimer() {
      if (this.alertTimeout) clearTimeout(this.alertTimeout);
      this.alertTimeout = setTimeout(() => {
        this.errorMessage = "";
      }, 2000);
    },

    handleLogout() {
      sessionStorage.clear();
      NavigationService.navigateToHomeView();
    },

    navigateToLogin() {
      this.closeModal();
      NavigationService.navigateToLoginView();
    },

    navigateToPlanetsView() {
      NavigationService.navigateToPlanetsView();
    }


  }
};
function parseDuration(isoDuration) {
  const match = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(isoDuration);
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  return hours * 60 + minutes;
}
</script>

<style scoped>
.route-info-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #0f517c, #001c3c);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem 3rem 1rem;
}

.title-wrapper {
  margin-top: 3rem;
  margin-bottom: 2rem;
  text-align: center;
}

.main-title {
  color: #cfc4ab;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.9rem;
  text-shadow: 2px 2px 4px #000000cc, 0 0 15px #cfc4ab, 0 0 25px #cfc4ab;
  font-family: 'Arial', sans-serif;
  font-size: 2rem;
}

.filters-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: rgba(207, 196, 171, 0.1);
  padding: 0.7rem 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-item label {
  color: #cfc4ab;
  font-weight: 600;
}

.filter-select {
  background-color: #cfc4ab;
  color: #001c3c;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 6px;
  padding: 0.25rem 0.6rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}

.routes-table-wrapper {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.routes-table-container {
  width: 100%;
  height: 440px;
  overflow-y: auto;
  overflow-x: auto;
  background-color: rgba(0, 28, 60, 0.5);
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
}

.routes-table-container::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.routes-table-container::-webkit-scrollbar-track {
  background: rgba(0, 28, 60, 0.3);
  border-radius: 10px;
}

.routes-table-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 229, 255, 0.5);
  border-radius: 10px;
  border: 3px solid rgba(0, 28, 60, 0.5);
}

.routes-table-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 229, 255, 0.7);
}

.routes-table {
  width: 100%;
  border-collapse: collapse;
  color: #cfc4ab;
}

.routes-table thead {
  position: sticky;
  top: 0;
  z-index: 1;
}

.routes-table th, .routes-table td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(207, 196, 171, 0.3);
}

.routes-table th {
  background-color: #001c3c;
  color: #00e5ff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.routes-table tr:hover {
  background-color: rgba(207, 196, 171, 0.1);
}

.book-button {
  background-color: #00e5ff;
  color: #001c3c;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.2s;
}

.book-button:hover {
  background-color: #e6dcc0;
  transform: translateY(-2px);
}

.back-button-container {
  margin-top: 1.5rem;
  margin-bottom: 3.5rem;
}

.back-button {
  background-color: rgba(207, 196, 171, 0.2);
  color: #cfc4ab;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 0.95rem;
  border: 1px solid #cfc4ab;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background-color: rgba(207, 196, 171, 0.3);
}

.bottom-nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.bottom-nav-link {
  color: #cfc4ab;
  text-decoration: none;
  margin: 0 15px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9), 0 0 10px rgba(207, 196, 171, 0.5);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 600;
}

.divider {
  color: #cfc4ab;
  opacity: 0.8;
}

.logout-btn {
  background: none;
  border: none;
  color: #cfc4ab;
  font: inherit;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin: 0 15px;
}

.modal-content h4 {
  color: #00e5ff;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
}

.modal-content p {
  color: #cfc4ab;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .filters-section {
    flex-direction: column;
    gap: 0.8rem;
  }

  .main-title {
    font-size: 1.6rem;
    letter-spacing: 0.6rem;
  }

  .routes-table-container {
    height: 390px;
  }
}
</style>