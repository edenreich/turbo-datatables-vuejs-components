<template>
  <div>
    <div class="modal-header">
      <slot name="header">
        Create
      </slot>
    </div>

    <div class="modal-body">
      <slot name="body">
        Datatable Create Modal Default Body
      </slot>
    </div>

    <div class="modal-footer">
      <slot name="footer">
        <button
          class="btn btn-default"
          @click.prevent="close">Cancel</button>
        <button
          class="btn btn-primary"
          @click.prevent="confirmed">Create</button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatatableCreateModal',
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
