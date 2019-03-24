import Vue from 'vue';
import firebase from '../api/firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.firebase = firebase;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
