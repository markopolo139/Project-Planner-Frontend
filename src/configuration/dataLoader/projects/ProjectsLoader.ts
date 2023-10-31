import {projectApi} from "../../../api/ProjectApi";
import {store} from "../../Strore";
import {setNewProjects} from "../../../slices/ProjectsSlice";

export async function projectsLoader() {
    const promise = store.dispatch(projectApi.endpoints?.getProjects.initiate())
    try {
        const result = await promise.unwrap()
        store.dispatch(setNewProjects(result))
        return result
    } catch (e) {
        console.log("Error in project loader")
        return []
    } finally {
        promise.unsubscribe()
    }
}