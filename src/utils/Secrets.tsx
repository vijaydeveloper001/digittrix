import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const Secret = {
    apiKey: 'AIzaSyDVvhkpnV5xrCFoeMSUkRBaKbQyHtS4bu4',
    authDomain: 'digittrix-98a5c.firebaseapp.com',
    databaseURL: 'https://console.firebase.google.com/u/1/project/digittrix-98a5c/firestore',
    projectId: 'digittrix-98a5c',
    storageBucket: 'digittrix-98a5c.appspot.com',
    messagingSenderId: '1079262856595',
    appId: '1:1079262856595:android:e46d6113042aa18efd9466',
  };
  

const app = initializeApp(Secret);
export const dbbase = getFirestore(app)