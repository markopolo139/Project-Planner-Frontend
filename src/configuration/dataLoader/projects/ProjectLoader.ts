import {store} from "../../Strore";
import {projectApi} from "../../../api/ProjectApi";
import {LoaderFunctionArgs, redirect, RouteObject} from "react-router-dom";

export async function projectLoader({ params }: LoaderFunctionArgs<any>) {
    if (typeof params.projectTitle === "undefined") {
        return redirect("/home/projects")
    }

    const promise = store.dispatch(projectApi.endpoints?.getProjectByTitle.initiate(params.projectTitle))

    try {
        return await promise.unwrap()
    } catch (e) {
        console.log("Error in project loader")
        return redirect("/home/projects")
    } finally {
        promise.reset()
    }
}