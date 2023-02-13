import { Routes, Route, Link } from "react-router-dom";
import "./assets/css/color.css";
import "./assets/css/style.css";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/authenticationManager/PasswordReset";

function App() {
  return (
    <div className="App">
      <Login />
      <Routes>
        <Route path="/reset" element={<PasswordReset />} />
      </Routes>
    </div>
  );
}

export default App;
