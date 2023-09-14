import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdg-s3XCa79-AwWm-8sTWM5QfqLIsLE18",
  authDomain: "papertrading-fbe74.firebaseapp.com",
  projectId: "papertrading-fbe74",
  storageBucket: "papertrading-fbe74.appspot.com",
  messagingSenderId: "1096931459399",
  appId: "1:1096931459399:web:638ed75391623b09e80c62",
  measurementId: "G-2QTG4D8Y8W",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
