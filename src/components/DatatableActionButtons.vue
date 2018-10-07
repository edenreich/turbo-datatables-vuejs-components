<template>
  <td>
    <table>
      <tr>
        <td>
          <button
            type="button"
            class="btn btn-info"
            @click.prevent="$parent.$parent.$parent.$emit('edit', recordId, reload)">Edit</button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            @click.prevent="$parent.$parent.$parent.$emit('del', recordId, reload)">Delete</button>
        </td>
      </tr>
    </table>
  </td>
</template>

<script>
export default {
  props: {
    recordId: {
      type: Number,
      required: true
    }
  },
  methods: {
    reload() {
      this.$parent.$parent.getRecords();
    }
  }
}
</script>
