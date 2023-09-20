import {isRouteErrorResponse, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)
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
    </div>
)
}