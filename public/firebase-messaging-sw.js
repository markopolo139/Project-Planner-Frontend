importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

var firebaseConfig = {
    apiKey: "AIzaSyBox8-G3qWbE0Uratk-7SEJSo0WptGXjQU",
    authDomain: "projectoverview-36fd1.firebaseapp.com",
    projectId: "projectoverview-36fd1",
    storageBucket: "projectoverview-36fd1.appspot.com",
    messagingSenderId: "56656802343",
    appId: "1:56656802343:web:d54dbb6e4a456b819a1402",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();
