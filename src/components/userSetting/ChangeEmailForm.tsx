import {useDispatch} from "react-redux";
import React, {useState} from "react";
import ErrorPopup from "../error/ErrorPopup";
import {useChangeEmailMutation} from "../../api/UserApi";
import {setLoggedInEmail, setLoggedInUsername} from "../../slices/LoggedInUserSlice";
import {Button, TextField} from "@mui/material";
import styles from "../../css/SettingsForm.module.sass"

export default function ChangeEmailForm() {
    const [changeEmail] = useChangeEmailMutation()

    const [error, setError] = useState<any>(null)
    const [email, setEmail] = useState("")
    const [isChanged, setChanged] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className={styles.formDiv}>
            { error && <ErrorPopup error={error} /> }
            <form className={styles.forms} onSubmit={e => {
                e.preventDefault()
                setChanged(false)
                changeEmail(email).unwrap().then(
                    response => {
                        dispatch(setLoggedInEmail(email))
                        setChanged(true)
                    }
                ).catch(error => setError(error))
            }}>
                <h2>Change Email:</h2>
                <TextField
                    className="TextField" label="New Email" variant="outlined" type="email" onChange={e => {
                    setEmail(e.target.value.trim())
                }}
                />
                <Button className="Button" variant="outlined" type="submit">Change Email</Button>
                { isChanged && <h3>Email Changed Correctly</h3> }
            </form>
        </div>
    )
}