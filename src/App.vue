<template>
    <div id="app">
        <datatable-wrapper>
            <datatable-header>
                <datatable-perpage :perPage="perPage" 
                                    @perPageChanged="onPerPageChanged">
                </datatable-perpage>
                <datatable-search @searching="onSearch"></datatable-search>
            </datatable-header>
            <datatable url="http://localhost:3000/users" 
                        :data="requestData"
                        @gettingRecords="onGettingRecords"
                        @recordsFetched="onRecordsFetched">
                    <datatable-loader :loading="loading"></datatable-loader>
                    <datatable-head :columns="columns" 
                                    @columnClicked="onColumnClicked">
                    </datatable-head>
                    <datatable-body :columns="columns" 
                                    :records="records">
                    </datatable-body>
                    <datatable-footer :columns="columns"></datatable-footer>
            </datatable>
            <datatable-pagination :short="pagination.totalPages > 10 ? true : false"
                                  :pagination="pagination"
                                  @prev="requestData.page = arguments[0]"
                                  @next="requestData.page = arguments[0]"
                                  @linkClicked="requestData.page = arguments[0]">
            </datatable-pagination>
        </datatable-wrapper>
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
        draw: 0,
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
  },
  methods: {
    onPerPageChanged(limit) {
      this.requestData.limit = limit;
      this.$emit
    },
    onSearch(term) {
      this.requestData.search = term;
    },
    onColumnClicked(column, direction) {
      this.requestData.direction = direction;
      this.requestData.column = column;
    },
    onGettingRecords() {
      this.loading = true;
    },
    onRecordsFetched(response) {
      this.columns = response.columns;
      this.records = response.data;
      this.pagination = response.pagination || {};
      this.loading = false;
    }
  }
}
</script>

