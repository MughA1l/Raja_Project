import React, { useEffect } from "react";
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
import ProtectedRoute from "@auth/ProtectedRoute.jsx";
import DashboardLayout from "@dashboard/DashboardLayout.jsx";
import HomeDashboard from "@dashboard/Home-Dashboard.jsx";
import NotFound from "@pages/Not-Found.jsx";
import Books from "@dashboard/Books.jsx";
import Chapters from "@dashboard/Chapters.jsx";
import Images from "@dashboard/Images.jsx";
import Settings from "@dashboard/Settings.jsx";
import PreviewChapter from "@dashboard/PreviewChapter.jsx";
import SharedChapter from "@pages/SharedChapter.jsx";
import useSocketStore from "@context/useSocketStore.js";
import { showSuccess } from "@utils/toast.js";
import { toast } from "react-toastify";

function App() {
  const initSocket = useSocketStore((state) => state.initSocket);
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  useEffect(() => {
    if (!socket) return;

    const handleNotify = (data) => {
      console.log('[Frontend] Received socket notification:', data);

      // Handle both string messages (legacy) and structured objects
      if (typeof data === 'string') {
        console.log('[Frontend] String notification:', data);
        showSuccess(data);
      } else if (data && typeof data === 'object') {
        // Structured notification format
        const message = data.message || 'Processing update';
        console.log('[Frontend] Object notification, type:', data.type, 'message:', message);

        // Show different toast types based on notification type
        if (data.type === 'error') {
          toast.error(message);
        } else if (data.type === 'success') {
          showSuccess(message);
        } else {
          // For 'queued' and 'processing' types, show info toast
          toast.info(message, {
            autoClose: 3000,
          });
        }
      }
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

          {/* Public shared chapter route - no auth required */}
          <Route path="/shared/:shareToken" element={<SharedChapter />} />

          <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
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
