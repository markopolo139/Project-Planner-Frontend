import {useLazyFilterProjectsQuery} from "../../../api/ProjectApi";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {ProjectFilterModel} from "../../../objects/ProjectFilterModel";
import ErrorPopup from "../../error/ErrorPopup";
import {setNewProjects} from "../../../slices/ProjectsSlice";
import {Button, Checkbox, MenuItem, Select, TextField} from "@mui/material";
import ProjectStatus from "../../../objects/ProjectStatus";
import {AnyAction, Dispatch} from "@reduxjs/toolkit";
import styles from "../../../css/main/projects/ProjectFilter.module.sass"

interface ProjectFilterProps {
    dispatch: Dispatch<AnyAction>
}

export default function ProjectFilterComponent(props: ProjectFilterProps) {
    const [
        getFilterd,
        { data, error, isError, isSuccess }
    ] = useLazyFilterProjectsQuery()

    const [filterModel, setFilterModel] = useState<Partial<ProjectFilterModel>>({ projectStatus: "ACTIVE"})

    if (isSuccess) {
        if (data) {
            props.dispatch(setNewProjects(data))
        }
    }
    //TODO: Add colors to project status filter
    return (
        <div className={styles.body}>
            { isError && <ErrorPopup error={error} /> }
            <div className={styles.field}>
                <label>Language:</label>
                <TextField
                    className={styles.text_field} label="language" variant="outlined" type="text"
                    onChange={event => {
                        setFilterModel({...filterModel, language: event.target.value ? event.target.value : undefined})
                    }}
                />
            </div>
            <div className={styles.field}>
                <label>Date Of Start Beginning:</label>
                <TextField
                    className={styles.text_field} variant="outlined" type="datetime-local"
                    onChange={event => {
                        setFilterModel({...filterModel, dateOfStartBeginning: event.target.value ? event.target.value as unknown as Date : undefined})
                    }}
                />
            </div>
            <div className={styles.field}>
                <label>Date Of Start Ending:</label>
                <TextField
                    className={styles.text_field} variant="outlined" type="datetime-local"
                    onChange={event => {
                        setFilterModel({...filterModel, dateOfStartEnding: event.target.value ? event.target.value as unknown as Date: undefined})
                    }}
                />
            </div>
            <div className={styles.field}>
                Is current?
                <Checkbox onChange={event => {
                    setFilterModel({...filterModel, isCurrentProject: event.target.checked})
                }}/>
            </div>

            <div className={styles.field}>
                Project status:
                <Select
                    style={{width: "75%"}}
                    defaultValue={"ACTIVE"}
                    onChange={event => {
                        setFilterModel({...filterModel, projectStatus: event.target.value as ProjectStatus})
                    }}
                >
                    <MenuItem className={styles.menu_item} value={"ACTIVE"}>
                        Active <div style={{background: "blue", width: "24px", height: "24px"}}></div>
                    </MenuItem>
                    <MenuItem className={styles.menu_item} value={"BREAK"}>
                        Break <div style={{background: "yellow", width: "24px", height: "24px"}}></div>
                    </MenuItem>
                    <MenuItem className={styles.menu_item} value={"CANCELED"}>
                        Canceled <div style={{background: "red", width: "24px", height: "24px"}}></div>
                    </MenuItem>
                    <MenuItem className={styles.menu_item} value={"WORKING_ON"}>
                        Working on <div style={{background: "green", width: "24px", height: "24px"}}></div>
                    </MenuItem>
                    <MenuItem className={styles.menu_item} value={"NOT_STARTED"}>
                        Not started yet <div style={{background: "gray", width: "24px", height: "24px"}}></div>
                    </MenuItem>
                </Select>
            </div>
            <div className={styles.filter_buttons}>
                <Button className={styles.button} variant="outlined" onClick={
                    e => {
                        getFilterd(filterModel)
                    }
                }>Filter</Button>
                <Button className={styles.button} variant="outlined" onClick={
                    e => {
                        setFilterModel({})
                        getFilterd({})
                    }
                }>Clear Filter</Button>
            </div>
        </div>
    )
}