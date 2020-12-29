import VModal from 'vue-js-modal';
import vueAwesomeCountdown from 'vue-awesome-countdown';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import Loading from 'vue-loading-overlay';
import Paginate from 'vuejs-paginate';
import VueTruncate from 'vue-truncate-filter';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';
import { ValidationObserver, ValidationProvider, localize } from 'vee-validate';
import Vue from 'vue';
import { addBasicValidations } from '@/validations';
import { i18n } from './i18n';
import vee_ru from './lang/vee_ru.json';

import App from './App.vue';
import store from './store';

import './scss/style.scss';
import 'vue-loading-overlay/dist/vue-loading.css';
import './assets/fonts/opensans.css';

import router from './router';

const VueInputMask = require('vue-inputmask').default;

Vue.use(Loading);

Vue.use(VueInputMask);

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

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
