import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBPXGMJW3FEUfHfs_YuKeVnoQdS087B4z4",
  authDomain: "nxt-gig.firebaseapp.com",
  projectId: "nxt-gig",
  storageBucket: "nxt-gig.appspot.com",
  messagingSenderId: "522375441694",
  appId: "1:522375441694:web:0deb39d89c58cc3e6c2d0f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
