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
        @create="onCreate"
        @edit="onEdit"
        @del="onDelete">
        <template
          slot="storage"
          slot-scope="config">
          <datatable-modal />
          <datatable-header>
            <datatable-perpage :per-page="['10', '20', '30', '50']" />
            <datatable-create-button />
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
    async onCreate(modal, reload) {
      // open a modal form for creating a record
      // when the form is submited, send a request to the server to create the record.
      // finally do remember to invoke reload();

      modal({
        confirmed: (inputs) => {
          console.log(`Creating a record...`);
          // const response = await axios.get('/create');
          reload();
        },
        canceled: () => {
          console.log(`Creating a record was canceled...`);
        }
      });

    },
    async onEdit(id, modal, reload) {
      // open a modal form for editing a specific record
      // when the form is submited, send a request to the server to modify the record.
      // finally do remember to invoke reload();

      modal({
        confirmed: (inputs) => {
          console.log(`Editing record ${id}...`);
          // const response = await axios.get('/update');
          reload();
        },
        canceled: () => {
          console.log(`Editing record ${id} was canceled...`);
        }
      });
    },
    async onDelete(id, prompt, reload) {
      // Send an ajax request to the server for deleting a record
      // And finally invoke reload() for refreshing the table.

      prompt({
        confirmed: () => {
          console.log(`Deleting record ${id}...`);
          // const response = await axios.get('/delete');
          reload();
        },
        canceled: () => {
          console.log(`Deleting record ${id} was canceled...`);
        }
      });
    }
  }
}
</script>
