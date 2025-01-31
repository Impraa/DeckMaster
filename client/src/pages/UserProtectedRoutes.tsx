import useUserContext from "@hooks/useUserContext"
import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoutes = () =>
{
    const userContext = useUserContext();
    if (!userContext.user) return <Navigate to={'/login'} />
    else return <Outlet/>
}

export default UserProtectedRoutes