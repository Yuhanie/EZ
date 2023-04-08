
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getApp, getApps } from "firebase/app";
const firebaseConfig = {
	apiKey: "AIzaSyDpK9585Nist4dDRMyUbxf98APPUeF051g",
    authDomain: "ez-group-6808f.firebaseapp.com",
    projectId: "ez-group-6808f",
    storageBucket: "ez-group-6808f.appspot.com",
    messagingSenderId: "747617601049",
    appId: "1:747617601049:web:f158c5e83fadb3505a0c88",
    measurementId: "G-PGXTMCCV8T"
};

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
export {auth,provider};