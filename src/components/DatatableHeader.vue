<template>
  <div
    id="datatableHeader"
    class="row">
    <div class="col-sm-12">
      <table
        role="grid"
        style="width: 100%;">
        <tr>
          <slot />
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatatableHeader'
}
</script>
