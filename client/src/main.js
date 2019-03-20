import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

/**
 * Firebase
 */
const firebase = require('firebase/app');
require('firebase/firestore');

// Initialize Firebase
const init = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(init);

Vue.prototype.$db = firebase.firestore();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
