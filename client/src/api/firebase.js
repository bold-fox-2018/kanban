import firebase from "firebase"
var config = {
  apiKey: "AIzaSyAs6xnEX5SXo5NCvoUBEyyf3uYs_i065a4",
  authDomain: "kanban-73214.firebaseapp.com",
  databaseURL: "https://kanban-73214.firebaseio.com",
  projectId: "kanban-73214",
  storageBucket: "kanban-73214.appspot.com",
  messagingSenderId: "42418532252"
};
firebase.initializeApp(config);
const db = firebase.firestore()

// var database = firebase.database()

export default db
