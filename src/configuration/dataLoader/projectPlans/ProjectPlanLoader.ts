import {store} from "../../Strore";
import {projectApi} from "../../../api/ProjectApi";
import {LoaderFunctionArgs, redirect, RouteObject} from "react-router-dom";
import {projectPlanApi} from "../../../api/ProjectPlanApi";

export async function projectPlanLoader({ params }: LoaderFunctionArgs<any>) {
    if (typeof params.projectPlanTitle === "undefined") {
        return redirect("/home/project/plans")
    }

    const promise = store.dispatch(projectPlanApi.endpoints?.getProjectPlanByTitle.initiate(params.projectPlanTitle))

    try {
        return await promise.unwrap()!!
    } catch (e) {
        console.log("Error in project loader")
        return redirect("/home/project/plans")
    } finally {
        promise.reset()
    }
}