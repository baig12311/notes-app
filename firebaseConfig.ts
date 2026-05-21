// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8ieUlwLR-VWT19Jyam15iSiPvE_ntKhw",
  authDomain: "notes-app-e27ff.firebaseapp.com",
  projectId: "notes-app-e27ff",
  storageBucket: "notes-app-e27ff.firebasestorage.app",
  messagingSenderId: "481814952681",
  appId: "1:481814952681:web:9d298bce2ae13bd6590e78",
  measurementId: "G-LY5QXC8Q84"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const firestore = getFirestore(app);

export { firestore};
