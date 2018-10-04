<template>
    <div id="app">
        <datatable-wrapper @perPageChanged="onPerPageChanged"
                           @searching="onSearch"
                           @gettingRecords="onGettingRecords"
                           @recordsFetched="onRecordsFetched"
                           @columnClicked="onColumnClicked"
                           @prev="onPaginate"
                           @next="onPaginate"
                           @linkClicked="onPaginate"
                           @del="onDelete"
                           @edit="onEdit">
            <template slot="storage" slot-scope="config">
              <datatable-header>
                <datatable-perpage :per-page="['10', '20', '30', '50']"></datatable-perpage>
                <datatable-search></datatable-search>
              </datatable-header>
              <datatable :url="url" :filter="config.filter" :options="options">
                <datatable-loader :is-loading="config.loading"></datatable-loader>
                <datatable-head :columns="config.columns"></datatable-head>
                <datatable-body :records="config.records"></datatable-body>
                <datatable-footer :columns="config.columns"></datatable-footer>
              </datatable>
              <datatable-pagination :pagination="config.pagination"></datatable-pagination>
            </template>
        </datatable-wrapper>
    </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'http://localhost:3000/users',
      options: {
        crud: true
      }
    }
  },
  methods: {
    onPerPageChanged(limit) {
      //
    },
    onSearch(term) {
      //
    },
    onColumnClicked(column, direction) {
      //
    },
    onGettingRecords() {
      //
    },
    onRecordsFetched({columns, datsa, pagination}) {
      //
    },
    onPaginate(page) {
      //
    },
    onDelete(id, reload) {
      // Send an ajax request to the server for deleting a record
      // And finally invoke reload() for refreshing the table.

      reload();
    },
    onEdit(id, reload) {
      // open a modal form for editing a specific record perhaps..
      // when form is submited, send a request to the server to modify the record.
      // finally do remember to invoke reload();

      reload();
    }
  }
}
</script>
