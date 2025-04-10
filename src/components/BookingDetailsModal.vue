<template>
  <Modal :modalIsOpen="modalIsOpen" @event-close-modal="$emit('close')">
    <div class="modal-content">
      <h4 class="modal-title">Confirm Booking</h4>
      <p><strong>From:</strong> {{ route.fromPlanetName }}</p>
      <p><strong>To:</strong> {{ route.toPlanetName }}</p>
      <p><strong>Company:</strong> {{ provider.companyName }}</p>
      <p><strong>Departure:</strong> {{ provider.flightStartFormatted }}</p>
      <p><strong>Arrival:</strong> {{ provider.flightEndFormatted }}</p>
      <p><strong>Price:</strong> {{ provider.price }} CC</p>

      <div class="modal-actions">
        <button @click="$emit('confirm')" class="modal-button confirm-btn">Confirm</button>
        <button @click="$emit('close')" class="modal-button cancel-btn">Cancel</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "BookingDetailsModal",
  components: { Modal },
  props: {
    modalIsOpen: Boolean,
    route: Object,
    provider: Object
  },
};
</script>

<style scoped>
.modal-content {
  background: rgba(207, 196, 171, 0.95);
  color: #001c3c;
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  font-family: 'Arial', sans-serif;
}

.modal-title {
  color: #001c3c;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  text-align: center;
}

.modal-content p {
  margin: 0.4rem 0;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.modal-button {
  width: 48%;
  padding: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.confirm-btn {
  background-color: #00e5ff;
  color: #001c3c;
}

.confirm-btn:hover {
  background-color: #e6dcc0;
  color: #000;
}

.cancel-btn {
  background-color: #cfc4ab;
  color: #001c3c;
}

.cancel-btn:hover {
  background-color: #b8ad94;
  color: #000;
}
</style>
