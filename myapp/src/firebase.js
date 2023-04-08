import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


const firebaseConfig = {
	apiKey: "AIzaSyDpK9585Nist4dDRMyUbxf98APPUeF051g",
    authDomain: "ez-group-6808f.firebaseapp.com",
    projectId: "ez-group-6808f",
    storageBucket: "ez-group-6808f.appspot.com",
    messagingSenderId: "747617601049",
    appId: "1:747617601049:web:f158c5e83fadb3505a0c88",
    measurementId: "G-PGXTMCCV8T"
};
if (!firebase.apps.length) {
    firebase.initializeApp({});
}

//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app); 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider};

// var storage = firebase.storage();
// export default storage;
