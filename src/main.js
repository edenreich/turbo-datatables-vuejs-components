// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import Datatables from '../plugin';

Vue.use(Datatables);

Vue.config.productionTip = false;

export const EventBus = new Vue({});

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
