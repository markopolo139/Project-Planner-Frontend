import {useState} from "react";
import {Button, TextField} from "@mui/material";
import CreateUserComponent from "./CreateUserComponent";
import styles from "../../css/LoginPage.module.sass"
import {useAppDispatch} from "../../configuration/StoreHooks";
import {setLoggedInUsername} from "../../slices/LoggedInUserSlice";

interface LoginProps {
    authenticate: any
    setPasswordRecovery: any
}

export default function LoginPage(props: LoginProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validUsername, setValidUsername] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [isCreateUser, setCreateUser] = useState(false)
    const dispatch = useAppDispatch();

    function validateForm() {
        let doThrow = false

        if (username.length <= 0) {
            setValidUsername(false)
            doThrow = true
        }

        if (password.length <= 0) {
            setValidPassword(false)
            doThrow = true
        }

        if (doThrow)
            throw new Error(`Invalid form completion`)
    }

    if (isCreateUser)
        return <CreateUserComponent setCreateUser={setCreateUser}/>

    return (
        <div className={styles.formDiv}>
            <form className={styles.forms} onSubmit={e => {
                e.preventDefault()
                try {

                    setValidUsername(true)
                    setValidPassword(true)

                    validateForm()

                    props.authenticate({username, password})
                    dispatch(setLoggedInUsername(username))
                    props.setPasswordRecovery(false)
                } catch (e: any) {
                    const error = e as Error
                    alert(error.message)
                }
            }}>
                <h2>Login</h2>
                {
                    validUsername && <TextField
                        className="TextField" label="username" variant="outlined" value={username} onChange={e => {
                        setUsername(e.target.value.trim())
                    }}/>
                }
                {
                    validUsername || <TextField
                        className="TextField"
                        error
                        helperText="Username must not be blank"
                        label="username" variant="outlined"
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value.trim())
                        }}
                    />
                }
                {
                    validPassword && <TextField
                        className="TextField" label="password" variant="outlined" type="password" value={password} onChange={e => {
                        setPassword(e.target.value.trim())
                    }}/>
                }
                {
                    validPassword || <TextField
                        className="TextField"
                        error
                        helperText="Password must not be blank"
                        label="password" variant="outlined" type="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value.trim())
                        }}
                    />
                }
                <div>
                    <Button className="Button" variant="outlined" type="submit">login</Button>
                    <Button className="Button" variant="outlined" onClick={
                        e => setCreateUser(true)
                    }>Register</Button>
                </div>
                <p className={styles.recovery} onClick={
                    e => props.setPasswordRecovery(true)
                }>Recover Password</p>

            </form>
        </div>
    )
}
