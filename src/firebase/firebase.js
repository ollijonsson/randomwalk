// Authentication for firebase database / google auth

import * as firebase from 'firebase';

const config = {
  apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_URL_HERE",
    databaseURL: "YOUR_DATABASE_URL_HERE",
    projectId: "PROJECT_ID",
    storageBucket: "BUCKET",
    messagingSenderId: "MESSAGINGI_ID"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };