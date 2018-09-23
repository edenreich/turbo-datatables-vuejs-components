import DatatableWrapper from './src/components/DatatableWrapper.vue';
import Datatable from './src/components/Datatable.vue';
import DatatableHeader from './src/components/DatatableHeader.vue';
import DatatableSearch from './src/components/DatatableSearch.vue';
import DatatablePerPage from './src/components/DatatablePerPage.vue';
import DatatableLoader from './src/components/DatatableLoader.vue';
import DatatableHead from './src/components/DatatableHead.vue';
import DatatableBody from './src/components/DatatableBody.vue';
import DatatableFooter from './src/components/DatatableFooter.vue';
import DatatablePagination from './src/components/DatatablePagination.vue';

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
};

export default {
    install (Vue) {
        Vue.component('datatable-wrapper', components.DatatableWrapper);
        Vue.component('datatable', components.Datatable);
        Vue.component('datatable-header', components.DatatableHeader);
        Vue.component('datatable-search', components.DatatableSearch);
        Vue.component('datatable-perpage', components.DatatablePerPage);
        Vue.component('datatable-loader', components.DatatableLoader);
        Vue.component('datatable-head', components.DatatableHead);
        Vue.component('datatable-body', components.DatatableBody);
        Vue.component('datatable-footer', components.DatatableFooter);
        Vue.component('datatable-pagination', components.DatatablePagination);
    }
}
