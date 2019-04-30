import firebase from 'firebase'
 
const config = {
    apiKey: "AIzaSyAJyDzykg9AZyP6CKgOvnL81TIeSoIjGkY",
    authDomain: "kanban-flow-848d0.firebaseapp.com",
    databaseURL: "https://kanban-flow-848d0.firebaseio.com",
    projectId: "kanban-flow-848d0",
    storageBucket: "kanban-flow-848d0.appspot.com",
    messagingSenderId: "904805016988"
};

firebase.initializeApp(config)

const db = firebase.firestore()

// export const google = new firebase.auth.GoogleAuthProvider()
// export const facebook = new firebase.auth.FacebookAuthProvider();
// export const github = new firebase.auth.GithubAuthProvider()

export default db