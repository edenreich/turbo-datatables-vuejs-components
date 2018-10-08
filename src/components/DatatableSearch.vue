<template>
  <div
    id="datatableSearch"
    class="col-sm-12 col-md-6">
    <div class="dataTables_filter">
      <label>Search:
        <input
          type="search"
          class="form-control form-control-sm"
          placeholder=""
          @input="$closest('DatatableWrapper').$emit('searching', $event.target.value)">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatatableSearch'
}
</script>
