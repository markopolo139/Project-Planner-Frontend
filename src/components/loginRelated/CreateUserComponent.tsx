import {Button, CircularProgress, TextField} from "@mui/material";
import {useUserCreateMutation} from "../../api/CreateUserApi";
import ErrorPopup from "../error/ErrorPopup";
import {useForm} from "react-hook-form";
import CreateUserModel from "../../objects/CreateUserModel";
import styles from "../../css/CreateUser.module.sass"

interface CreateUserProps {
    setCreateUser: any
}

export default function CreateUserComponent(props: CreateUserProps) {
    const [
        createUser,
        { error, isError, isLoading, isSuccess }
    ] = useUserCreateMutation()

    const { register, handleSubmit } = useForm();

    if (isSuccess) {
        return (
            <div className={styles.userCreated}>
                <h2>User created</h2>
                <Button className="Button" variant="outlined" onClick={e => {
                    props.setCreateUser(false)
                }}>Return</Button>
            </div>
        )
    }

    return (
        <div className={styles.formDiv}>
            { isError && <ErrorPopup error={error} /> }
            <form className={styles.forms} onSubmit={ handleSubmit((data) => {
                createUser(data as CreateUserModel)
            }) }>
                <h2>Create user:</h2>
                <TextField
                    className="TextField" label="username" variant="outlined" type="text" {...register("username")}
                />

                <TextField
                    className="TextField" label="password" variant="outlined" type="password" {...register("password")}
                />
                <TextField
                    className="TextField" label="email" variant="outlined" type="email" {...register("email")}
                />
                <div>
                    <Button className="Button" variant="outlined" type="submit">Create account</Button>
                    <Button className="Button" variant="outlined" onClick={e => {
                        props.setCreateUser(false)
                    }}>Return</Button>
                </div>
                { isLoading && <CircularProgress /> }
            </form>
        </div>
    )
}