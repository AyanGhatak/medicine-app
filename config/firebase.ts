// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import Constants from 'expo-constants';
import { getFirestore } from 'firebase/firestore';


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: Constants.manifest?.extra?.firebaseApiKey,
//   authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
//   projectId: Constants.manifest?.extra?.firebaseProjectId,
//   storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
//   messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
//   appId: Constants.manifest?.extra?.firebaseAppId,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const fireDB = getFirestore(app);
// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMBXJT1uH07urQtOJQpJwJ5Z2qrvSlEps",
  authDomain: "medicne-app.firebaseapp.com",
  projectId: "medicne-app",
  storageBucket: "medicne-app.appspot.com",
  messagingSenderId: "410824853765",
  appId: "1:410824853765:web:95023f0d2b0c7dd771cf6c",
  measurementId: "G-STXXR3YX3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const fireDB = getFirestore(app);
export default app;