import Navbar from "@layout/Navbar";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
 
function Router() {
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
