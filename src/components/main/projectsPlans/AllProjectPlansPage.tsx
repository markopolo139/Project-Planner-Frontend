import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "../../../css/main/projects/AllProjects.module.sass";
import {Autocomplete, Button, TextField} from "@mui/material";
import {buttonCss} from "../../../utils/MuiButtonCss";
import {Link} from "react-router-dom";
import {selectProjectsPlans} from "../../../slices/ProjectPlansSlice";
import CreatePlanPage from "./CreatePlanPage";
import {selectProjects} from "../../../slices/ProjectsSlice";
import Project from "../../../objects/Project";
import CloseIcon from "@mui/icons-material/Close";
import Popup from "reactjs-popup";

export default function AllProjectPlansPage() {
    const [createProjectPlan, setCreateProjectPlan] = useState(false)
    const projectsPlans = useSelector(selectProjectsPlans)

    const [open, setOpen] = useState(false)

    const projects = useSelector(selectProjects)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    function handleSelectProjectButton(_: any) {
        setOpen(false)
        setCreateProjectPlan(true)
    }

    if (createProjectPlan) {
        if (selectedProject) {
            return (
                <div>
                    <CreatePlanPage
                        projectPlanId={0} title={selectedProject.title} language={selectedProject.language}
                        features={selectedProject.features} goals={selectedProject.goals}
                        setCreateProjectPlan={setCreateProjectPlan}
                    />
                </div>
            )
        }
        else {
            return (
                <div>
                    <CreatePlanPage projectPlanId={0} setCreateProjectPlan={setCreateProjectPlan}/>
                </div>
            )
        }
    }

    return (
        <div className={styles.body}>

            <Popup open={open} closeOnDocumentClick={false} contentStyle={{ width: '17%' }}>
                <div>
                    <div>
                        <h2>Select project to based plan on</h2>
                        <Autocomplete
                            disablePortal
                            options={projects ? projects : []}
                            getOptionLabel={(option) => option.title}
                            sx={{ width: 200 }}
                            filterOptions={(x) => x}
                            renderInput={(params) => <TextField {...params} label="Projects title" />}
                            onChange={ (e, value) => {
                                if (value !== null) {
                                    setSelectedProject(value)
                                }
                            }}
                        />
                        <Button sx={buttonCss} onClick={handleSelectProjectButton}>Select</Button>
                        <Button sx={buttonCss} onClick={handleSelectProjectButton}>Create New Plan</Button>
                    </div>
                    <CloseIcon onClick={() => setOpen(false)}></CloseIcon>
                </div>
            </Popup>

            <h2>All Projects Plans:</h2>
            <div className={styles.nav_bar}>
                <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={ e => {
                    setOpen(true)
                }}>Create Project Plan</Button>
            </div>
            <div className={styles.projects}>
                {projectsPlans.map( it =>
                    <Link to={ it.title } key={ it.title }>{it.title}</Link>
                )}
            </div>
        </div>
    )
}