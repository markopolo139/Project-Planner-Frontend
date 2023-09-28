import {useDispatch, useSelector} from "react-redux";
import {selectLoggedInUserData, setLoggedInEmail} from "../../slices/LoggedInUserSlice";
import styles from "../../css/LandingPage.module.sass";
import {Navigate, Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import {useGetEmailQuery} from "../../api/UserApi";
import {useEffect} from "react";

export default function LandingPage() {
    const { data, isSuccess } = useGetEmailQuery();
    const dispatch = useDispatch()
    const loggedInUser = useSelector(selectLoggedInUserData)

    useEffect(() => {
        if (isSuccess)
            dispatch(setLoggedInEmail(data))
    }, [data, dispatch, isSuccess])

    if (loggedInUser.jwtToken === "")
        return <Navigate to={"/"} />

    return (
        <div className={styles.div}>
            <Navbar />
            <Outlet />
        </div>
    )
}