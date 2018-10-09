<template>
  <td
    id="datatablePerPage"
    class="dataTables_length">
    <table>
      <tbody>
        <tr>
          <td class="align-baseline">
            <label>Show</label>
          </td>
          <td class="align-baseline">
            <select
              class="custom-select custom-select-sm form-control form-control-sm"
              @change="$closest('DatatableWrapper').$emit('perPageChanged', $event.target.value)">
              <option
                v-for="(records, index) in perPage"
                :key="index"
                :value="records">{{ records }}</option>
            </select>
          </td>
          <td class="align-baseline">
            <label>entries</label>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</template>

<script>
export default {
  name: 'DatatablePerPage',
  props: {
    perPage: {
      type: Array,
      default: () => [ '10', '20', '30' ]
    }
  }
}
</script>
