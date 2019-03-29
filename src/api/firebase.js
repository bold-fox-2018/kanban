import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB0aPTPCY9eZtqhIRlBS9LVNdoTOc2Fe7Y',
  authDomain: 'kanban-75fa3.firebaseapp.com',
  databaseURL: 'https://kanban-75fa3.firebaseio.com',
  projectId: 'kanban-75fa3',
  storageBucket: 'kanban-75fa3.appspot.com',
  messagingSenderId: '721943023873',
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
