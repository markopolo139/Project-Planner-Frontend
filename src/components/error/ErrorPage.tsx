import {isRouteErrorResponse, redirect, useRouteError} from "react-router-dom";
import {Button} from "@mui/material";

export default function ErrorPage() {
    const error = useRouteError()
    let errorMessage: string

    if (isRouteErrorResponse(error)) {
        errorMessage = error.data?.message || error.statusText
    }
    else if (error instanceof Error) {
        errorMessage = error.message
    } else if (typeof error === 'string') {
        errorMessage = error
    } else {
        errorMessage = "Unknown message"
    }

    return (
        <div>
            <p>Error occurred</p>
            <p>{errorMessage}</p>
            <Button onClick={e => {
                redirect("/")
            }}>Return to login page</Button>
        </div>
    )
}