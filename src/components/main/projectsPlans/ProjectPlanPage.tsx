import {Link, useLoaderData, useNavigate} from "react-router-dom";
import Project from "../../../objects/Project";
import ProjectPlan from "../../../objects/ProjectPlan";
import {useDeleteProjectMutation} from "../../../api/ProjectApi";
import {useState} from "react";
import UpdateProjectPage from "../projects/UpdateProjectComponent";
import ErrorPopup from "../../error/ErrorPopup";
import styles from "../../../css/main/projects/ProjectPage.module.sass";
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import {buttonCss} from "../../../utils/MuiButtonCss";
import Popup from "reactjs-popup";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useDeleteProjectPlanMutation} from "../../../api/ProjectPlanApi";
import UpdateProjectPlanPage from "./UpdateProjectPlanPage";
import {useSelector} from "react-redux";
import {selectProjects} from "../../../slices/ProjectsSlice";
import CreateProjectPage from "../projects/CreateProjectPage";

export default function ProjectPlanPage() {
    // TODO: remember to have button to transform plan to project
    const [deleteProjectPlanApi] = useDeleteProjectPlanMutation()

    const [error, setError] = useState<any>(null)
    const [isUpdate, setUpdate] = useState(false)
    const [isTransform, setTransform] = useState(false)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const projectPlan = useLoaderData() as ProjectPlan
    const doesProjectExist = useSelector(selectProjects).some(it => it.title == projectPlan.title)

    function handleDeleteConfirmClick(_: any) {
        setOpen(false)
        deleteProjectPlanApi(projectPlan.projectPlanId).unwrap()
            .then( fulfilled => navigate("..", { replace: true, relative: "path" }))
            .catch((rejected: any) => setError(rejected))
    }

    if (isUpdate)
        return <UpdateProjectPlanPage setUpdateProject={setUpdate} {...projectPlan} />

    if (isTransform)
        return <CreateProjectPage setCreateProject={setTransform} />

    return (
        <div>
            { error && <ErrorPopup error={error} /> }
            <ProjectPlanSummary projectPlan={projectPlan} />
            <div className={styles.buttons}>
                <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={ e => {
                    setUpdate(true)
                }}>Update Project Plan</Button>
                <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={ e => {
                    setOpen(true)
                }}>Delete Project Plan</Button>
                <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={ e => {
                    navigate("..", { replace: true, relative: "path" })
                }}>Return</Button>
                { doesProjectExist ||
                    <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={ e => {
                        setTransform(true)
                    }}>Transform to Project</Button>
                }

                { doesProjectExist &&
                    <Link className={styles.link} to={`../projects/${projectPlan.title}`}>To Project</Link>
                }
            </div>
            <Popup open={open} closeOnDocumentClick={false} contentStyle={{ width: '17%' }}>
                <div className={styles.delete_header_popup}>
                    <div>
                        <h2>Are you sure</h2>
                        <h3>All data will be lost</h3>
                        <Button className={styles.confirmButton} sx={buttonCss} onClick={handleDeleteConfirmClick}>Confirm</Button>
                    </div>
                    <CloseIcon className={styles.popup_close} onClick={() => setOpen(false)}></CloseIcon>
                </div>
            </Popup>
        </div>
    )
}

interface ProjectPlanSummaryProps {
    projectPlan: ProjectPlan
}

function ProjectPlanSummary(props: ProjectPlanSummaryProps) {
    let projectPlan = props.projectPlan
    return (
        <div className={styles.project_summary}>
            <h2 className={styles.header}>{projectPlan.title}</h2>
            <span className={styles.data}>Used language: {projectPlan.language}</span>

            <Accordion className={styles.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>Features</AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>
                            { projectPlan.features.map(it => <div>{it}</div>) }
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>Goals</AccordionSummary>
                <AccordionDetails>
                    <div>
                        { projectPlan.goals.map(it => <div>{it}</div>) }
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>Project Points</AccordionSummary>
                <AccordionDetails>
                    <div>
                        { projectPlan.points.map(it => <div>{it}</div>) }
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}