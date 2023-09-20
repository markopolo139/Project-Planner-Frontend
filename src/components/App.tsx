import React, {useState} from 'react';
import {getAppToken} from "../configuration/firebase";
import {Outlet} from "react-router-dom";

function App() {
    const [isTokenFound, setTokenFound] = useState(false)
    let token = getAppToken(setTokenFound)

    return (
        <div className="App">
            <Outlet />
        </div>
    );
}

export default App;
