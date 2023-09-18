import React, {useState} from 'react';
import logo from './logo.svg';
import {getAppToken} from "./configuration/firebase";

function App() {
    const [isTokenFound, setTokenFound] = useState(false)
    let token = getAppToken(setTokenFound)

    return (
        <div className="App">
            <header className="App-header">
                Test Firebase
                {isTokenFound && "Notification Granted"}
                {isTokenFound || "Notification Not granted"}
            </header>
        </div>
    );
}

export default App;
