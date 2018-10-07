<template>
  <div class="col-sm-12 col-md-6">
    <div class="dataTables_filter">
      <label>Search:
        <input
          type="search"
          class="form-control form-control-sm"
          placeholder=""
          @input="$parent.$parent.$emit('searching', $event.target.value)">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  }
}
</script>
