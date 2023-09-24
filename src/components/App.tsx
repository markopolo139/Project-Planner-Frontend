import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import LoginPage from "./LoginPage";
import {useAuthenticateMutation} from "../api/AuthApi";
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../configuration/StoreHooks";
import {selectJwtToken, set} from "../slices/JwtTokenSlice";
import PasswordRecoveryPage from "./PasswordRecoveryPage";
import ErrorPopUp from "./ErrorPopUp";

function App() {
    const [
        authenticate,
        {data: jwtToken, error, isError }
    ] = useAuthenticateMutation()

    const [isPasswordRecovery, setPasswordRecovery] = useState(false)
    const dispatch = useAppDispatch();
    const isJwtSet = useAppSelector(selectJwtToken).length > 0;

    useEffect(() => {
        if (jwtToken !== undefined && jwtToken.length > 0) {
            dispatch(set(jwtToken))
        }
    })

    return (
        <div className="App">
            { isError && <ErrorPopUp error={error} />}
            { (!isPasswordRecovery && !isJwtSet) && <LoginPage authenticate={authenticate} setPasswordRecovery={setPasswordRecovery}/> }
            { isPasswordRecovery && <PasswordRecoveryPage /> }
            { isJwtSet && <Outlet /> }
        </div>
    );
}

export default App;
