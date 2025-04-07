<template>
  <div
      v-if="message && message.length > 0"
      class="alert-box danger"
      role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'AlertDanger',
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

  background: linear-gradient(to right, #ff4f4f, #ff7f50);
  color: #fff;
  border: 2px solid #ff7f50;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);

  white-space: nowrap;
  width: fit-content;
  max-width: 90%;
}

.danger {
  background: linear-gradient(to right, #ff4f4f, #ff7f50);
  color: #fff;
  border: 2px solid #ff7f50;
}
</style>
