import { initializeApp } from 'firebase';


// Initialize Firebase
const app = initializeApp({
  apiKey: 'AIzaSyAYXM41Up9zESJQBBQvrV1_2VhPBbb1AzA',
  authDomain: 'kanban-b6c31.firebaseapp.com',
  databaseURL: 'https://kanban-b6c31.firebaseio.com',
  projectId: 'kanban-b6c31',
  storageBucket: 'kanban-b6c31.appspot.com',
  messagingSenderId: '593672712378',
});
const db = app.firestore();
export default db;
