import {Alert, Button, CircularProgress, TextField} from "@mui/material";
import {useState} from "react";
import useQuery from "../configuration/QueryHook";
import {useChangePasswordMutation, useSendEmailMutation} from "../api/RecoveryPasswordApi";
import ErrorPopUp from "./ErrorPopUp";

export default function PasswordRecoveryPage() {
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
        if (isPasswordChanging)
            return (
                <div>
                    <p>Password is changing</p>
                    <br/>
                    <CircularProgress />
                </div>
            )
        return (
            <div>
                { isPasswordError && <ErrorPopUp error={changePasswordError}/> }
                { isFormValid || <Alert severity="error">Password does not match</Alert> }
                <form onSubmit={e => {
                    e.preventDefault()
                    try {
                        validateNewPassword()
                        changePassword({ newPassword, token })
                    } catch (e: any) {
                        setValidForm(false)
                    }
                }}>
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
                </form>
            </div>
        )
    }

    if (isEmailSending)
        return (
            <div>
                <p>Message is being sent</p>
                <br/>
                <CircularProgress />
            </div>
        )

    return (
        <div>
            { isEmailError && <ErrorPopUp error={emailError} /> }
            <form onSubmit={e => {
                e.preventDefault()
                sendEmail(email)
            }}>
                <TextField
                    className="TextField" label="email" variant="outlined" type="email" onChange={e => {
                        setEmail(e.target.value.trim())
                    }}
                />
                <Button className="Button" variant="outlined" type="submit">Send message</Button>
            </form>
        </div>
    )
}