import {store} from "../../Strore";
import {projectApi} from "../../../api/ProjectApi";
import {LoaderFunctionArgs, redirect, RouteObject} from "react-router-dom";

export async function projectLoader({ params }: LoaderFunctionArgs<any>) {
    if (typeof params.projectTitle === "undefined") {
        redirect("/home/projects")
        return null
    }

    const promise = store.dispatch(projectApi.endpoints?.getProjectByTitle.initiate(params.projectTitle))

    try {
        return await promise.unwrap()
    } catch (e) {
        console.log("Error in project loader")
        redirect("/home/projects")
        return null
    } finally {
        promise.unsubscribe()
    }
}