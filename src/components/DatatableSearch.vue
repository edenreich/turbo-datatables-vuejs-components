<template>
  <td
    id="datatableSearch"
    class="dataTables_filter">
    <table width="100%">
      <tbody>
        <tr>
          <td class="align-baseline">
            <div class="text-right">
              <label>Search:</label>
            </div>
          </td>
          <td class="align-baseline">
            <div class="form-group">
              <input
                type="search"
                class="form-control form-control-sm pull-right"
                @input="$closest('DatatableWrapper').$emit('searching', $event.target.value)">
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</template>

<script>
export default {
  name: 'DatatableSearch'
}
</script>
