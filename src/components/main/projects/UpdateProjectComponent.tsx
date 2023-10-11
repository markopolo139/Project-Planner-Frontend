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
import {useState} from "react";

interface UpdateProjectProps extends Partial<Project> {
    setUpdateProject: any
}

export default function UpdateProjectPage(props: UpdateProjectProps) {
    const [
        updateProjectApi,
        { data, error, isError, isLoading, isSuccess }
    ] = useUpdateProjectMutation()
    const [ getFeatures, { data: featuresData }] = useLazyGetSkillsQuery()
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
                <h2>Project updated</h2>
                <Button className="Button" variant="outlined" onClick={e => {
                    props.setUpdateProject(false)
                    if (data) {
                        dispatch(updateProject(data))
                    }
                }}>Return</Button>
            </div>
        )
    }

    return (
        <div>
            { isError && <ErrorPopup error={error} /> }
            <form onSubmit={ handleSubmit((data) => {
                console.log(data)
                updateProjectApi(data as Project)
            }) }>
                <input hidden value={props.projectId} type="number" {...register("projectId")}></input>
                <h2>Update project:</h2>
                <TextField
                    defaultValue={props.githubLink} className="TextField" label="githubLink" variant="outlined"
                    type="text" {...register("githubLink")}
                />
                <TextField
                    defaultValue={props.title} className="TextField" label="title" variant="outlined" type="text"
                    {...register("title")}
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
                    <Checkbox checked={props.isCurrent} {...register("isCurrent")}/>
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
                        <TextField className="TextField" label="goal" variant="outlined"
                                   onChange={e => setGoal(e.target.value)} />
                        <Button className="Button" variant="outlined" onClick={
                            e => {
                                setGoals([...goals, goal])
                                setGoal("")
                            }}>Add Goal</Button>
                        { (goals.length !== 0)
                            && <Stack spacing={1}>
                                {goals.map(it =>
                                    <div key={it}>
                                        <span>{it}</span>
                                        <Button className="Button-Stack" variant="outlined" onClick={
                                            e => {
                                                setGoals(goals.filter(goal => goal !== it))
                                            }}>Delete</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>

                    <div>
                        Technologies:
                        <TextField className="TextField" label="technology" variant="outlined"
                                   onChange={e => { setTechnology(e.target.value) }} />
                        <Button className="Button" variant="outlined" onClick={
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
                                        <Button className="Button-Stack" variant="outlined" onClick={
                                            e => {
                                                setTechnologies(technologies.filter(technology => technology !== it))
                                            }
                                        }>Delete</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>

                    <div>
                        Features:
                        <Autocomplete
                            disablePortal
                            options={featuresData ? featuresData : []}
                            sx={{ width: 200 }}
                            filterOptions={(x) => x}
                            renderInput={(params) => <TextField {...params} label="Features" />}
                            onInputChange={(e, value) => { getFeatures(value) }}
                            onChange={ (e, value) => {
                                if (value !== null) {
                                    setFeature(value)
                                }
                            }}
                        />
                        <Button className="Button" variant="outlined" onClick={
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
                                        <Button className="Button-Stack" variant="outlined" onClick={
                                            e => {
                                                setFeatures(features.filter(feature => feature !== it))
                                            }
                                        }>Delete</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>
                </div>

                <div>
                    <Button className="Button" variant="outlined" type="submit">Update Project</Button>
                    <Button className="Button" variant="outlined" onClick={e => {
                        props.setUpdateProject(false)
                    }}>Return</Button>
                </div>
                { isLoading && <CircularProgress /> }
            </form>
        </div>
    )
}