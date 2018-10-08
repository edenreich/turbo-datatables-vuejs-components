<template>
  <td class="action-buttons">
    <table>
      <tr>
        <td>
          <button
            type="button"
            class="btn btn-info"
            @click.prevent="$closest('DatatableWrapper').$emit('edit', recordId, reload)">Edit</button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            @click.prevent="$closest('DatatableWrapper').$emit('del', recordId, reload)">Delete</button>
        </td>
      </tr>
    </table>
  </td>
</template>

<script>
export default {
  name: 'DatatableActionButtons',
  props: {
    recordId: {
      type: Number,
      required: true
    }
  },
  methods: {
    reload() {
      this.$closest('Datatable').getRecords();
    }
  }
}
</script>
