import {Button, CircularProgress, TextField} from "@mui/material";
import {useState} from "react";
import useQuery from "../configuration/QueryHook";
import {useChangePasswordMutation, useSendEmailMutation} from "../api/RecoveryPasswordApi";
import ErrorPopUp from "./ErrorPopUp";

export default function PasswordRecoveryPage() {
    const [sendEmail, { error: emailError, isLoading: isEmailSending }] = useSendEmailMutation()
    const [changePassword, { error: changePasswordError, isLoading }] = useChangePasswordMutation()

    const [email, setEmail] = useState("")
    const [newPassword, setPassword] = useState("")
    const token = useQuery().get("token")

    if (token != null) {
        if (isLoading)
            return (
                <div>
                    <p>Password is changing</p>
                    <br/>
                    <CircularProgress />
                </div>
            )

        return (
            <div>
                { changePasswordError && <ErrorPopUp error={changePasswordError}/> }
                <form onSubmit={e => {
                    e.preventDefault()
                    changePassword({ newPassword, token })
                }}>
                    <TextField
                        label="New Password" variant="outlined" type="password" onChange={e => {
                        setPassword(e.target.value.trim())
                    }}
                    />
                    <br/>
                    <Button variant="outlined" type="submit">Change Password</Button>
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
            { emailError && <ErrorPopUp error={emailError} /> }
            <form onSubmit={e => {
                e.preventDefault()
                sendEmail(email)
            }}>
                <TextField
                    label="email" variant="outlined" type="email" onChange={e => {
                        setEmail(e.target.value.trim())
                    }}
                />
                <br/>
                <Button variant="outlined" type="submit">Send message</Button>
            </form>
        </div>
    )
}