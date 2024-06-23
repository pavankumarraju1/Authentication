import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./components/Signup"
import Login from "./components/Login"
import UserProfiles from "./pages/UserProfiles"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import DashBoard from "./pages/DashBoard"
import "./App.css"

function App() {
  return (
    <div className="appdiv d-flex justify-content-center">
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
        <Route path="/profile" element={<UserProfiles />}></Route>
        <Route path="/dash" element={<DashBoard />}></Route>
    </Routes>
   </div>
  )
}

export default App
