import Navbar from "@layout/Navbar";
import { refreshUserAsync } from "@services/User";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
 
function Router() {

  useEffect(() => {
    //refresh user
    const fetchUserData = async () => {
      const response = await refreshUserAsync();
      console.log(response);
    };

    fetchUserData();
  }, [])

  return (
    <Suspense>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/> 
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Suspense>
  )
}

export default Router
