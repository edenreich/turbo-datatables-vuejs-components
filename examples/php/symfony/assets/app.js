window.Vue = require('vue');

import Vue from 'vue';
import App from './App.vue';
import DatatablesComponent from 'turbo-datatables-vuejs-components';

Vue.use(DatatablesComponent);

new Vue({
  el: '#app',
  components: { App },
  template: '<App />'
});