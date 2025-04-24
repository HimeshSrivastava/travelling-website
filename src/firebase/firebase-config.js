// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4Yt2N3_va6wJTegVdHcapTuo14F4cceI",
  authDomain: "travelling-website-80af2.firebaseapp.com",
  projectId: "travelling-website-80af2",
  storageBucket: "travelling-website-80af2.firebasestorage.app",
  messagingSenderId: "170573512183",
  appId: "1:170573512183:web:6bd1dad15a6517679d02f2",
  measurementId: "G-DMZ698KFN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;