import './App.css'
import CodeVerify from './pages/Code-verify';
import ForgotPassword from './pages/ForgotPassword';
import LoginPage from './pages/LoginPage';
import ResetPassword from './pages/Reset-password';
import Signup from './pages/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

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
        </Routes>
      </Router>
    </div>
  )
}

export default App