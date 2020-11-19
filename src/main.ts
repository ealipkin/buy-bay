import VModal from 'vue-js-modal';
import vueAwesomeCountdown from 'vue-awesome-countdown';
import Paginate from 'vuejs-paginate';
import VueTruncate from 'vue-truncate-filter';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { required } from 'vee-validate/dist/rules.umd';
// import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';

import Vue from 'vue';
import App from './App.vue';
import store from './store';

import './scss/style.scss';
import './assets/fonts/opensans.css';

import router from './router';

Vue.use(vueAwesomeCountdown, 'vac');
Vue.use(VueTruncate);
Vue.use(VueClipboard);
Vue.use(Toasted);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;
Vue.use(VModal);

Vue.component('paginate', Paginate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
