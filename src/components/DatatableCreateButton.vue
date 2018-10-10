<template>
  <td
    v-if="$closest('DatatableWrapper').options.crud"
    id="datatableCreateButton"
    class="align-baseline text-center">
    <button
      type="button"
      class="btn btn-primary"
      @click.prevent="$closest('DatatableWrapper').$emit('create', modal, reload)">New</button>
  </td>
</template>

<script>
export default {
  methods: {
    reload() {
      this.$closest('DatatableWrapper').$find('Datatable').getRecords();
    },
    modal(options) {
      this.$closest('DatatableWrapper').$find('DatatableModal').showModal('create', options);
    }
  }
}
</script>
