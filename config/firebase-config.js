import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCK6waskCLjn5Kmsr0n7W46zzwFOc_w3_U",
  authDomain: "nextjs-app-5a251.firebaseapp.com",
  databaseURL: "https://nextjs-app-5a251.firebaseio.com",
  projectId: "nextjs-app-5a251",
  storageBucket: "nextjs-app-5a251.appspot.com",
  messagingSenderId: "357458582070",
  appId: "1:357458582070:web:189254d3c6d11f5a525697",
};

try {
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig).firestore()
    : firebase.app().firestore();
} catch (error) {
  console.error("Firebase initialization error", error);
}

export default firebase;
