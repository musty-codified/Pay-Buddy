import { Routes, Route, Link } from "react-router-dom";
import "./assets/css/color.css";
import "./assets/css/style.css";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/authenticationManager/PasswordReset";
import Header from "./components/BackendPages/layout/Header";
import Dashboard from "./components/BackendPages/Dashboard";
import Register from "./components/auth/Register/Register";
import Home from "./components/Pages/Home";
import Layout from "./components/BackendPages/layout/Layout";
import SendMoneyPartOne from "./components/BackendPages/SendMoneyPartOne";
import SendMoneyPartTwo from "./components/BackendPages/SendMoneyPartTwo";
import { MyContextProvider } from "./statemanagement/ComponentState";
import PasswordResetForm from "./components/auth/authenticationManager/PasswordResetForm";
import Payment from "./components/BackendPages/Payment";
import Welcome from "./components/Pages/Welcome";
import TransactionPin from "./components/BackendPages/TransactionPin";
import SettingsMenu from "./components/Settings/Settings";



function App() {
  return (
    <div className="App">
      <MyContextProvider>
      <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reset-password/:token" element={<PasswordResetForm />} />
              <Route path="/reset" element={<PasswordReset />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/welcome" element={<Welcome />} />

              <Route path = "pay-buddy"  element={<Layout />} >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="payment" element={ <Payment />} />

                  <Route path="create-transaction-pin" element={<TransactionPin />} />
                  <Route path="settings-menu" element={<SettingsMenu />} />

                  <Route path="send-money-1" element={<SendMoneyPartOne />}/>
                  <Route path="send-money-2" element={<SendMoneyPartTwo />}/>
              </Route>
          </Routes>
      </MyContextProvider>
          

    </div>
  );
}
export default App;
