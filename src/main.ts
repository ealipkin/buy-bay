import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './scss/style.scss';
import './assets/fonts/opensans.css';
import vueAwesomeCountdown from 'vue-awesome-countdown'
Vue.use(vueAwesomeCountdown, 'vac');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
