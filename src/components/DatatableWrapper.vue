<template>
  <div id="datatables">
    <div class="dataTables_wrapper dt-bootstrap4">
      <datatable-header>
        <datatable-perpage :perPage="perPage" @perPageChanged="onPerPageChanged"></datatable-perpage>
        <datatable-search @searching="onSearch"></datatable-search>
      </datatable-header>
      <datatable url="http://localhost:3000/people" :data="requestData" @recordsFetched="onRecordsFetched">
          <datatable-head :columns="columns" @columnClicked="onColumnClicked"></datatable-head>
          <datatable-body :columns="columns" :records="records"></datatable-body>
          <datatable-footer :columns="columns"></datatable-footer>
      </datatable>
      <datatable-pagination :short="pagination.totalPages > 10 ? true : false"
                            :pagination="pagination"
                            @prev="requestData.page = arguments[0]"
                            @next="requestData.page = arguments[0]"
                            @linkClicked="requestData.page = arguments[0]">
      </datatable-pagination>
    </div>
  </div>
</template>

<script>
import Datatable from './Datatable.vue';
import DatatableHeader from './DatatableHeader.vue';
import DatatableSearch from './DatatableSearch.vue';
import DatatablePerPage from './DatatablePerPage.vue';
import DatatableHead from './DatatableHead.vue';
import DatatableBody from './DatatableBody.vue';
import DatatableFooter from './DatatableFooter.vue';
import DatatablePagination from './DatatablePagination.vue';

export default {
  name: 'DatatableWrapper',
  components: {
    'datatable': Datatable,
    'datatable-header': DatatableHeader,
    'datatable-perpage': DatatablePerPage,
    'datatable-search': DatatableSearch,
    'datatable-head': DatatableHead,
    'datatable-body': DatatableBody,
    'datatable-footer': DatatableFooter,
    'datatable-pagination': DatatablePagination
  },
  data() {
    return {
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
    },
    onSearch(term) {
      this.requestData.search = term;
    },
    onColumnClicked(column, direction) {
      this.requestData.direction = direction;
      this.requestData.column = column;
    },
    onRecordsFetched(response) {
      this.columns = response.columns;
      this.records = response.data;
      this.pagination = response.pagination || {};
    }
  }
}
</script>

<style>

</style>
