import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDT3eaKC5E_ry4X1qIKN6w-vsSdzTcr8V8',
    authDomain: 'kanbantodolist.firebaseapp.com',
    databaseURL: 'https://kanbantodolist.firebaseio.com',
    projectId: 'kanbantodolist',
    storageBucket: 'kanbantodolist.appspot.com',
    messagingSenderId: '417300475235',
};
firebase.initializeApp(config);
const db = firebase.firestore();
export default db;
