<p align="center"><a href="https://datatables.net/examples/styling/bootstrap4"><img src="https://drive.google.com/uc?export=view&id=1BixUms5LUlR6-6TE3tPASyuTE1QtKLC_"></a></p>

# Vue Datatables

> Server Side Processing Datatables written with Vuejs Framework.

Reference: https://datatables.net/examples/styling/bootstrap4

## The Problem

> Rendering a table of over 5k records on the client-side will make the browser crush.

## The Solution

> By leveraging of server-side pagination we gain a preformance advantange.

## Usage

Choose whatever component you need:
```html
<div id="app">
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
```

## Components Events

| Component                 | Events                         |
| ------------------------- | ------------------------------ |
| `<datatable-perpage/>`    | perPageChanged                 |
| `<datatable-search/>`     | searching                      |
| `<datatable/>`            | gettingRecords, recordsFetched |
| `<datatable-loader/>`     | loading                        |
| `<datatable-head/>`       | columnClicked                  |
| `<datatable-pagination/>` | prev, next, linkClicked        |


## Server-Side

Upcomming ...

## Build

Seed dummy data
```sh
./datatables seed --records 150
```

Run demo server
```sh
npm run demo-server
```

## Todo

- [ ] Set config file where the user can put his database configurations.
- [x] Allow the users to hide columns.
- [ ] Add action component to allow editing or creation of new records. 