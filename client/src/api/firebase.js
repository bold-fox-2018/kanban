import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBjZN5jeIHSnOugNpXo6tg6uqs-6CNa2yY",
  authDomain: "kanboard-2705.firebaseapp.com",
  databaseURL: "https://kanboard-2705.firebaseio.com",
  projectId: "kanboard-2705",
  storageBucket: "kanboard-2705.appspot.com",
  messagingSenderId: "512805368902"
};

const db = firebase.initializeApp(config).firestore();

export default db;