<p align="center"><a href="https://datatables.net/examples/styling/bootstrap4"><img src="https://drive.google.com/uc?export=view&id=1BixUms5LUlR6-6TE3tPASyuTE1QtKLC_"></a></p>

# Vuejs Datatables Components

> Server Side Processing Datatables Components for Vuejs Framework.

Reference: https://datatables.net/examples/styling/bootstrap4

## The Problem

> Rendering a table of over 5k records on the client-side will make the browser crush.

## The Solution

> By leveraging of server-side pagination we gain a preformance advantange.

## Installation
Inside the vue project run:
```sh
npm i turbo-datatables-vuejs-components
```

## Quickstart
Inside main.js file or the js file entry point where your vue app starts add:
```javascript
import Vue from 'vue'
import App from './App'
import DatatablesComponents from 'turbo-datatables'

Vue.use(DatatablesComponents); // This line of code will make the components available in your app.

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

You are all set, look at usage to understand how to apply the components.

## Usage

Choose which component you need, the whole structure looks like the following:
```html
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
```

## Components Events Table

| Component                     | Events                          | Description
| ----------------------------- | ------------------------------- |-----------------------------------------
| `<datatable-wrapper/>`        | - perPageChanged                | Whenever per page select input has been changed.
|                               |                                 |
|                               | - searching                     | Whenever the user searches, delayed by 500ms.
|                               |                                 |
|                               | - gettingRecords                | Before sending the ajax.
|                               | - recordsFetched                | After records retrieved.
|                               |                                 |
|                               | - columnClicked                 | Whenever the user clicks the column name.
|                               |                                 | search is applied on the clicked column.
|                               |                                 |
|                               | - prev                          | User clicked previous.
|                               | - next                          | User clicked next.
|                               | - linkClicked                   | User clicked on a link number.
|                               |                                 |
|                               | - edit                          | User clicked on edit button.
|                               | - del                           | User clicked on delete button.


## Server-Side

For server-side solution please take a look at **[turbo-datatables-response](https://github.com/edenreich/turbo-datatables-response)** NPM package.


> In general the datatable will make an ajax request to the given url and will expect a JSON response in the following format:
```javascript
{
  "columns": [
    {
      "name": "id",
      "label": "#",
      "width": "33%"
    },
    {
      "name": "email",
      "label": "Email",
      "width": "33%"
    },
    {
      "name": "phone",
      "label": "Phone",
      "width": "33%"
    }
  ],
  "data": [
    {
      "id": 1,
      "email": "Willow_Kassulke91@gmail.com",
      "phone": "1-196-138-6202 x30775"
    },
    ...
  ],
  "pagination": {
    "currentPage": 1,
    "nextPage": 2,
    "prevPage": 1,
    "lastPage": 50,
    "total": 50,
    "totalPages": 5,
    "lastPageUrl": "?page=5", // optional
    "nextPageUrl": "?page=2", // optional
    "prevPageUrl": "?page=1", // optional
    "from": 1,
    "to": 10
  }
}
```

This example will create a table with 3 columns: id, name, email.

## Todo

- [ ] Add possiblity to inject different style themes.
- [x] Add action buttons component for CRUD operations per record.
- [ ] Add action buttons component for CRUD operations per selection.