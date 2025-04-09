<template>
  <div class="routes-container">
    <div class="title-wrapper">
      <div class="main-title">
        <h5>Routes</h5>
      </div>
    </div>

    <div class="content-center">
      <AlertDanger :message="errorMessage"/>
    </div>

    <div class="content-center">
      <div class="image-wrapper">
        <img src="../assets/travel_routes.png" alt="Travel Routes"/>
      </div>

      <div class="control-row">
        <div class="control-group">
          <div class="from-section">
            <span class="label">FROM</span>
            <PlanetDropdown
                :planets="planets"
                :selectedPlanetName="selectedFromPlanet"
                @event-new-planet-selected="selectedFromPlanet = $event"
            />
          </div>

          <div class="to-section">
            <span class="label">TO</span>
            <PlanetDropdown
                :planets="planets"
                :selectedPlanetName="selectedToPlanet"
                @event-new-planet-selected="selectedToPlanet = $event"
            />
          </div>

          <div class="button-section">
            <button @click="handleRouteSearch" class="find-route-btn">
              Find Route
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-nav">
      <router-link to="/" class="bottom-nav-link">Home</router-link>

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
import PlanetDropdown from "@/components/PlanetDropdown.vue";
import AlertDanger from "@/components/alerts/AlertDanger.vue";
import NavigationService from "@/services/NavigationService";
import PlanetService from "@/services/PlanetService";

export default {
  name: "PlanetsView",
  components: {
    PlanetDropdown,
    AlertDanger,
  },
  data() {
    return {
      planets: [],
      selectedFromPlanet: "",
      selectedToPlanet: "",
      errorMessage: "",
      alertTimeout: null
    };
  },
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem('firstName') !== null &&
          sessionStorage.getItem('lastName') !== null;
    }
  },
  mounted() {
    this.getAllPlanets();
  },
  methods: {
    getAllPlanets() {
      PlanetService.sendGetPlanetsRequest()
          .then((response) => this.handleGetPlanetsResponse(response))
          .catch(() => NavigationService.navigateToErrorView());
    },

    handleGetPlanetsResponse(response) {
      this.planets = response.data;
    },

    handleRouteSearch() {
      const from = this.selectedFromPlanet;
      const to = this.selectedToPlanet;

      if (from && to && from === to) {
        this.errorMessage = "Please select different planets for departure and arrival";
        this.startAlertTimer();
        this.resetPlanetSelections();
        return;
      }

      this.navigateToRoutesView();
    },

    resetPlanetSelections() {
      this.selectedFromPlanet = "";
      this.selectedToPlanet = "";
    },

    handleLogout() {
      sessionStorage.clear();
      NavigationService.navigateToHomeView()
    },

    startAlertTimer() {
      if (this.alertTimeout) clearTimeout(this.alertTimeout);
      this.alertTimeout = setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
    },

    navigateToRoutesView() {
      NavigationService.navigateToRoutesView({
        from: this.selectedFromPlanet,
        to: this.selectedToPlanet
      });
    }
  }
};
</script>

<style scoped>
.routes-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #0f517c, #001c3c);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-wrapper {
  margin-top: 3rem;
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

.content-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
}

.image-wrapper {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #cfc4ab;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(207, 196, 171, 0.4);
  opacity: 0.95;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
}

.control-row {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin-top: 2rem;
}

.control-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 90%;
  max-width: 900px;
}

.from-section, .to-section, .button-section {
  flex: 1;
  display: flex;
  align-items: center;
}

.from-section {
  margin-right: -5px;
}

.to-section {
  margin-left: -5px;
}

.label {
  color: #cfc4ab;
  font-weight: 600;
  margin-right: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
  white-space: nowrap;
}

.button-section {
  justify-content: center;
}

.find-route-btn {
  background-color: #00e5ff;
  color: #001c3c;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  padding: 0.45rem 1rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 36px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.find-route-btn:hover {
  background-color: #e6dcc0;
  color: #000;
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

.logout-btn {
  background: none;
  border: none;
  color: #cfc4ab;
  font: inherit;
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