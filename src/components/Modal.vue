<template>
  <div v-if="modalIsOpen"
       class="modal-overlay"
       @click.self="$emit('event-close-modal')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modalIsOpen: Boolean
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
