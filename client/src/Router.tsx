import { UserContext } from "@context/UserContext";
import Navbar from "@layout/Navbar";
import { refreshUserAsync } from "@services/User";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { isValidUser } from "../../types/user";
import useCallContext from "@hooks/useCallContext";

const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const EditProfile = lazy(() => import("@pages/EditProfile"));
const Profile = lazy(() => import('@pages/Profile'));

function Router() {

  const userContext = useCallContext(UserContext);

  useEffect(() => {
    //refresh user
    if(userContext)
    {
        const { setUser } = userContext;
        const fetchUserData = async () => {
          const response = await refreshUserAsync();
          const { error, data } = response;
          if(!error && isValidUser(data.user)) setUser(data.user);
        };
    
        fetchUserData();
    } 
  }, [])

  return (
    <Suspense>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/> 
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/profile/:id" element={<Profile/>} />
      </Routes>
    </Suspense>
  )
}

export default Router
