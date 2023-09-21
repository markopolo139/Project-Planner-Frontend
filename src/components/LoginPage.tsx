import {useState} from "react";
import {Button, TextField} from "@mui/material";

interface LoginProps {
    authenticate: any
    setPasswordRecovery: any
}

export default function LoginPage(props: LoginProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [validUsername, setValidUsername] = useState(true)
    const [validPassword, setValidPassword] = useState(true)

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

    return (
        <form onSubmit={e => {
            e.preventDefault()
            try {

                setValidUsername(true)
                setValidPassword(true)

                validateForm()

                props.authenticate({username, password})
                props.setPasswordRecovery(false)
            } catch (e: any) {
                const error = e as Error
                alert(error.message)
            }
        }}>
            {
                validUsername && <TextField
                    label="username" variant="outlined" value={username} onChange={e => {
                    setUsername(e.target.value.trim())
                }}/>
            }
            {
                validUsername || <TextField
                    error
                    helperText="Username must not be blank"
                    label="username" variant="outlined"
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value.trim())
                    }}
                />
            }
            <br/>
            <br/>
            {
                validPassword && <TextField
                    label="password" variant="outlined" type="password" value={password} onChange={e => {
                    setPassword(e.target.value.trim())
                }}/>
            }
            {
                validPassword || <TextField
                    error
                    helperText="Password must not be blank"
                    label="password" variant="outlined" type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value.trim())
                    }}
                />
            }
            <br/>
            <Button variant="outlined" type="submit">login</Button>
            <Button variant="outlined" onClick={
                e => props.setPasswordRecovery(true)
            }>Recover Password</Button>
        </form>
    )
}