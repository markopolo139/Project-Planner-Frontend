import ErrorPopup from "../../error/ErrorPopup";
import {Autocomplete, Button, Checkbox, CircularProgress, MenuItem, Select, Stack, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useCreateProjectMutation} from "../../../api/ProjectApi";
import Project from "../../../objects/Project";
import {useDispatch} from "react-redux";
import {addProject} from "../../../slices/ProjectsSlice";
import {useState} from "react";
import {useLazyGetSkillsQuery} from "../../../api/SkillsApi";
import styles from "../../../css/main/PutProject.module.sass"
import {buttonCss} from "../../../utils/MuiButtonCss";

interface CreateProjectProps extends Partial<Project> {
    setCreateProject: any
}

export default function CreateProjectPage(props: CreateProjectProps) {
    const [
        createProjectApi,
        { data, error, isError, isLoading, isSuccess }
    ] = useCreateProjectMutation()
    const [ getTechnologies, { data: technologyData }] = useLazyGetSkillsQuery()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();

    const [technologies, setTechnologies] = useState<string[]>(props.technologies ?? [])
    const [features, setFeatures] = useState<string[]>(props.features ?? [])
    const [goals, setGoals] = useState<string[]>(props.goals ?? [])
    const [technology, setTechnology] = useState<string>("")
    const [feature, setFeature] = useState<string>("")
    const [goal, setGoal] = useState<string>("")

    if (isSuccess) {
        return (
            <div className={styles.main}>
                <div className={styles.updated}>
                    <h2>Project created</h2>
                    <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={e => {
                        props.setCreateProject(false)
                        if (data) {
                            dispatch(addProject(data))
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
                project.goals = goals
                project.features = features
                project.technologies = technologies
                createProjectApi(project)
            }) }>
                <input hidden value={props.projectId} type="number" {...register("projectId")}></input>
                <h2>Create project:</h2>

                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <label>Github Link:</label>
                        <TextField
                            defaultValue={props.githubLink} className="TextField" placeholder="Github Link" variant="outlined"
                            type="text" {...register("githubLink")}
                        />
                    </div>

                    <div className={styles.input}>
                        <label>Project Title:</label>
                        <TextField
                            defaultValue={props.title} className="TextField" placeholder="Project Title" variant="outlined"
                            type="text" {...register("title")}
                        />
                    </div>

                    <div className={styles.input}>
                        <label>Language:</label>
                        <TextField
                            defaultValue={props.language} className="TextField" placeholder="Language" variant="outlined"
                            type="text" {...register("language")}
                        />
                    </div>
                </div>

                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <label>Date of start:</label>
                        <TextField
                            defaultValue={props.dateOfStart?.toISOString().split("Z")[0]} className="TextField"
                            variant="outlined" type="datetime-local" {...register("dateOfStart")}
                        />
                    </div>

                    <div className={styles.input}>
                        <label>Is current?</label>
                        <Checkbox {...register("isCurrent")}/>
                    </div>

                    <div className={styles.input}>
                        <label>Deadline:</label>
                        <TextField
                            defaultValue={props.deadline?.toISOString().split("Z")[0]} className="TextField"
                            variant="outlined" type="datetime-local" {...register("deadline")}
                        />
                    </div>
                </div>

                <div className={styles.inputs}>
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
                </div>

                <div className={styles.inputs}>
                    <div className={styles.list_input}>
                        Goals:
                        <TextField className="TextField" label="goal" variant="outlined" onChange={e => setGoal(e.target.value)} />
                        <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={
                            e => {
                                setGoals([...goals, goal])
                                setGoal("")
                        }}>Add Goal</Button>
                        { (goals.length !== 0)
                            && <Stack className={styles.stack} spacing={1}>
                                {goals.map(it =>
                                    <div className={styles.stack_item} key={it}>
                                        <span>{it}</span>
                                        <Button className={styles.button_stack} sx={buttonCss} variant="outlined" onClick={
                                            e => {
                                                setGoals(goals.filter(goal => goal !== it))
                                        }}>Delete</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>

                    <div className={styles.list_input}>
                        Features:
                        <TextField className="TextField" label="feature" variant="outlined" onChange={e => { setFeature(e.target.value) }} />
                        <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={
                            e => {
                                setFeatures([...features, feature])
                                setFeature("")
                            }
                        }>Add Feature</Button>
                        { (features.length !== 0)
                            && <Stack className={styles.stack} spacing={1}>
                                {features.map(it =>
                                    <div className={styles.stack_item} key={it}>
                                        <span>{it}</span>
                                        <Button className={styles.button_stack} sx={buttonCss} variant="outlined" onClick={
                                            e => {
                                                setFeatures(features.filter(feature => feature !== it))
                                            }
                                        }>Delete</Button>
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
                            renderInput={(params) => <TextField {...params} label="Features" />}
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
                            && <Stack className={styles.stack} spacing={1}>
                                {technologies.map(it =>
                                    <div className={styles.stack_item} key={it}>
                                        <span>{it}</span>
                                        <Button className={styles.button_stack} sx={buttonCss} variant="outlined" onClick={
                                            e => {
                                                setTechnologies(technologies.filter(technology => technology !== it))
                                            }
                                        }>Delete</Button>
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
                    <Button className={styles.button} sx={buttonCss} variant="outlined" type="submit">Create Project</Button>
                    <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={e => {
                        props.setCreateProject(false)
                    }}>Return</Button>
                </div>
                { isLoading && <CircularProgress /> }
            </form>
        </div>
    )
}