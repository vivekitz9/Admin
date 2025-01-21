import Blogs from "./pages/Blogs/Blogs";
import Event from "./pages/Event/Event";
import Index from "./pages/Index/Index";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Gallery from "./pages/Gallery/Gallery";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Member from "./pages/Member/Member";
import News from "./pages/News/News";
import MissionAndVision from "./pages/Mission-Vision/MissionAndVision";
import ConnectWithMe from "./pages/ConnectWithMe/ConnectWithMe";

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
        <Route path="mission-vision" element={<MissionAndVision />} />
        <Route path="events" element={<Event />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="member" element={<Member />} />
        <Route path="news" element={<News />} />
        <Route path="write-to-me" element={<ConnectWithMe />} />

        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
