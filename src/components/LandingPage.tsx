import {getAppToken} from "../configuration/firebase";

export default function LandingPage() {
    getAppToken().catch()

    return (
        <div>TEST</div>
    )
}