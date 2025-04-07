<template>
  <div
      v-if="message && message.length > 0"
      class="alert-box success"
      role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'AlertSuccess',
  props: {
    message: String
  }
}
</script>

<style scoped>
.alert-box {
  margin: 1rem auto;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04rem;
  max-width: 360px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
}

.success {
  background: linear-gradient(to right, #00e5aa, #00e5ff);
  color: #001c3c;
  border: 2px solid #00e5ff;
}
</style>
