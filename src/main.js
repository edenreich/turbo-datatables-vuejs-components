// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import DatatableWrapper from './components/DatatableWrapper';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { DatatableWrapper },
  template: '<DatatableWrapper/>'
})
