// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARiviBHniDmd3Na0xpyuIznbXCXVFMX3c",
  authDomain: "beerdeliveryapp-fazo4.firebaseapp.com",
  projectId: "beerdeliveryapp-fazo4",
  storageBucket: "beerdeliveryapp-fazo4.appspot.com",
  messagingSenderId: "868645409632",
  appId: "1:868645409632:web:3154b733eb5a8956e80405"
};

initializeApp(firebaseConfig);
export const db = getFirestore();