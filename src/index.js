import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getFirestore } from 'firebase/firestore';
// import * as firebase from "firebase";
// import "firebase/firestore";
import { getDatabase, ref, child, push, update } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase Products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_sEFrwB7dssQKQDX0so2gT6txawJMBEA",
  authDomain: "cart-c9c12.firebaseapp.com",
  databaseURL: "https://cart-c9c12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cart-c9c12",
  storageBucket: "cart-c9c12.appspot.com",
  messagingSenderId: "363829147568",
  appId: "1:363829147568:web:adea590cd972b574350875"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//export const db=getDatabase(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

