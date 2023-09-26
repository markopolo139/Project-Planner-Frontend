import {createBrowserRouter} from "react-router-dom";
import App from "../components/App";
import ErrorPage from "../components/ErrorPage";
import LoginPage from "../components/LoginPage";
import LandingPage from "../components/LandingPage";
import ProjectsPage from "../components/ProjectsPage";
import PasswordRecoveryPage from "../components/PasswordRecoveryPage";
import ProjectPlansPage from "../components/ProjectPlansPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <LandingPage />
                    },
                    {
                        path: "projects",
                        element: <ProjectsPage />
                    },
                    {
                        path: "project/plans",
                        element: <ProjectPlansPage />
                    }
                ]
            }
        ]
    }, {
        path: "/change/password",
        element: <PasswordRecoveryPage setPasswordRecovery={ null }/>,
        errorElement: <ErrorPage />,
    }
])