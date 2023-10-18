import {Alert, Button, CircularProgress, TextField} from "@mui/material";
import React, {useState} from "react";
import useQuery from "../../configuration/QueryHook";
import {useChangePasswordMutation, useSendEmailMutation} from "../../api/RecoveryPasswordApi";
import ErrorPopup from "../error/ErrorPopup";
import styles from "../../css/loginRelated/PasswordRecovery.module.sass"

interface PasswordRecoveryProps {
    setPasswordRecovery: any
}

export default function PasswordRecoveryPage(props: PasswordRecoveryProps) {
    const [
        sendEmail,
        { error: emailError, isError: isEmailError, isLoading: isEmailSending}
    ] = useSendEmailMutation()

    const [
        changePassword,
        { error: changePasswordError, isError: isPasswordError, isLoading: isPasswordChanging}
    ] = useChangePasswordMutation()

    const [email, setEmail] = useState("")
    const [newPassword, setPassword] = useState("")
    const [confirmNewPassword, setConfirmPassword] = useState("")
    const [isFormValid, setValidForm] = useState(true)
    const token = useQuery().get("token")

    function validateNewPassword() {
        setValidForm(true)
        if (newPassword !== confirmNewPassword)
            throw new Error()
    }

    if (token != null) {
        return (
            <div>
                <header className={styles.header}>Project Overview</header>
                { isPasswordError && <ErrorPopup error={changePasswordError}/> }
                { isFormValid || <Alert severity="error">Password does not match</Alert> }
                <div className={styles.passwordDiv}>
                    <form className={styles.forms} onSubmit={e => {
                        e.preventDefault()
                        try {
                            validateNewPassword()
                            changePassword({ newPassword, token })
                        } catch (e: any) {
                            setValidForm(false)
                        }
                    }}>
                        <h2>Change Password:</h2>
                        <TextField
                            className="TextField" label="New Password" variant="outlined" type="password" onChange={e => {
                            setPassword(e.target.value.trim())
                        }}
                        />
                        <TextField
                            className="TextField" label="Confirm New Password" variant="outlined" type="password" onChange={e => {
                            setConfirmPassword(e.target.value.trim())
                        }}
                        />
                        <Button className="Button" variant="outlined" type="submit">Change Password</Button>
                        { isPasswordChanging && <CircularProgress /> }
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.formDiv}>
            { isEmailError && <ErrorPopup error={emailError} /> }
            <form className={styles.forms} onSubmit={e => {
                e.preventDefault()
                sendEmail(email)
            }}>
                <h2>Recovery Password:</h2>
                <TextField
                    className="TextField" label="email" variant="outlined" type="email" onChange={e => {
                        setEmail(e.target.value.trim())
                    }}
                />
                <div>
                    <Button className="Button" variant="outlined" type="submit">Send message</Button>
                    <Button className="Button" variant="outlined" onClick={e => {
                        props.setPasswordRecovery(false)
                    }}>Return</Button>
                </div>
                {isEmailSending && <CircularProgress /> }
            </form>
        </div>
    )
}