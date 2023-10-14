import {Link, Navigate, useLoaderData, useNavigate} from "react-router-dom";
import Project from "../../../objects/Project";
import {useEffect, useState} from "react";
import UpdateProjectPage from "./UpdateProjectComponent";
import {Button} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Popup from "reactjs-popup";
import {useDeleteProjectMutation} from "../../../api/ProjectApi";
import ErrorPopup from "../../error/ErrorPopup";

export default function ProjectPage() {
    const [deleteProjectApi] = useDeleteProjectMutation()

    const [error, setError] = useState<any>(null)
    const [isUpdate, setUpdate] = useState(false)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const project = useLoaderData() as Project

    function handleDeleteConfirmClick(_: any) {
        setOpen(false)
        deleteProjectApi(project.projectId).unwrap()
            .then( fulfilled => navigate("..", { replace: true, relative: "path" }))
            .catch((rejected: any) => setError(rejected))
    }

    if (isUpdate)
        return <UpdateProjectPage setUpdateProject={setUpdate} {...project} />

    //TODO: show fileds of project, maybe add something from github like commits etc.,
    return (
        <div>
            { error && <ErrorPopup error={error} /> }
            {project.githubLink}
            <Button className="Button" variant="outlined" onClick={ e => {
                setUpdate(true)
            }}>Update Project</Button>
            <Button className="Button" variant="outlined" onClick={ e => {
                setOpen(true)
            }}>Delete Project</Button>
            <Link to={`../project/plans/${project.title}`}>To Plan</Link>
            <Popup open={open} closeOnDocumentClick={false} contentStyle={{ width: '17%' }}>
                <div>
                    <div>
                        <h2>Are you sure</h2>
                        <h3>All data will be lost</h3>
                        <Button onClick={handleDeleteConfirmClick}>Confirm</Button>
                    </div>
                    <CloseIcon className="popup-close" onClick={() => setOpen(false)}></CloseIcon>
                </div>
            </Popup>
        </div>
    )
}