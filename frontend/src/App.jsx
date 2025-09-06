import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './pages/auth/Signup.jsx';
import LoginPage from './pages/auth/LoginPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import CodeVerify from './pages/auth/Code-verify';
import ResetPassword from './pages/auth/Reset-password';
import DashboardLayout from './pages/dashboard/DashboardLayout.jsx';
import HomeDashboard from './pages/dashboard/Home-Dashboard.jsx';
import NotFound from './pages/Not-Found.jsx';
import Books from './pages/dashboard/Books.jsx';
import Chapters from './pages/dashboard/Chapters.jsx';
import Images from './pages/dashboard/Images.jsx';
import Settings from './pages/dashboard/Settings.jsx';
import PreviewChapter from './pages/dashboard/PreviewChapter.jsx';

function App() {


  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/verify-code' element={<CodeVerify />} />
          <Route path='/reset-password' element={<ResetPassword />} />

          <Route path="/" element={<DashboardLayout />}>
            {/* These are the nested routes. They will be rendered inside the <Outlet /> */}
            <Route index element={<HomeDashboard />} />
            <Route path='/Books' element={<Books />} />
            <Route path='/Chapters' element={<Chapters />} />
            <Route path='/Books' element={<Books />} />
            <Route path='/Images' element={<Images />} />
            <Route path='/Settings' element={<Settings />} />

            {/* route from book to chapter */}
            <Route path='/Books/:bookId/Chapters' element={<Chapters />} />
            {/* for book -> chapter -> preview single chapter */}
            <Route path='/Chapters/:chapterId' element={<PreviewChapter />} />

          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App