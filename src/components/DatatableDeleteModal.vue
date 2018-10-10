<template>
  <div>
    <div class="modal-header">
      <slot name="header">
        Delete
      </slot>
    </div>

    <div class="modal-body">
      <slot name="body">
        Are you sure you want to delete it ?
      </slot>
    </div>

    <div class="modal-footer">
      <slot name="footer">
        <button
          class="btn btn-default"
          @click.prevent="close">Cancel</button>
        <button
          class="btn btn-danger"
          @click.prevent="confirmed">Ok</button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatatableDeleteModal',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    confirmed() {
      this.options.confirmed();
      this.$parent.close();
    },
    close() {
      this.options.canceled();
      this.$parent.close();
    }
  }
}
</script>
