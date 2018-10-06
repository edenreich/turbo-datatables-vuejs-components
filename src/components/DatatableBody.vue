<template>
  <tbody v-if="records.length > 0">
    <tr
      v-for="(record, index) in records"
      :key="index"
      :class="index % 2 === 0 ? 'even': 'odd'"
      role="row">
      <td
        v-for="(prop, index) in record"
        :key="index">{{ prop }}</td>
      <datatable-action-buttons
        v-if="$parent.$props.options.crud"
        :record-id="record.id" />
    </tr>
  </tbody>
  <tbody v-else>
    <tr>
      <td
        class="text-center"
        colspan="100%">No matching records found</td>
    </tr>
  </tbody>
</template>

<script>
export default {
    props: {
        records: {
            type: Array,
            default: () => []
        }
    }
}
</script>
