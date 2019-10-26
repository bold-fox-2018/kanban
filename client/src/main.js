import Vue from 'vue'
import App from './App.vue'
import router from './router'

import $ from 'jquery'
window.$ = $
require('jquery-confirm')
require('bootstrap')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
