<template>
  <div id="datatables">
    <div class="dataTables_wrapper dt-bootstrap4">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      records: [],
      columns: [],
      perPage: [ '10', '20', '30' ],
      requestData: {
        page: 1,
        limit: 10,
        search: '',
        column: 0,
        direction: 'desc'
      },
      pagination: {
        lastPage: null,
        currentPage: null,
        nextPage: null,
        prevPage: null,
        total: null,
        totalPages: null,
        lastPageUrl: '',
        nextPageUrl: '',
        prevPageUrl: '',
        from: null,
        to: null
      }
    }
  }
}
</script>

<style>

</style>
