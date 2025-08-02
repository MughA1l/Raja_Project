import './App.css'
import LoginPage from './pages/LoginPage'
import Signup from './pages/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App