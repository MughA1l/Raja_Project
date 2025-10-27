import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from "@auth/Signup";
import LoginPage from "@auth/LoginPage";
import ForgotPassword from "@auth/ForgotPassword";
import CodeVerify from "@auth/Code-verify";
import ResetPassword from "@auth/Reset-password";
import Logout from "@auth/Logout.jsx";
import DashboardLayout from "@dashboard/DashboardLayout.jsx";
import HomeDashboard from "@dashboard/Home-Dashboard.jsx";
import NotFound from "@pages/Not-Found.jsx";
import Books from "@dashboard/Books.jsx";
import Chapters from "@dashboard/Chapters.jsx";
import Images from "@dashboard/Images.jsx";
import Settings from "@dashboard/Settings.jsx";
import PreviewChapter from "@dashboard/PreviewChapter.jsx";
import useSocketStore from "@context/useSocketStore.js";
import { showSuccess } from "@utils/toast.js";

function App() {
  const initSocket = useSocketStore((state) => state.initSocket);
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  useEffect(() => {
    if (!socket) return;

    const handleNotify = (data) => {
      showSuccess(data);
    };

    socket.on("notify", handleNotify);

    // cleanup to avoid duplicate listeners
    return () => {
      socket.off("notify", handleNotify);
    };
  }, [socket]);

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route path="/verify-code" element={<CodeVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/" element={<DashboardLayout />}>
            {/* These are the nested routes. They will be rendered inside the <Outlet /> */}
            <Route index element={<HomeDashboard />} />
            <Route path="/Books" element={<Books />} />
            <Route path="/Chapters" element={<Chapters />} />
            <Route path="/Books" element={<Books />} />
            <Route path="/Images" element={<Images />} />
            <Route path="/Settings" element={<Settings />} />

            {/* route from book to chapter */}
            <Route
              path="/Books/:bookId/Chapters"
              element={<Chapters />}
            />
            {/* for book -> chapter -> preview single chapter */}
            <Route
              path="/Chapters/:chapterId"
              element={<PreviewChapter />}
            />
          </Route>

          <Route
            path="/Logout"
            element={<Logout />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
