<template>
  <td
    v-if="$closest('DatatableWrapper').options.crud"
    id="datatableCreateButton"
    class="align-baseline text-center">
    <button
      type="button"
      class="btn btn-primary"
      @click.prevent="$closest('DatatableWrapper').$emit('create', reload)">New</button>
  </td>
</template>

<script>
export default {
  methods: {
    reload() {
      this.$closest('DatatableWrapper').$find('Datatable').getRecords();
    }
  }
}
</script>
