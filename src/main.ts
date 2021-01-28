import VModal from 'vue-js-modal';
import { VueMaskDirective } from 'v-mask';
import vueAwesomeCountdown from 'vue-awesome-countdown';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import Loading from 'vue-loading-overlay';
import Paginate from 'vuejs-paginate';
import VueTruncate from 'vue-truncate-filter';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';
import {
  ValidationObserver, ValidationProvider, localize, setInteractionMode,
} from 'vee-validate';
import Vue from 'vue';
import { addBasicValidations } from '@/validations';
import VueAuth from '@websanova/vue-auth/dist/v2/vue-auth.esm';

import { i18n } from './i18n';
import vee_ru from './lang/vee_ru.json';
import authConfig from './auth';

import router from './router';

import App from './App.vue';
import store from './store';

import './scss/style.scss';
import 'vue-loading-overlay/dist/vue-loading.css';
import './assets/fonts/opensans.css';

Vue.use(VueAuth, authConfig);

Vue.directive('mask', VueMaskDirective);

Vue.use(Loading);

Vue.use(VueFilterDateFormat, {
  dayOfWeekNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayOfWeekNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Tr', 'Fr', 'Sa'],
  monthNames: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
  monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  // Timezone offset, in minutes (0 - UTC, 180 - Russia, undefined - current)
  timezone: 180,
});

Vue.use(vueAwesomeCountdown, 'vac');
Vue.use(VueTruncate);
Vue.use(VueClipboard);
Vue.use(Toasted);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
addBasicValidations();

Vue.config.productionTip = false;
Vue.use(VModal);
localize('ru', vee_ru);
Vue.component('paginate', Paginate);

setInteractionMode('custom', (context) => {
  if (context.value && context.flags.validated) {
    return {
      on: ['input'],
    };
  }
  return ({
    on: [],
  });
});

const vm = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

export { vm };
