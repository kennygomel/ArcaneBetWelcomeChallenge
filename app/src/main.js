import Vue from 'vue'

import router from './router'

import {store} from './store'

import VueAxios from 'vue-axios'
import {securedAxiosInstance, plainAxiosInstance} from './backend/axios'

import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faSpinner,
  faSignInAlt,
  faUserPlus,
  faKey,
  faHome,
  faList,
  faEye,
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faChevronLeft,
  faSave
} from '@fortawesome/free-solid-svg-icons'
import BootstrapVue from 'bootstrap-vue'

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import VCalendar from 'v-calendar'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'v-calendar/lib/v-calendar.min.css'

import VueCharts from 'vue-chartjs'

import accounting from './common/accounting.min'

import App from './App'

Vue.config.productionTip = false

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

Vue.use(BootstrapVue)

Vue.use(VCalendar, {
  firstDayOfWeek: 2
})

Vue.use(VueCharts)

library.add(
  faSpinner,
  faSignInAlt,
  faUserPlus,
  faKey,
  faHome,
  faList,
  faEye,
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faChevronLeft,
  faSave
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.filter('currency', function (value, decimals) {
  return accounting.formatMoney(value, '$', decimals)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  securedAxiosInstance,
  plainAxiosInstance,
  components: {App},
  render: h => h(App)
})
