import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyC5FmrXLS50tFFaOktzxz2IyjN1Wxn3Ouc",
    authDomain: "kanban-e59e5.firebaseapp.com",
    databaseURL: "https://kanban-e59e5.firebaseio.com",
    projectId: "kanban-e59e5",
    storageBucket: "kanban-e59e5.appspot.com",
    messagingSenderId: "380162582541"
  };
firebase.initializeApp(config);
const db = firebase.firestore()

export default db