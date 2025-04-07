<template>
  <Modal :modalIsOpen="modalIsOpen" @event-close-modal="closeModal">
    <div class="login-modal">
      <div class="modal-content">
        <p>You must be logged in to book a flight</p>
        <div class="modal-buttons">
          <button @click="handleLogin" class="login-button">Log In</button>
          <button @click="closeModal" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'LoginRequiredModal',
  components: {
    Modal
  },
  props: {
    modalIsOpen: Boolean
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    handleLogin() {
      this.$emit('login');
    }
  }
}
</script>

<style scoped>
.login-modal {
  background: linear-gradient(to bottom, #0f517c, #001c3c);
  border: 2px solid #cfc4ab;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
  width: 90%;
  max-width: 400px;
  padding: 2rem;
}

.modal-content {
  text-align: center;
}

.modal-content p {
  color: #cfc4ab;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.login-button {
  background-color: #00e5ff;
  color: #001c3c;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.2s;
}

.login-button:hover {
  background-color: #e6dcc0;
  transform: translateY(-2px);
}

.cancel-button {
  background-color: transparent;
  color: #cfc4ab;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 0.95rem;
  border: 1px solid #cfc4ab;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button:hover {
  background-color: rgba(207, 196, 171, 0.2);
}
</style>
