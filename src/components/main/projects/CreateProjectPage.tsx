import ErrorPopup from "../../error/ErrorPopup";
import {Autocomplete, Button, Checkbox, CircularProgress, MenuItem, Select, Stack, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useCreateProjectMutation} from "../../../api/ProjectApi";
import Project from "../../../objects/Project";
import {useDispatch} from "react-redux";
import {addProject} from "../../../slices/ProjectsSlice";
import {useState} from "react";
import {useLazyGetSkillsQuery} from "../../../api/SkillsApi";
import styles from "../../../css/main/projects/PutProject.module.sass"
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

    const [technologies, setTechnologies] = useState<string[]>([])
    const [features, setFeatures] = useState<string[]>([])
    const [goals, setGoals] = useState<string[]>([])
    const [technology, setTechnology] = useState<string>("")
    const [feature, setFeature] = useState<string>("")
    const [goal, setGoal] = useState<string>("")

    if (isSuccess) {
        return (
            <div>
                <h2>Project created</h2>
                <Button className={styles.button} variant="outlined" onClick={e => {
                    props.setCreateProject(false)
                    if (data) {
                        dispatch(addProject(data))
                    }
                }}>Return</Button>
            </div>
        )
    }

    return (
        <div>
            { isError && <ErrorPopup error={error} /> }
            <form onSubmit={ handleSubmit((data) => {
                let project = data as Project
                project.goals = goals
                project.features = features
                project.technologies = technologies
                createProjectApi(project)
            }) }>
                <input hidden value={props.projectId} type="number" {...register("projectId")}></input>
                <h2>Create project:</h2>
                <TextField
                    defaultValue={props.githubLink} className="TextField" label="githubLink" variant="outlined"
                    type="text" {...register("githubLink")}
                />
                <TextField
                    defaultValue={props.title} className="TextField" label="title" variant="outlined"
                    type="text" {...register("title")}
                />
                <TextField
                    defaultValue={props.description} className="TextField" label="description" variant="outlined"
                    type="text" {...register("description")}
                />
                <TextField
                    defaultValue={props.language} className="TextField" label="language" variant="outlined"
                    type="text" {...register("language")}
                />
                <div>
                    <label>deadline</label>
                    <TextField
                        defaultValue={props.deadline?.toISOString().split("Z")[0]} className="TextField"
                        variant="outlined" type="datetime-local" {...register("deadline")}
                    />
                </div>
                <div>
                    <label>dateOfStart</label>
                    <TextField
                        defaultValue={props.dateOfStart?.toISOString().split("Z")[0]} className="TextField"
                        variant="outlined" type="datetime-local" {...register("dateOfStart")}
                    />
                </div>
                <div>
                    Is current?
                    <Checkbox {...register("isCurrent")}/>
                </div>

                <div>
                    Project status:
                    <Select
                        defaultValue={"ACTIVE"}
                        {...register("projectStatus")}
                    >
                        <MenuItem value={"ACTIVE"}>Active</MenuItem>
                        <MenuItem value={"BREAK"}>Break</MenuItem>
                        <MenuItem value={"CANCELED"}>Canceled</MenuItem>
                        <MenuItem value={"WORKING_ON"}>Working on</MenuItem>
                        <MenuItem value={"NOT_STARTED"}>Not started yet</MenuItem>
                    </Select>
                </div>

                <div>
                    <div>
                        Goals:
                        <TextField className="TextField" label="goal" variant="outlined" onChange={e => setGoal(e.target.value)} />
                        <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={
                            e => {
                                setGoals([...goals, goal])
                                setGoal("")
                        }}>Add Goal</Button>
                        { (goals.length !== 0)
                            && <Stack spacing={1}>
                                {goals.map(it =>
                                    <div key={it}>
                                        <span>{it}</span>
                                        <Button className="Button-Stack" sx={buttonCss} variant="outlined" onClick={
                                            e => {
                                                setGoals(goals.filter(goal => goal !== it))
                                        }}>Delete</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>

                    <div>
                        Features:
                        <TextField className="TextField" label="feature" variant="outlined" onChange={e => { setFeature(e.target.value) }} />
                        <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={
                            e => {
                                setFeatures([...features, feature])
                                setFeature("")
                            }
                        }>Add Feature</Button>
                        { (features.length !== 0)
                            && <Stack spacing={1}>
                                {features.map(it =>
                                    <div key={it}>
                                        <span>{it}</span>
                                        <Button className="Button-Stack" sx={buttonCss} variant="outlined" onClick={
                                            e => {
                                                setFeatures(features.filter(feature => feature !== it))
                                            }
                                        }>Delete</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>

                    <div>
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
                            && <Stack spacing={1}>
                                {technologies.map(it =>
                                    <div key={it}>
                                        <span>{it}</span>
                                        <Button className="Button-Stack" sx={buttonCss} variant="outlined" onClick={
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

                <div>
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