import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import storeHelper from './store/helper';

import Directions from './plugins/Directions';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(Directions, { rtl: true });
const store = storeHelper.generateStore();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
