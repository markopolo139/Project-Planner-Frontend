import React, {useState} from "react";
import Popup from "reactjs-popup";
import CloseIcon from "@mui/icons-material/Close";
import {Button, TextField} from "@mui/material";
import {setLoggedInUsername} from "../../../slices/LoggedInUserSlice";
import {useDispatch, useSelector} from "react-redux";
import {useLazyGetPrivateReposQuery, useLazyGetPublicReposQuery} from "../../../api/GithubApi";
import ErrorPage from "../../error/ErrorPage";
import ErrorPopup from "../../error/ErrorPopup";
import {mapToProject} from "../../../objects/GithubResponse";
import {addOnlyNewProjects, addProjects, selectProjects} from "../../../slices/ProjectsSlice";
import {useCreateProjectsMutation} from "../../../api/ProjectApi";
import Project from "../../../objects/Project";
import styles from "../../../css/main/projects/ImportGithub.module.sass"

interface ImportGithubProps {
    setImportGithub: any
}

export default function ImportGithubComponent(props: ImportGithubProps) {
    const [open, setOpen] = useState(true)
    const [isImport, setImport] = useState(false)
    const [isUsernameImport, setUsernameImport] = useState(true)
    const [text, setText] = useState("")
    const dispatch = useDispatch()
    const [getPublicProjects, { error: errorPublic }] = useLazyGetPublicReposQuery()
    const [getPrivateProjects, { error: errorPrivate }] = useLazyGetPrivateReposQuery()
    const [createProjects, { error: createProjectsError }] = useCreateProjectsMutation()
    const projectsIds = useSelector(selectProjects).map(it => it.title)

    function filterToOnlyNewProjects(projects: Project[]): Project[] {
        return projects.filter(it => !projectsIds.includes(it.title))
    }

    function apiCall() {
        if (isUsernameImport) {
            getPublicProjects(text).unwrap().then(
                data => {
                    let projects = data.map(it => mapToProject(it))
                    createProjects(filterToOnlyNewProjects(projects)).unwrap().then( data => {
                        dispatch(addProjects(data))
                    }).catch(e => console.log(e))
                }
            ).catch(e => console.log(e))
        }
        else {
            getPrivateProjects(text).unwrap().then(
                data => {
                    let projects = data.map(it => mapToProject(it))
                    createProjects(filterToOnlyNewProjects(projects)).unwrap().then( data => {
                        dispatch(addProjects(data))
                    }).catch(e => console.log(e))
                }
            ).catch(e => console.log(e))
        }

        setOpen(false)
        props.setImportGithub(false)
    }

    return (
        <Popup open={open} closeOnDocumentClick={false}>
            { errorPublic && <ErrorPopup error={errorPublic} /> }
            { errorPrivate && <ErrorPopup error={errorPrivate} /> }
            { createProjectsError && <ErrorPopup error={createProjectsError} /> }
            <div className={styles.popup_header}>
                <h2>Import projects</h2>
                <div className={styles.popup_close_container}>
                    <CloseIcon className={styles.popup_close} onClick={() => {
                        setOpen(false)
                        props.setImportGithub(false)
                    }}></CloseIcon>
                </div>
            </div>
            { isImport ||
                <div className={styles.popup_text}>
                    <h2>Select method</h2>
                    <Button className={styles.button} variant="outlined" onClick={ e => {
                        setImport(true)
                        setUsernameImport(false)
                    }}>Import private(via github token) projects</Button>
                    <Button className={styles.button} variant="outlined" onClick={ e => {
                        setImport(true)
                        setUsernameImport(true)
                    }}>Import public(via github username) projects</Button>
                </div>
            }
            { isImport &&
                <form className={styles.popup_form} onSubmit={e => {
                    e.preventDefault()
                    setImport(false)
                    apiCall()
                }}>
                    <TextField
                        className="TextField" label={isUsernameImport ? "Type username" : "Type token"} variant="outlined"
                        onChange={ e => { setText(e.target.value.trim()) } }
                    />
                    <Button className={styles.button} variant="outlined" type="submit">Import projects</Button>
                </form>
            }
        </Popup>
    )
}
