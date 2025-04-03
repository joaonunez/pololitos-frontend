import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "",
  authDomain: "pololitos-a96fb.firebaseapp.com",
  databaseURL: "https://pololitos-a96fb-default-rtdb.firebaseio.com",
  projectId: "pololitos-a96fb",
  storageBucket: "pololitos-a96fb.appspot.com",
  messagingSenderId: "",
  appId: "",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
