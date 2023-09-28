import {createBrowserRouter} from "react-router-dom";
import App from "../components/App";
import ErrorPage from "../components/error/ErrorPage";
import LoginPage from "../components/loginRelated/LoginPage";
import LandingPage from "../components/main/LandingPage";
import ProjectsPage from "../components/main/ProjectsPage";
import PasswordRecoveryPage from "../components/loginRelated/PasswordRecoveryPage";
import ProjectPlansPage from "../components/main/ProjectPlansPage";
import UserSettingsPage from "../components/userSetting/UserSettingsPage";
import ChangeUsernameForm from "../components/userSetting/ChangeUsernameForm";
import ChangePasswordForm from "../components/userSetting/ChangePasswordForm";
import ChangeEmailForm from "../components/userSetting/ChangeEmailForm";

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