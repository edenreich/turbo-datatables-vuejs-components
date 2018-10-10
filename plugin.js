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
import DatatableCreateButton from './src/components/DatatableCreateButton.vue';
import DatatableModal from './src/components/DatatableModal.vue';
import DatatableCreateModal from './src/components/DatatableCreateModal.vue';
import DatatableEditModal from './src/components/DatatableEditModal.vue';
import DatatableDeleteModal from './src/components/DatatableDeleteModal.vue';
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
  DatatableActionButtons,
  DatatableCreateButton,
  DatatableModal,
  DatatableCreateModal,
  DatatableEditModal,
  DatatableDeleteModal
};

export function install (Vue) {
  if (install.installed) true;

  install.installed = true;

  // Look up and finds the parent by name.
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

  // Drill down the components recursively until it finds the name.
  Vue.prototype.$find = function(name) {
    for (let i = 0; i < this.$children.length; i++) {
      if (this.$children[i].$options.name !== name) {
        this.$children[i].$find(name);
        continue;
      }

      return this.$children[i];
    }
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
  Vue.component('datatable-create-button', components.DatatableCreateButton);
  Vue.component('datatable-modal', components.DatatableModal);
  Vue.component('datatable-create-modal', components.DatatableCreateModal);
  Vue.component('datatable-edit-modal', components.DatatableEditModal);
  Vue.component('datatable-delete-modal', components.DatatableDeleteModal);
}

export const plugin = {
	install,
};

export default plugin;
