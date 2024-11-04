import Navbar from "@layout/Navbar";
import NewCard from "@pages/NewCard";
import SingleDecklist from "@pages/SingleDecklist";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import('@pages/Register'));
const EditProfile = lazy(() => import("@pages/EditProfile"));
const Profile = lazy(() => import('@pages/Profile'));
const CreateDecklist = lazy(() => import('@pages/CreateDecklist'));
const Decklists = lazy(() => import('@pages/Decklists'));

function Router() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-decklist" element={<CreateDecklist/>} />
        <Route path="/add-card" element={<NewCard/>} />
        <Route path="/decklist/:id" element={<SingleDecklist/>} />
        <Route path="/decklists/:query" element={<Decklists/>} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/profile/:id" element={<Profile/>} />
      </Routes>
    </>
  )
}

export default Router
