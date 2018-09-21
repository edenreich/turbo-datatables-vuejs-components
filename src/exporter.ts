import { Database } from "./Database";
import { Datatables } from './classes/Datatables';
import DatatableWrapper from './components/DatatableWrapper.vue';
import Datatable from './components/Datatable.vue';
import DatatableHeader from './components/DatatableHeader.vue';
import DatatableSearch from './components/DatatableSearch.vue';
import DatatablePerPage from './components/DatatablePerPage.vue';
import DatatableLoader from './components/DatatableLoader.vue';
import DatatableHead from './components/DatatableHead.vue';
import DatatableBody from './components/DatatableBody.vue';
import DatatableFooter from './components/DatatableFooter.vue';
import DatatablePagination from './components/DatatablePagination.vue';

export const components = { 
    DatatableWrapper,
    Datatable,
    DatatableHeader,
    DatatableSearch,
    DatatablePerPage,
    DatatableLoader,
    DatatableHead,
    DatatableBody,
    DatatableFooter,
    DatatablePagination
}

export function datatables(): Promise<Datatables> {
    return Database.connect().then((db) => {
        return new Datatables(db);
    });
}

export default {
    components: components,
    getInstance: datatables
}
