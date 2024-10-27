import Navbar from "@layout/Navbar";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const EditProfile = lazy(() => import("@pages/EditProfile"));
const Profile = lazy(() => import('@pages/Profile'));

function Router() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/> 
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/profile/:id" element={<Profile/>} />
      </Routes>
    </>
  )
}

export default Router
