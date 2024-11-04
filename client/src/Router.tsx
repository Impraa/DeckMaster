import Navbar from "@layout/Navbar";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import('@pages/Register'));
const EditProfile = lazy(() => import("@pages/EditProfile"));
const Profile = lazy(() => import('@pages/Profile'));
const Decklist = lazy(() => import('@pages/Decklist'));

function Router() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/decklist/:id" element={<Decklist/>} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/profile/:id" element={<Profile/>} />
      </Routes>
    </>
  )
}

export default Router
