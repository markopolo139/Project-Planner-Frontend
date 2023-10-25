import {Link, Navigate, useLoaderData, useNavigate} from "react-router-dom";
import Project from "../../../objects/Project";
import {useEffect, useState} from "react";
import UpdateProjectPage from "./UpdateProjectComponent";
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from "@mui/icons-material/Close";
import Popup from "reactjs-popup";
import {useDeleteProjectMutation} from "../../../api/ProjectApi";
import ErrorPopup from "../../error/ErrorPopup";
import styles from "../../../css/main/projects/ProjectPage.module.sass"
import {buttonCss} from "../../../utils/MuiButtonCss";

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

    return (
        <div>
            { error && <ErrorPopup error={error} /> }
            <ProjectSummary project={project} />
            <div className={styles.buttons}>
                <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={ e => {
                    setUpdate(true)
                }}>Update Project</Button>
                <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={ e => {
                    setOpen(true)
                }}>Delete Project</Button>
                <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={ e => {
                    navigate("..", { replace: true, relative: "path" })
                }}>Return</Button>
                <Link className={styles.link} to={`../project/plans/${project.title}`}>To Plan</Link>
            </div>
            <Popup open={open} closeOnDocumentClick={false} contentStyle={{ width: '17%' }}>
                <div>
                    <div>
                        <h2>Are you sure</h2>
                        <CloseIcon className="popup-close" onClick={() => setOpen(false)}></CloseIcon>
                    </div>
                    <div>
                        <h3>All data will be lost</h3>
                        <Button onClick={handleDeleteConfirmClick}>Confirm</Button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

interface ProjectSummaryProps {
    project: Project
}

function ProjectSummary(props: ProjectSummaryProps) {
    let project = props.project
    return (
        <div className={styles.project_summary}>
            <h2 className={styles.header}>{project.title}:{project.projectStatus.replace("_", " ")}</h2>
            <span className={styles.data}>Github link: {project.githubLink}</span>
            <span className={styles.data}>Used language: {project.language}</span>
            <span className={styles.data}>Description: {project.description}</span>
            <span className={styles.data}>Date of start: {new Date(project.dateOfStart).toLocaleDateString("pl-PL")}</span>
            { project.deadline && <span className={styles.data}>Date of start: {new Date(project.deadline).toLocaleDateString("pl-PL")}</span> }

            <Accordion className={styles.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>Features</AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>
                            { project.features.map(it => <div>{it}</div>) }
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>Goals</AccordionSummary>
                <AccordionDetails>
                    <div>
                        { project.goals.map(it => <div>{it}</div>) }
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>Technology used</AccordionSummary>
                <AccordionDetails>
                    <div>
                        { project.technologies.map(it => <div>{it}</div>) }
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}