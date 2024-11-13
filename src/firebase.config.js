// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqOVniSI0hH1SAXeJ9XzcpEDJ84o-BWzA",
    authDomain: "user-email-password-auth-babe3.firebaseapp.com",
    projectId: "user-email-password-auth-babe3",
    storageBucket: "user-email-password-auth-babe3.appspot.com",
    messagingSenderId: "911205728948",
    appId: "1:911205728948:web:c557f34a21bc64e89f0de1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
