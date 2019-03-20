const firebase = require('firebase/app');
require('firebase/firestore');
const config = {
  apiKey: "AIzaSyATTb8IMgbOuYEVddrU6A112YJkGjcN2nE",
  authDomain: "kanban-kenny.firebaseapp.com",
  databaseURL: "https://kanban-kenny.firebaseio.com",
  projectId: "kanban-kenny",
  storageBucket: "kanban-kenny.appspot.com",
  messagingSenderId: "227089268659"
};

firebase.initializeApp(config);

const db = firebase.firestore();

module.exports = db
