import ProjectPlan from "../../../objects/ProjectPlan";
import ErrorPopup from "../../error/ErrorPopup";
import styles from "../../../css/main/PutProject.module.sass";
import Project from "../../../objects/Project";
import {Autocomplete, Button, Checkbox, CircularProgress, MenuItem, Select, Stack, TextField} from "@mui/material";
import {buttonCss} from "../../../utils/MuiButtonCss";
import {useCreateProjectMutation} from "../../../api/ProjectApi";
import {useLazyGetSkillsQuery} from "../../../api/SkillsApi";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useCreateProjectPlanMutation} from "../../../api/ProjectPlanApi";
import {addProject, selectProjects} from "../../../slices/ProjectsSlice";
import {addProjectPlan} from "../../../slices/ProjectPlansSlice";
import CloseIcon from "@mui/icons-material/Close";
import Popup from "reactjs-popup";

interface CreatePlanProps extends Partial<ProjectPlan> {
    setCreateProjectPlan: any
}

export default function CreatePlanPage(props: CreatePlanProps) {
    const [
        createProjectPlanApi,
        { data, error, isError, isLoading, isSuccess }
    ] = useCreateProjectPlanMutation()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();

    const [points, setPoints] = useState<string[]>([])
    const [features, setFeatures] = useState<string[]>(props.features ? props.features : [])
    const [goals, setGoals] = useState<string[]>(props.goals ? props.goals : [])
    const [point, setPoint] = useState<string>("")
    const [feature, setFeature] = useState<string>("")
    const [goal, setGoal] = useState<string>("")

    if (isSuccess) {
        return (
            <div className={styles.main}>
                <div className={styles.updated}>
                    <h2>Project Plan created</h2>
                    <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={e => {
                        props.setCreateProjectPlan(false)
                        if (data) {
                            dispatch(addProjectPlan(data))
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
                let projectPlan = data as ProjectPlan
                projectPlan.goals = goals
                projectPlan.features = features
                projectPlan.points = points
                createProjectPlanApi(projectPlan)
            }) }>
                <input hidden value={props.projectPlanId} type="number" {...register("projectPlanId")}></input>
                <h2>Create project Plan:</h2>

                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <label>Project Plan Title:</label>
                        <TextField
                            defaultValue={props.title} className="TextField" placeholder="Project Plan Title" variant="outlined"
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
                    <div className={styles.list_input}>
                        Goals:
                        <TextField className="TextField" label="goal" variant="outlined"
                                   onChange={e => setGoal(e.target.value)}/>
                        <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={
                            e => {
                                setGoals([...goals, goal])
                                setGoal("")
                            }}>Add Goal</Button>
                        {(goals.length !== 0)
                            && <Stack className={styles.stack} spacing={1}>
                                {goals.map(it =>
                                    <div className={styles.stack_item} key={it}>
                                        <span>{it}</span>
                                        <Button className={styles.button_stack} sx={buttonCss} variant="outlined" onClick={
                                            e => {
                                                setGoals(goals.filter(goal => goal !== it))
                                            }
                                        }>Delete</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>

                    <div className={styles.list_input}>
                        Features:
                        <TextField className="TextField" label="feature" variant="outlined" onChange={e => {
                            setFeature(e.target.value)
                        }}/>
                        <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={
                            e => {
                                setFeatures([...features, feature])
                                setFeature("")
                            }
                        }>Add Feature</Button>
                        {(features.length !== 0)
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
                        Points:
                        <TextField className="TextField" label="point" variant="outlined"
                                   onChange={e => setPoint(e.target.value)}/>
                        <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={
                            e => {
                                setPoints([...points, point])
                                setPoint("")
                            }}>Add Point</Button>
                        {(points.length !== 0)
                            && <Stack className={styles.stack} spacing={1}>
                                {points.map(it =>
                                    <div className={styles.stack_item} key={it}>
                                        <span>{it}</span>
                                        <Button className={styles.button_stack} sx={buttonCss} variant="outlined" onClick={
                                            e => {
                                                setPoints(points.filter(point => point !== it))
                                            }
                                        }>Delete</Button>
                                    </div>
                                )}
                            </Stack>
                        }
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button className={styles.button} sx={buttonCss} variant="outlined" type="submit">Create Project Plan</Button>
                    <Button className={styles.button} sx={buttonCss} variant="outlined" onClick={e => {
                        props.setCreateProjectPlan(false)
                    }}>Return</Button>
                </div>
                {isLoading && <CircularProgress/>}
            </form>
        </div>
    )
}