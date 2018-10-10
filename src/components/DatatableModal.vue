<template>
  <transition :name="overlayTransition">
    <div
      v-if="show"
      class="modal-mask">
      <div
        :width="width"
        :height="height"
        :style="{ 'max-width': maxWidth }"
        class="modal-wrapper">
        <div
          class="modal-container">
          <component
            :options="options"
            :is="view" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DatatableModal',
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    maxWidth: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: 'auto'
    },
    overlayTransition: {
      type: String,
      default: 'modal-mask'
    },
  },
  data() {
    return {
      show: false,
      view: 'datatable-create-modal',
      options: {
        confirmed: () => {},
        canceled: () => {}
      }
    }
  },
  methods: {
    showModal(type, options) {
      this.view = `datatable-${type}-modal`;
      this.options = options;

      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
}
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    opacity: 1;
  }

  .modal-wrapper {
    position: relative;
    min-width: 300px;
    width: auto;
    height: auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 1.75rem auto;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .3rem;
    outline: 0;
  }

  .modal-mask-enter-active,
  .modal-mask-leave-active {
    transition: all 0.2s;
  }
  .modal-mask-enter,
  .modal-mask-leave-active {
    opacity: 0;
  }
</style>
