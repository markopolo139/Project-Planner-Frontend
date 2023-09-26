import {useDispatch, useSelector} from "react-redux";
import {selectLoggedInUserData, setLoggedInEmail} from "../slices/LoggedInUserSlice";
import styles from "../css/LandingPage.module.sass";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import {useGetEmailQuery} from "../api/UserApi";
import {useEffect} from "react";

export default function LandingPage() {
    const { data, isSuccess } = useGetEmailQuery();
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess)
            dispatch(setLoggedInEmail(data))
    }, [data, dispatch, isSuccess])

    //TODO: add most recently project to show here or current project or with close deadline,
    return (
        <div>
            <header className={styles.header}>Project Overview</header>
            <Navbar />
            <Outlet />
        </div>
    )
}