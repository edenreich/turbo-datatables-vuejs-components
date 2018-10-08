<template>
  <div id="app">
    <datatable-theme-provider name="bootstrap4">
      <datatable-wrapper
        :options="options"
        @perPageChanged="onPerPageChanged"
        @searching="onSearch"
        @gettingRecords="onGettingRecords"
        @recordsFetched="onRecordsFetched"
        @columnClicked="onColumnClicked"
        @prev="onPaginate"
        @next="onPaginate"
        @linkClicked="onPaginate"
        @del="onDelete"
        @edit="onEdit">
        <template
          slot="storage"
          slot-scope="config">
          <datatable-header>
            <datatable-perpage :per-page="['10', '20', '30', '50']" />
            <datatable-search />
          </datatable-header>
          <datatable
            :url="url"
            :filter="config.filter">
            <datatable-loader :is-loading="config.loading" />
            <datatable-head :columns="config.columns" />
            <datatable-body :records="config.records" />
            <datatable-footer :columns="config.columns" />
          </datatable>
          <datatable-pagination :pagination="config.pagination" />
        </template>
      </datatable-wrapper>
    </datatable-theme-provider>
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
      console.log('Limt changed:', limit);
    },
    onSearch(term) {
      console.log('Search term changed:', term);
    },
    onColumnClicked(column, direction) {
      console.log('Column clicked:', column, direction);
    },
    onGettingRecords() {
      //
    },
    onRecordsFetched({columns, data, pagination}) {
      console.log('Records were fetched:', columns, data, pagination);
    },
    onPaginate(page) {
      console.log('Page was changed:', page);
    },
    onDelete(id, reload) {
      // Send an ajax request to the server for deleting a record
      // And finally invoke reload() for refreshing the table.
      console.log(`Deleting record ${id}...`);

      reload();
    },
    onEdit(id, reload) {
      // open a modal form for editing a specific record perhaps..
      // when form is submited, send a request to the server to modify the record.
      // finally do remember to invoke reload();
      console.log(`Editing record ${id}...`);

      reload();
    }
  }
}
</script>
