import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyD2ilhj0BC9OtGR8DXiAtTBd7QIW42u-3w",
  authDomain: "kanban-39a57.firebaseapp.com",
  databaseURL: "https://kanban-39a57.firebaseio.com",
  projectId: "kanban-39a57",
  storageBucket: "kanban-39a57.appspot.com",
  messagingSenderId: "499016650372"
};
firebase.initializeApp(config);

const database = firebase.firestore();

export default database;
