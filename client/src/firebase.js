import firebase from "firebase/compat/app"
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEUaEeVBRU6dA7e8wCbqVkUkAzS6cdZjU",
  authDomain: "soldier-community.firebaseapp.com",
  projectId: "soldier-community",
  storageBucket: "soldier-community.appspot.com",
  messagingSenderId: "860109847984",
  appId: "1:860109847984:web:405ed30e59da0281c32a75"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;