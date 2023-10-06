import React, {useState} from "react";
import Popup from "reactjs-popup";
import CloseIcon from "@mui/icons-material/Close";
import {Button, TextField} from "@mui/material";
import {setLoggedInUsername} from "../../../slices/LoggedInUserSlice";
import {useDispatch} from "react-redux";
import {useLazyGetPrivateReposQuery, useLazyGetPublicReposQuery} from "../../../api/GithubApi";
import ErrorPage from "../../error/ErrorPage";
import ErrorPopup from "../../error/ErrorPopup";
import {mapToProject} from "../../../objects/GithubResponse";
import {addOnlyNewProjects} from "../../../slices/ProjectsSlice";

export default function ImportGithubComponent() {
    const [open, setOpen] = useState(true);
    const [isImport, setImport] = useState(false);
    const [isUsernameImport, setUsernameImport] = useState(true);
    const [text, setText] = useState("")
    const dispatch = useDispatch()
    const [getPublicProjects, { error: errorPublic }] = useLazyGetPublicReposQuery()
    const [getPrivateProjects, { error: errorPrivate }] = useLazyGetPrivateReposQuery()

    function apiCall() {
        if (isUsernameImport) {
            getPublicProjects(text).unwrap().then(
                data => dispatch(addOnlyNewProjects(data.map(it => mapToProject(it))))
            )
        }
        else {
            getPrivateProjects(text).unwrap().then(
                data => dispatch(addOnlyNewProjects(data.map(it => mapToProject(it))))
            )
        }
    }

    return (
        <Popup open={open} closeOnDocumentClick>
            { errorPublic && <ErrorPopup error={errorPublic} /> }
            { errorPrivate && <ErrorPopup error={errorPrivate} /> }
            <div className="popup-header">
                <h2>Import projects</h2>
                <CloseIcon className="popup-close" onClick={() => setOpen(false)}></CloseIcon>
            </div>
            { isImport ||
                <div className="popup-text">
                    <h2>Select method</h2>
                    <Button className="Button" variant="outlined" onClick={ e => {
                        setImport(true)
                        setUsernameImport(false)
                    }}>Import private(via github token) projects</Button>
                    <Button className="Button" variant="outlined" onClick={ e => {
                        setImport(true)
                        setUsernameImport(false)
                    }}>Import public(via github username) projects</Button>
                </div>
            }
            { isImport &&
                <form onSubmit={e => {
                    e.preventDefault()
                    setImport(false)
                    apiCall()
                }}>
                    <h2></h2>
                    <TextField
                        className="TextField" label={isUsernameImport ? "Type username" : "Type token"} variant="outlined"
                        onChange={ e => { setText(e.target.value.trim()) } }
                    />
                    <Button className="Button" variant="outlined" type="submit">Import projects</Button>
                </form>
            }
        </Popup>
    )
}
