import {Link, useLoaderData} from "react-router-dom";
import Project from "../../../objects/Project";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects} from "../../../slices/ProjectsSlice";
import {Button} from "@mui/material";
import {useState} from "react";
import ImportGithubComponent from "./ImportGithubComponent";
import ProjectFilterComponent from "./ProjectFilterComponent";
import SaveProjectPage from "./SaveProjectPage";

export default function AllProjectsPage() {
    const [importGithub, setImportGithub] = useState(false)
    const [filter, setFilter] = useState(false)
    const [createProject, setCreateProject] = useState(false)
    const projects = useSelector(selectProjects)

    if (createProject)
        return (
            <div>
                <SaveProjectPage
                    isUpdate={false} projectId={0} dateOfStart={new Date()} isCurrent={false}
                    projectStatus="NOT_STARTED" setCreateProject={setCreateProject}
                />
            </div>
        )

    //TODO: add css to all components in this folder
    return (
        <div>
            { importGithub && <ImportGithubComponent setImportGithub={setImportGithub} /> }
            <div>
                <h2>All Projects:</h2>
                <Button className="Button" variant="outlined" onClick={ e => {
                    setImportGithub(!importGithub)
                }}>{importGithub && "Close"} Import projects from github</Button>
                <Button className="Button" variant="outlined" onClick={ e => {
                    setFilter(!filter)
                }}>{filter && "Close"} Filter</Button>
                <Button className="Button" variant="outlined" onClick={ e => {
                    setCreateProject(true)
                }}>Create Project</Button>
            </div>
            { filter && <div><ProjectFilterComponent/></div> }
            <div>
                {projects.map( it =>
                    <Link to={ it.title } className={it.projectStatus.toLowerCase().replace("_", "-") + "-project"} key={ it.title }>{it.title}</Link>
                )}
            </div>
        </div>
    )
}