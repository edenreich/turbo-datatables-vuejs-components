import DatatableThemeProvider from './src/components/DatatableThemeProvider.vue';
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
import DatatableActionButtons from './src/components/DatatableActionButtons.vue';
import ThemePicker from './src/classes/ThemePicker';

export const components = {
  DatatableThemeProvider,
  DatatableWrapper,
  Datatable,
  DatatableHeader,
  DatatableSearch,
  DatatablePerPage,
  DatatableLoader,
  DatatableHead,
  DatatableBody,
  DatatableFooter,
  DatatablePagination,
  DatatableActionButtons
};

export function install (Vue) {
  if (install.installed) true;

  install.installed = true;

  Vue.prototype.$closest = function(name) {
    let component = this;

    do {
      if (component.$options.name === name) {
        break;
      }

      component = component.$parent;
    } while (component);

    return component;
  };

  Vue.prototype.$theme = new ThemePicker;

  Vue.component('datatable-theme-provider', components.DatatableThemeProvider);
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
  Vue.component('datatable-action-buttons', components.DatatableActionButtons);
}

export const plugin = {
	install,
};

export default plugin;
