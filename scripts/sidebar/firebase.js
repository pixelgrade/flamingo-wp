import firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDCRHpo1MuTo1qlLD8vfjkQ6ZuhCvgKVjk",
    authDomain: "style-manager-1540478992424.firebaseapp.com",
    databaseURL: "https://style-manager-1540478992424.firebaseio.com",
    projectId: "style-manager-1540478992424",
    storageBucket: "style-manager-1540478992424.appspot.com",
    messagingSenderId: "662262706587"
});

const firestore = firebase.firestore();

firestore.settings({
    timestampsInSnapshots: true
});

export { firebaseApp, firestore }
