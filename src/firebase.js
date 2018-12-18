import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBYDjKxj9eHNyAvUKHu47frMrR9xsjfv7U",
    authDomain: "flamingo-beb8c.firebaseapp.com",
    databaseURL: "https://flamingo-beb8c.firebaseio.com",
    projectId: "flamingo-beb8c",
    storageBucket: "",
    messagingSenderId: "129383236680"
});

const firestore = firebase.firestore();

firestore.settings({
	timestampsInSnapshots: true
});

export { firebaseApp, firestore }
