<template>
  <tfoot>
    <tr>
      <th
        v-for="column in columns"
        :key="column.name"
        rowspan="1"
        colspan="1">{{ column.label }}</th>
    </tr>
  </tfoot>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>
