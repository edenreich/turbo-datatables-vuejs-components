<template>
  <div id="datatableWrapper">
    <div class="dataTables_wrapper dt-bootstrap4">
      <slot
        :per-page="perPage"
        :columns="columns"
        :records="records"
        :loading="loading"
        :filter="filter"
        :pagination="pagination"
        name="storage" />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatatableWrapper',
  props: {
    options: {
      type: Object,
      default: () => {
        crud: false
      }
    }
 },
 data() {
    return {
      url: 'http://localhost:3000/users',
      loading: true,
      records: [],
      columns: [],
      perPage: [ '10', '20', '30', '50' ],
      filter: {
        page: 1,
        limit: 10,
        search: '',
        column: 0,
        direction: 'desc'
      },
      pagination: {
        lastPage: 0,
        currentPage: 0,
        nextPage: 0,
        prevPage: 0,
        total: 0,
        totalPages: 0,
        lastPageUrl: '',
        nextPageUrl: '',
        prevPageUrl: '',
        from: 0,
        to: 0
      }
    }
  },
  mounted() {
    this.$on('perPageChanged', this.onPerPageChanged);
    this.$on('searching', this.onSearch);
    this.$on('gettingRecords', this.onGettingRecords);
    this.$on('recordsFetched', this.onRecordsFetched);
    this.$on('columnClicked', this.onColumnClicked);
    this.$on('prev', this.onPaginate);
    this.$on('next', this.onPaginate);
    this.$on('linkClicked', this.onPaginate);
  },
  methods: {
    onPerPageChanged(limit) {
      this.filter.limit = limit;
      this.$parent.$emit('perPageChanged', limit);
    },
    onSearch(term) {
      this.filter.search = term;
      this.$parent.$emit('searching', term);
    },
    onColumnClicked(column, direction) {
      this.filter.direction = direction;
      this.filter.column = column;
      this.$parent.$emit('columnClicked', column, direction);
    },
    onGettingRecords() {
      this.loading = true;
      this.$parent.$emit('gettingRecords');
    },
    onRecordsFetched(response) {
      this.columns = response.columns;
      this.records = response.data;
      this.pagination = response.pagination || {};
      this.loading = false;
      this.$parent.$emit('recordsFetched', response.data);
    },
    onPaginate(page) {
      this.filter.page = page;
      this.$parent.$emit('paginating', page);
    }
  }
}
</script>
