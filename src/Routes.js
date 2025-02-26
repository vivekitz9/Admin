import Blogs from "./pages/Blogs/Blogs";
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
import { useSelector } from "react-redux";
import AllUsers from "./pages/AllUsers/AllUsers";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";
import HelpSupport from "./pages/HelpSupport/HelpSupport";
import AddEvent from "./components/Events/AddEvent";
import Event from "./pages/Event/Event";
import Banner from "./pages/Banner/Banner";
import AddBanner from "./components/Banner/AddBanner";
import MemberCard from "./components/MemberCard";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.auth);
  // const isLogin = localStorage.getItem("isLogin");
  if (user?.user?.success) {
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
        <Route path="all-users" element={<AllUsers />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-conditions" element={<TermsConditions />} />
        <Route path="help-support" element={<HelpSupport />} />

        <Route path="events/add-event" element={<AddEvent />} />
        <Route path="banner" element={<Banner />} />
        <Route path="banner/add-banner" element={<AddBanner />} />
        <Route path="member-card" element={<MemberCard />} />

        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
