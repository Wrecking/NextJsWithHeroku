import firebase from "firebase";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

try {
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig).firestore()
    : firebase.app().firestore();
} catch (error) {
  console.error("Firebase initialization error", error);
}

export default firebase;
