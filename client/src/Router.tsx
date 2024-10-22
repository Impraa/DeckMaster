import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@pages/Home"));

function Router() {
  return (
    <Suspense>
      <Routes>
        <Route index element={<Home/>}/> 
      </Routes>
    </Suspense>
  )
}

export default Router
