<template>
  <div class="error-container">
    <div class="error-box">
      <h2 class="error-title">Oops!</h2>
      <p class="error-message">Something went wrong. Please try again later.</p>
      <router-link to="/" class="error-link">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorView"
};
</script>

<style scoped>
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #0f517c, #001c3c);
}

.error-box {
  background: rgba(207, 196, 171, 0.2);
  border: 1px solid #cfc4ab;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  color: #cfc4ab;
  box-shadow: 0 0 20px rgba(207, 196, 171, 0.3);
}

.error-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #00e5ff;
  text-shadow: 0 0 10px #00e5ff;
  letter-spacing: 0.1rem;
}

.error-message {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.error-link {
  color: #00e5ff;
  font-weight: 600;
  text-decoration: underline;
  font-size: 1rem;
}
</style>
