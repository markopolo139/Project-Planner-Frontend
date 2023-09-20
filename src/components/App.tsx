import React, {useState} from 'react';
import {getAppToken} from "../configuration/firebase";
import {Outlet} from "react-router-dom";
import LoginPage from "./LoginPage";

function App() {
    const [isTokenFound, setTokenFound] = useState(false)
    let token = getAppToken(setTokenFound)
    // AuthToken and if it is set Disable loginPage and enable Outlet
    return (
        <div className="App">
            <LoginPage />
            <Outlet />
        </div>
    );
}

export default App;
