<!-- Modal.vue -->
<template>
  <div class="interiorguidemodal">
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <slot></slot>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
          </slot>
        </footer>
      </div>
    </div>
  </transition>
  </div>
</template>

<style>

.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal-window {
    max-width: 1400px;
    width: 150%; /* 모달 창의 너비 설정 */
    max-height: 1200px;
  }
  &-window {
    background: white;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    max-width: 600px;
    width: 100%;
  }

  &-content {
    margin-bottom: 20px;
  }

  &-footer {
    text-align: right;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
<script setup>
</script>