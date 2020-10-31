import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './scss/style.scss';
import './assets/fonts/opensans.css';
import vueAwesomeCountdown from 'vue-awesome-countdown'
import VueTruncate from 'vue-truncate-filter';

Vue.use(vueAwesomeCountdown, 'vac');
Vue.use(VueTruncate);

import VModal from 'vue-js-modal'

Vue.config.productionTip = false;
Vue.use(VModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
