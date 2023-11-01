import {projectApi} from "../../../api/ProjectApi";
import {store} from "../../Strore";
import {setNewProjects} from "../../../slices/ProjectsSlice";
import {projectPlanApi} from "../../../api/ProjectPlanApi";
import {setNewProjectsPlans} from "../../../slices/ProjectPlansSlice";

export async function projectsPlansLoader() {
    const promise = store.dispatch(projectPlanApi.endpoints?.getProjectsPlans.initiate())
    try {
        const result = await promise.unwrap()
        store.dispatch(setNewProjectsPlans(result))
        return result
    } catch (e) {
        console.log("Error in projects plans loader")
        return []
    } finally {
        promise.reset()
    }
}