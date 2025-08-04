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
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/verify-code' element={<CodeVerify />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App