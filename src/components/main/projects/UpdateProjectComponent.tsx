import ErrorPopup from "../../error/ErrorPopup";
import CreateUserModel from "../../../objects/CreateUserModel";
import {
    Autocomplete,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel, MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {useUserCreateMutation} from "../../../api/CreateUserApi";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useCreateProjectMutation, useUpdateProjectMutation} from "../../../api/ProjectApi";
import Project from "../../../objects/Project";
import {useDispatch} from "react-redux";
import {addProject, updateProject} from "../../../slices/ProjectsSlice";
import {CheckBox} from "@mui/icons-material";
import {useLazyGetSkillsQuery} from "../../../api/SkillsApi";
import {useEffect, useState} from "react";
import styles from "../../../css/main/PutProject.module.sass"
import {buttonCss} from "../../../utils/MuiButtonCss";
import {wait} from "@testing-library/user-event/dist/utils";

interface UpdateProjectProps extends Partial<Project> {
    setUpdateProject: any
}

export default function UpdateProjectPage(props: UpdateProjectProps) {
    const [
        updateProjectApi,
        { data, error, isError, isLoading, isSuccess }
    ] = useUpdateProjectMutation()
    const [ getTechnologies, { data: technologyData }] = useLazyGetSkillsQuery()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();

    const [technologies, setTechnologies] = useState<string[]>(props.technologies ?? [])
    const [features, setFeatures] = useState<string[]>(props.features ?? [])
    const [goals, setGoals] = useState<string[]>(props.goals ?? [])
    const [technology, setTechnology] = useState<string>("")
    const [feature, setFeature] = useState<string>("")
    const [goal, setGoal] = useState<string>("")
    const navigate = useNavigate()

    if (isSuccess) {
        return (
            <div className={styles.main}>
                <div className={styles.updated}>
                    <h2>Project updated</h2>
                    <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={e => {
                        if (data) {
                            dispatch(updateProject(data))
                            navigate("..", { replace: true, relative: "path" })
                        }
                    }}>Return</Button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.main}>
            { isError && <ErrorPopup error={error} /> }
            <form className={styles.form} onSubmit={ handleSubmit((data) => {
                let project = data as Project
                project.technologies = technologies
                project.features = features
                project.goals = goals
                updateProjectApi(data as Project)
            }) }>
                <input hidden value={props.projectId} type="number" {...register("projectId")}></input>
                <input hidden value={props.githubLink} type="text" {...register("githubLink")}/>
                <input hidden value={props.title} type="text"{...register("title")}/>
                <h2>Update project {props.title}:</h2>

                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <label>Language:</label>
                        <TextField
                            defaultValue={props.language} className="TextField" variant="outlined" placeholder="Language"
                            type="text" {...register("language")}
                        />
                    </div>

                    <div className={styles.input}>
                        <label>Project status:</label>
                        <Select
                            style={{width: "100%"}}
                            defaultValue={props.projectStatus}
                            inputProps={{'sx': {'display': 'flex', 'justifyContent': 'space-between'}}}
                            {...register("projectStatus")}
                        >
                            <MenuItem sx={{'display': 'flex', 'justifyContent': 'space-between'}} value={"ACTIVE"}>
                                Active <div style={{background: "blue", width: "24px", height: "24px"}}></div>
                            </MenuItem>
                            <MenuItem sx={{'display': 'flex', 'justifyContent': 'space-between'}} value={"BREAK"}>
                                Break <div style={{background: "yellow", width: "24px", height: "24px"}}></div>
                            </MenuItem>
                            <MenuItem sx={{'display': 'flex', 'justifyContent': 'space-between'}} value={"CANCELED"}>
                                Canceled <div style={{background: "red", width: "24px", height: "24px"}}></div>
                            </MenuItem>
                            <MenuItem sx={{'display': 'flex', 'justifyContent': 'space-between'}} value={"WORKING_ON"}>
                                Working on <div style={{background: "green", width: "24px", height: "24px"}}></div>
                            </MenuItem>
                            <MenuItem sx={{'display': 'flex', 'justifyContent': 'space-between'}} value={"NOT_STARTED"}>
                                Not started yet <div style={{background: "gray", width: "24px", height: "24px"}}></div>
                            </MenuItem>
                        </Select>
                    </div>

                    <div className={styles.input}>
                        Is current?
                        <Checkbox checked={props.isCurrent} {...register("isCurrent")}/>
                    </div>
                </div>

                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <label>Date Of Start:</label>
                        <TextField
                            defaultValue={props.dateOfStart} className="TextField"
                            variant="outlined" type="datetime-local" {...register("dateOfStart")}
                        />
                    </div>

                    <div className={styles.input}>
                        <label>Deadline:</label>
                        <TextField
                            defaultValue={props.deadline} className="TextField"
                            variant="outlined" type="datetime-local" {...register("deadline")}
                        />
                    </div>
                </div>

                <div className={styles.inputs}>
                    <div className={styles.list_input}>
                        Goals:
                        <TextField className="TextField" placeholder="Goal" variant="outlined" onChange={e => setGoal(e.target.value)} />
                        <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={
                            e => {
                                setGoals([...goals, goal])
                                setGoal("")
                            }}>Add Goal</Button>
                        { (goals.length !== 0)
                            && <Stack className={styles.stack} spacing={1} sx={{'width': '60%'}}>
                                {goals.map(it =>
                                    <div className={styles.stack_item} key={it}>
                                        <span>{it}</span>
                                        <Button className={styles.button_stack} sx={buttonCss} variant="outlined" onClick={
                                            e => {
                                                setGoals(goals.filter(goal => goal !== it))
                                            }}>X</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>

                    <div className={styles.list_input}>
                        Features:
                        <TextField className="TextField" placeholder="Feature" variant="outlined" onChange={e => { setFeature(e.target.value) }} />
                        <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={
                            e => {
                                setFeatures([...features, feature])
                                setFeature("")
                            }
                        }>Add Feature</Button>
                        { (features.length !== 0)
                            && <Stack className={styles.stack} spacing={1} sx={{'width': '60%'}}>
                                {features.map(it =>
                                    <div className={styles.stack_item} key={it}>
                                        <span>{it}</span>
                                        <Button className={styles.button_stack} sx={buttonCss} variant="outlined" onClick={
                                            e => {
                                                setFeatures(features.filter(feature => feature !== it))
                                            }
                                        }>X</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>

                    <div className={styles.list_input}>
                        Technologies:
                        <Autocomplete
                            disablePortal
                            options={technologyData ? technologyData : []}
                            sx={{ width: 200 }}
                            filterOptions={(x) => x}
                            renderInput={(params) => <TextField {...params} placeholder="Technology" />}
                            onInputChange={(e, value) => { getTechnologies(value) }}
                            onChange={ (e, value) => {
                                if (value !== null) {
                                    setTechnology(value)
                                }
                            }}
                        />
                        <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={
                            e => {
                                setTechnologies([...technologies, technology])
                                setTechnology("")
                            }
                        }>Add Technology</Button>
                        { (technologies.length !== 0)
                            && <Stack className={styles.stack} spacing={1} sx={{'width': '60%'}}>
                                {technologies.map(it =>
                                    <div className={styles.stack_item} key={it}>
                                        <span>{it}</span>
                                        <Button className={styles.button_stack} sx={buttonCss} variant="outlined" onClick={
                                            e => {
                                                setTechnologies(technologies.filter(technology => technology !== it))
                                            }
                                        }>X</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>
                </div>

                <div className={styles.input}>
                    <label>Description: </label>
                    <textarea
                        defaultValue={props.description} className={styles.textarea}
                        {...register("description")}
                    ></textarea>
                </div>

                <div className={styles.buttons}>
                    <Button className={styles.button} sx={buttonCss} variant="outlined" type="submit">Update Project</Button>
                    <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={e => {
                        props.setUpdateProject(false)
                    }}>Return</Button>
                </div>
                { isLoading && <CircularProgress /> }
            </form>
        </div>
    )
}