import Blogs from "./components/Blogs/Blogs";

import Index from "./components/Index/Index";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AddEvent from "./components/Events/AddEvent";
import Event from "./pages/Event/Event";
import Banner from "./pages/Banner/Banner";
import AddBanner from "./components/Banner/AddBanner";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<AuthPage />}></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index element={<Index />} />
        <Route path="mission-vision" />
        <Route path="events" element={<Event />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="events/add-event" element={<AddEvent />} />
        <Route path="banner" element={<Banner />} />
        <Route path="banner/add-banner" element={<AddBanner />} />

        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
