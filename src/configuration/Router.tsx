import {createBrowserRouter} from "react-router-dom";
import App from "../components/App";
import ErrorPage from "../components/error/ErrorPage";
import LoginPage from "../components/loginRelated/LoginPage";
import LandingPage from "../components/main/LandingPage";
import AllProjectsPage from "../components/main/projects/AllProjectsPage";
import PasswordRecoveryPage from "../components/loginRelated/PasswordRecoveryPage";
import AllProjectPlansPage from "../components/main/projectsPlans/AllProjectPlansPage";
import UserSettingsPage from "../components/userSetting/UserSettingsPage";
import ChangeUsernameForm from "../components/userSetting/ChangeUsernameForm";
import ChangePasswordForm from "../components/userSetting/ChangePasswordForm";
import ChangeEmailForm from "../components/userSetting/ChangeEmailForm";
import ProjectPage from "../components/main/projects/ProjectPage";
import ProjectPlanPage from "../components/main/projectsPlans/ProjectPlanPage";
import {projectsLoader} from "./dataLoader/ProjectsLoader";
import CreateProjectPage from "../components/main/projects/CreateProjectPage";
import CreatePlanPage from "../components/main/projectsPlans/CreatePlanPage";
import {projectLoader} from "./dataLoader/ProjectLoader";

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
                        path: "/home/projects",
                        element: <AllProjectsPage />,
                        loader: projectsLoader
                    },
                    {
                        path: "/home/projects/:projectTitle",
                        element: <ProjectPage />,
                        loader: projectLoader
                    },
                    {
                        path: "/home/project/plans",
                        element: <AllProjectPlansPage />
                    },
                    {
                        path: "/home/project/plans/create",
                        element: <CreatePlanPage />
                    },
                    {
                        path: "/home/project/plans/:projectPlanId",
                        element: <ProjectPlanPage />
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