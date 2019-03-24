import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCFhS_7Mh5xaBZYCc3hypgF3kQ0lz6PbYk",
  authDomain: "realtime-kanban-3590a.firebaseapp.com",
  databaseURL: "https://realtime-kanban-3590a.firebaseio.com",
  projectId: "realtime-kanban-3590a",
  storageBucket: "realtime-kanban-3590a.appspot.com",
  messagingSenderId: "847064548160"
};
firebase.initializeApp(config);

const db = firebase.firestore();
export default db;
