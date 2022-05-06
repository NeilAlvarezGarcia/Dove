import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./contexts/AuthContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./components/authentication/Login";
import PrivateRoute from "./components/authentication/PrivateRoute";
import ForgotPassword from './components/authentication/ForgotPassword';
import Signup from "./components/authentication/Signup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Dashboard route */}
          <Route path='/*' element={<PrivateRoute/>}/>

          {/* Authentication routes */}
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
