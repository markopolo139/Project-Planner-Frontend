import {useDispatch} from "react-redux";
import React, {useState} from "react";
import ErrorPopup from "../error/ErrorPopup";
import {Alert, Button, TextField} from "@mui/material";
import {useChangePasswordMutation} from "../../api/UserApi";
import styles from "../../css/SettingsForm.module.sass"


export default function ChangePasswordForm() {
    const [changePassword] = useChangePasswordMutation()

    const [error, setError] = useState<any>(null)
    const [password, setPassword] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [isFormValid, setValidForm] = useState(true)
    const [isChanged, setChanged] = useState(false)

    function validateNewPassword() {
        setValidForm(true)
        if (password !== passwordValidation)
            throw new Error()
    }
    return (
        <div className={styles.formDiv}>
            { error && <ErrorPopup error={error} /> }
            { isFormValid || <Alert severity="error">Password does not match</Alert> }
            <form className={styles.forms} onSubmit={e => {
                e.preventDefault()
                try {
                    validateNewPassword()
                    setChanged(false)
                    changePassword(password).unwrap().then(r => setChanged(true)).catch(error => setError(error))

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
                    setPasswordValidation(e.target.value.trim())
                }}
                />
                <Button className="Button" variant="outlined" type="submit">Change Password</Button>
                { isChanged && <h3>Password Changed Correctly</h3> }
            </form>
        </div>
    )
}