import LoginModel from "../objects/LoginModel";
import {useState} from "react";

interface LoginProps {
    authenticate: any
    setPasswordRecovery: any
}

export default function LoginPage(props: LoginProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function validateForm() {
        if (username.length <= 0)
            throw new Error(`Invalid form completion (username), typed ${username}`)

        if (password.length <= 0)
            throw new Error(`Invalid form completion (password), typed ${password}`)
    }

    return (
        <form onSubmit={e => {
            e.preventDefault()
            try {
                validateForm()
                props.authenticate({username, password})
                props.setPasswordRecovery(false)
            } catch (e: any) {
                const error = e as Error
                alert(error.message)
            }
        }}>
            <label>Username:</label>
            <input type="text" onChange={e => {
                setUsername(e.target.value.trim())
            }}/>
            <br/>
            <label>Password:</label>
            <input type="password" onChange={e => {
                setPassword(e.target.value.trim())
            }}/>
            <br/>
            <input type="submit" value="login"/>
            <button onClick={
                e => props.setPasswordRecovery(true)
            }>Recover Password</button>
        </form>
    )
}