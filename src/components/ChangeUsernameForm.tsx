import {useDispatch} from "react-redux";
import React, {useState} from "react";
import ErrorPopUp from "./ErrorPopUp";
import {useChangeUsernameMutation} from "../api/UserApi";
import {Button, TextField} from "@mui/material";
import {setLoggedInUsername} from "../slices/LoggedInUserSlice";
import styles from "../css/SettingsForm.module.sass"


export default function ChangeUsernameForm() {
    const [changeUsername] = useChangeUsernameMutation()

    const [error, setError] = useState<any>(null)
    const [username, setUsername] = useState("")
    const [isChanged, setChanged] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className={styles.formDiv}>
            { error && <ErrorPopUp error={error} /> }
            <form className={styles.forms} onSubmit={e => {
                e.preventDefault()
                setChanged(false)
                changeUsername(username).unwrap().then(
                    response => {
                        dispatch(setLoggedInUsername(username))
                        setChanged(true)
                    }
                ).catch(error => setError(error))
            }}>
                <h2>Change Username:</h2>
                <TextField
                    className="TextField" label="New Username" variant="outlined" onChange={e => {
                    setUsername(e.target.value.trim())
                }}
                />
                <Button className="Button" variant="outlined" type="submit">Change Username</Button>
                { isChanged && <h3>Username Changed Correctly</h3> }
            </form>
        </div>
    )
}