import {Link, useLoaderData} from "react-router-dom";
import Project from "../../../objects/Project";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects} from "../../../slices/ProjectsSlice";
import {Button} from "@mui/material";
import {useState} from "react";
import ImportGithubComponent from "./ImportGithubComponent";

export default function AllProjectsPage() {
    const [importGithub, setImportGithub] = useState(false)
    const projects = useSelector(selectProjects)

    return (
        <div>
            { importGithub && <ImportGithubComponent setImportGithub={setImportGithub} /> }
            <div>
                <h2>All Projects:</h2>
                <Button className="Button" variant="outlined" onClick={ e => {
                    setImportGithub(!importGithub)
                }}>{importGithub && "Close"} Import projects from github</Button>
                <Link to="projects/create">Create Project</Link>
            </div>
            <div>
                {projects.map( it =>
                    <div className={it.projectStatus.toLowerCase().replace("_", "-") + "-project"} key={ it.title }>{it.title}</div>
                )}
            </div>
        </div>
    )
}