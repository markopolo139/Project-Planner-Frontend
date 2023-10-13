import {useLazyFilterProjectsQuery} from "../../../api/ProjectApi";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {ProjectFilterModel} from "../../../objects/ProjectFilterModel";
import ErrorPopup from "../../error/ErrorPopup";
import {setNewProjects} from "../../../slices/ProjectsSlice";
import {Button, Checkbox, MenuItem, Select, TextField} from "@mui/material";
import ProjectStatus from "../../../objects/ProjectStatus";
import {AnyAction, Dispatch} from "@reduxjs/toolkit";

interface ProjectFilterProps {
    dispatch: Dispatch<AnyAction>
}

export default function ProjectFilterComponent(props: ProjectFilterProps) {
    const [
        getFilterd,
        { data, error, isError, isSuccess }
    ] = useLazyFilterProjectsQuery()

    const [filterModel, setFilterModel] = useState<Partial<ProjectFilterModel>>({})

    if (isSuccess) {
        if (data) {
            props.dispatch(setNewProjects(data))
        }
    }

    return (
        <div>
            { isError && <ErrorPopup error={error} /> }
            <TextField
                className="TextField" label="language" variant="outlined" type="text"
                onChange={event => {
                    setFilterModel({...filterModel, language: event.target.value ? event.target.value : undefined})
                }}
            />
            <div>
                <label>dateOfStartBeginning</label>
                <TextField
                    className="TextField" variant="outlined" type="datetime-local"
                    onChange={event => {
                        setFilterModel({...filterModel, dateOfStartBeginning: event.target.value ? event.target.value as unknown as Date : undefined})
                    }}
                />
            </div>
            <div>
                <label>dateOfStartEnding</label>
                <TextField
                    className="TextField" variant="outlined" type="datetime-local"
                    onChange={event => {
                        setFilterModel({...filterModel, dateOfStartEnding: event.target.value ? event.target.value as unknown as Date: undefined})
                    }}
                />
            </div>
            <div>
                Is current?
                <Checkbox onChange={event => {
                    setFilterModel({...filterModel, isCurrentProject: event.target.checked})
                }}/>
            </div>

            <div>
                Project status:
                <Select
                    defaultValue={"ACTIVE"}
                    onChange={event => {
                        setFilterModel({...filterModel, projectStatus: event.target.value as ProjectStatus})
                    }}
                >
                    <MenuItem value={"ACTIVE"}>Active</MenuItem>
                    <MenuItem value={"BREAK"}>Break</MenuItem>
                    <MenuItem value={"CANCELED"}>Canceled</MenuItem>
                    <MenuItem value={"WORKING_ON"}>Working on</MenuItem>
                    <MenuItem value={"NOT_STARTED"}>Not started yet</MenuItem>
                </Select>
            </div>
            <Button className="Button" variant="outlined" onClick={
                e => {
                    getFilterd(filterModel)
                }
            }>Filter</Button>
            <Button className="Button" variant="outlined" onClick={
                e => {
                    setFilterModel({})
                    getFilterd({})
                }
            }>Clear Filter</Button>
        </div>
    )
}