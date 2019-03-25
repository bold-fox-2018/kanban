import Vue from 'vue';
import App from './App.vue';
import router from './router';
import db from './assets/firebase';

Vue.config.productionTip = false;
Vue.prototype.$db = db;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
