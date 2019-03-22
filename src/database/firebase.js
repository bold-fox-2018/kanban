import firebase from "firebase"

var config = {
    apiKey: "AIzaSyCh1_97NTrn63ahjPMDLdNizyt-YAa6Nzo",
    authDomain: "my-kanban-9c460.firebaseapp.com",
    databaseURL: "https://my-kanban-9c460.firebaseio.com",
    projectId: "my-kanban-9c460",
    storageBucket: "my-kanban-9c460.appspot.com",
    messagingSenderId: "905294308308"
}

firebase.initializeApp(config)

const db = firebase.firestore()
export default db