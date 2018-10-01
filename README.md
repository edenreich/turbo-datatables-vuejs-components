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
    <datatable-wrapper>
        <datatable-header>
            <datatable-perpage :perPage="perPage" 
                               @perPageChanged="onPerPageChanged">
            </datatable-perpage>
            <datatable-search @searching="onSearch"></datatable-search>
        </datatable-header>
        <datatable url="http://localhost:3000/people" 
                   :data="requestData"
                   @gettingRecords="onGettingRecords"
                   @recordsFetched="onRecordsFetched">
                <datatable-loader :loading="loading"></datatable-loader>
                <datatable-head :columns="columns" 
                                @columnClicked="onColumnClicked">
                </datatable-head>
                <datatable-body :records="records"></datatable-body>
                <datatable-footer :columns="columns"></datatable-footer>
        </datatable>
        <datatable-pagination :short="pagination.totalPages > 10 ? true : false"
                              :pagination="pagination"
                              @prev="requestData.page = arguments[0]"
                              @next="requestData.page = arguments[0]"
                              @linkClicked="requestData.page = arguments[0]">
        </datatable-pagination>
    </datatable-wrapper>
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
```

## Components Events

| Component                 | Events                         |
| ------------------------- | ------------------------------ |
| `<datatable-perpage/>`    | perPageChanged                 |
| `<datatable-search/>`     | searching                      |
| `<datatable/>`            | gettingRecords, recordsFetched |
| `<datatable-head/>`       | columnClicked                  |
| `<datatable-pagination/>` | prev, next, linkClicked        |


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
- [ ] Add action buttons component for CRUD operations per record.
- [ ] Add action buttons component for CRUD operations per selection.