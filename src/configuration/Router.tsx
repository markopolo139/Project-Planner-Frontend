import {createBrowserRouter} from "react-router-dom";
import App from "../components/App";
import ErrorPage from "../components/ErrorPage";
import LoginPage from "../components/LoginPage";
import LandingPage from "../components/LandingPage";
import ProjectsPage from "../components/ProjectsPage";
import PasswordRecoveryPage from "../components/PasswordRecoveryPage";
import ProjectPlansPage from "../components/ProjectPlansPage";
import UserSettingsPage from "../components/UserSettingsPage";
import ChangeUsernameForm from "../components/ChangeUsernameForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ChangeEmailForm from "../components/ChangeEmailForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    }, {
        path: "/change/password",
        element: <PasswordRecoveryPage setPasswordRecovery={ null }/>,
        errorElement: <ErrorPage />
    }, {
        path: "/home",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <ProjectsPage />
                    },
                    {
                        path: "/home/projects",
                        element: <ProjectsPage />
                    },
                    {
                        path: "/home/project/plans",
                        element: <ProjectPlansPage />
                    },
                    {
                        path: "/home/user/settings",
                        element: <UserSettingsPage />,
                        children: [
                            {
                                path: "/home/user/settings/username",
                                element: <ChangeUsernameForm />,
                            },{
                                path: "/home/user/settings/password",
                                element: <ChangePasswordForm />,
                            },{
                                path: "/home/user/settings/email",
                                element: <ChangeEmailForm />,
                            },
                        ]
                    }
                ]
            }
        ]
    }
])