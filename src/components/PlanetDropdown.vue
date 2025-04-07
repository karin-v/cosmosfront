<template>
  <select class="form-select" :value="selectedPlanetName" @change="handlePlanetChange">
    <option value="">Planet</option>
    <option v-for="planet in getUniquePlanets(planets)" :key="planet.planetId" :value="planet.planetName">
      {{ planet.planetName }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'PlanetDropdown',
  props: {
    planets: {
      type: Array,
      default: () => []
    },
    selectedPlanetName: {
      type: String,
      default: ''
    }
  },
  methods: {
    handlePlanetChange(event) {
      this.$emit('event-new-planet-selected', event.target.value);
    },
    getUniquePlanets(planets) {
      const planetSet = new Set();
      return planets.filter(planet => {
        if (planetSet.has(planet.planetName)) return false;
        planetSet.add(planet.planetName);
        return true;
      });
    }
  }
};
</script>

<style scoped>
.form-select {
  background-color: #cfc4ab;
  color: #001c3c;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  width: 250px;
}
</style>