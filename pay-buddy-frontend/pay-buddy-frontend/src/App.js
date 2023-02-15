import Home from './components/home/Home';
import NavBar from './layout/header/Header';
import Footer from './layout/footer/Footer';
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import "./assets/css/color.css";
import "./assets/css/style.css";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/authenticationManager/PasswordReset";

function App() {
  return (
      <>
        <NavBar/>
        <Router>
          <Routes>
            <Route path="" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
             <Route path="/reset" element={<PasswordReset />} />
          </Routes>
        </Router>
        <Footer />
      </>
  );
}
export default App;
