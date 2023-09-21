import {Button, TextField} from "@mui/material";
import {useState} from "react";
import useQuery from "../configuration/QueryHook";

export default function PasswordRecoveryPage() {
    const [email, setEmail] = useState("")
    const [newPassword, setPassword] = useState("")
    const token = useQuery().get("token")

    if (token != null) {
        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    //TODO: use change password api
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

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                //TODO: use recovery api
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