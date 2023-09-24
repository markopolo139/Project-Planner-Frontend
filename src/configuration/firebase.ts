import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";
import React from "react";
import MyError, {MyErrorClass} from "../objects/MyError";

const firebaseConfig = {
    apiKey: "AIzaSyBox8-G3qWbE0Uratk-7SEJSo0WptGXjQU",
    authDomain: "projectoverview-36fd1.firebaseapp.com",
    projectId: "projectoverview-36fd1",
    storageBucket: "projectoverview-36fd1.appspot.com",
    messagingSenderId: "56656802343",
    appId: "1:56656802343:web:d54dbb6e4a456b819a1402",
    measurementId: "G-B92XVV407M"
};

const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

export const getAppToken = async (addToken: any, setTokenCheck: any, setTokenMessage: any) => {
    let currentToken = await getToken(messaging, { vapidKey: "BGuoLNhZ25TbBZVydBk06qkKbJBT-O9mZ9YWdZ1VDJ4wUrp8nCmxWcT_xYNJfkstFY_TgUeqe70uwoeAEMWvWsA" })
    setTokenCheck(true)
    if(currentToken) {
        addToken(currentToken)
        setTokenMessage("Notification set")
    }
    else {
        setTokenMessage("Permission not granted")
    }
}