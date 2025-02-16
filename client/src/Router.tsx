import Navbar from "@layout/Navbar";
import UserProtectedRoutes from "@pages/UserProtectedRoutes";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import('@pages/Register'));
const EditProfile = lazy(() => import("@pages/EditProfile"));
const Profile = lazy(() => import('@pages/Profile'));
const ManageDecklist = lazy(() => import('@pages/ManageDecklist'));
const Decklists = lazy(() => import('@pages/Decklists'));
const SingleDecklist = lazy(() => import('@pages/SingleDecklist'));
const Card = lazy(() => import('@pages/Card'));
const ManageCards = lazy(() => import('@pages/ManageCards'));

function Router() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/> 
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/decklists/:query?" element={<Decklists />} />
        <Route path="/decklist/:id" element={<SingleDecklist />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route element={<UserProtectedRoutes/>}>
          <Route path="/manage-decklist/:id?" element={<ManageDecklist/>} />
          <Route path="/card/:id?" element={<Card/>} />
          <Route path="/manage-cards" element={<ManageCards/>} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  )
}

export default Router
