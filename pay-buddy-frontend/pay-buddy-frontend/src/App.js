import {Toaster} from 'react-hot-toast';
import Home from './components/home/Home';
import NavBar from './layout/header/Header';
import Footer from './layout/footer/Footer';
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import "./assets/css/color.css";
import "./assets/css/style.css";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/authenticationManager/PasswordReset";
import PasswordResetForm from "./components/auth/authenticationManager/PasswordResetForm";

function App() {
  return (
      <>
        <NavBar/>
        <Toaster />
        <Router>
          <Routes>
            <Route path="" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
             <Route path="/reset" element={<PasswordReset />} />
             <Route path="/reset-password/:token" element={<PasswordResetForm />} />
          </Routes>
        </Router>
        <Footer />
      </>
  );
}
export default App;
