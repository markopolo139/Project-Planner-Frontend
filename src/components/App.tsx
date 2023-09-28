import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import LoginPage from "./loginRelated/LoginPage";
import {useAuthenticateMutation} from "../api/AuthApi";
import {useAppDispatch, useAppSelector} from "../configuration/StoreHooks";
import {selectJwtToken, setJwtToken} from "../slices/LoggedInUserSlice";
import PasswordRecoveryPage from "./loginRelated/PasswordRecoveryPage";
import ErrorPopup from "./error/ErrorPopup";
import styles from "../css/App.module.sass"

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
            dispatch(setJwtToken(jwtToken))
        }
    })

    return (
        <div className={styles.app}>
            <header className={styles.header}>Project Overview</header>
            { isError && <ErrorPopup error={error} />}
            { !isJwtSet && <div className={styles.forms}>
                {!isPasswordRecovery && <LoginPage authenticate={authenticate} setPasswordRecovery={setPasswordRecovery}/>}
                {isPasswordRecovery && <PasswordRecoveryPage setPasswordRecovery={setPasswordRecovery}/>}
            </div> }
            { isJwtSet && <Navigate to="/home" replace={true} /> }
        </div>
    );
}

export default App;
