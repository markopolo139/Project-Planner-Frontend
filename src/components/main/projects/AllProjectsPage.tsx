import {Link, useLoaderData} from "react-router-dom";
import Project from "../../../objects/Project";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects} from "../../../slices/ProjectsSlice";
import {Button} from "@mui/material";
import {useState} from "react";
import ImportGithubComponent from "./ImportGithubComponent";
import ProjectFilterComponent from "./ProjectFilterComponent";
import CreateProjectPage from "./CreateProjectPage";
import styles from "../../../css/main/projects/AllProjects.module.sass"

export default function AllProjectsPage() {
    const [importGithub, setImportGithub] = useState(false)
    const [filter, setFilter] = useState(false)
    const [createProject, setCreateProject] = useState(false)
    const projects = useSelector(selectProjects)
    const dispatch = useDispatch()

    if (createProject)
        return (
            <div>
                <CreateProjectPage
                    projectId={0} dateOfStart={new Date(new Date().setSeconds(0, 0))} isCurrent={false}
                    projectStatus="NOT_STARTED" setCreateProject={setCreateProject}
                />
            </div>
        )


    return (
        <div className={styles.body}>
            { importGithub && <ImportGithubComponent setImportGithub={setImportGithub} /> }
            <h2>All Projects:</h2>
            <div className={styles.nav_bar}>
                <Button className={styles.nav_button} variant="outlined" onClick={ e => {
                    setFilter(!filter)
                }}>{filter && "Close"} Filter</Button>
                <Button className={styles.nav_button} variant="outlined" onClick={ e => {
                    setImportGithub(!importGithub)
                }}>{importGithub && "Close"} Import projects from github</Button>
                <Button className={styles.nav_button} variant="outlined" onClick={ e => {
                    setCreateProject(true)
                }}>Create Project</Button>
            </div>
            { filter && <div><ProjectFilterComponent dispatch={dispatch}/></div> }
            <div className={styles.projects}>
                {projects.map( it =>
                    <Link to={ it.title } className={it.projectStatus.toLowerCase().replace("_", "-") + `-project ${styles.project}`} key={ it.title }>{it.title}</Link>
                )}
            </div>
        </div>
    )
}