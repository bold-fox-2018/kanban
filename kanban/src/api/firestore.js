// let url = 'https://www.gstatic.com/firebasejs/5.8.4/firebase.js'
const firebase = require('firebase/app');
require('firebase/firestore');
require('dotenv').config()

  var config = {
    apiKey: "AIzaSyA1z4zJDX3U1RAu4S4Lia5BW1Ex9uT0KVA",
    authDomain: "benk-s-ban.firebaseapp.com",
    databaseURL: "https://benk-s-ban.firebaseio.com",
    projectId: "benk-s-ban",
    storageBucket: "benk-s-ban.appspot.com",
    messagingSenderId: "487461851153"
  };

  firebase.initializeApp(config);
  const db = firebase.firestore()
  export default db
