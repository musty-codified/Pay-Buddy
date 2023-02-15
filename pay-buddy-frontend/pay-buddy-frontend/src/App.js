import { Routes, Route, Link } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import "./assets/css/color.css";
import "./assets/css/style.css";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/authenticationManager/PasswordReset";
import PasswordResetForm from "./components/auth/authenticationManager/PasswordResetForm";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Login />
      <Routes>
        <Route path="/reset" element={<PasswordReset />} />
        <Route path="/reset-password" element={<PasswordResetForm />} />
      </Routes>
    </div>
  );
}

export default App;
