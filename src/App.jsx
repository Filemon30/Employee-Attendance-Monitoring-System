import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import EmployeeLogin from "./pages/EmployeeLogin"
import Main from "./pages/Main";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Reports from "./pages/Reports";
import Attendance from "./pages/Attendance";
import History from "./pages/History";
import Card from "./pages/Cards";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin-login" element={< AdminLogin />} />
        <Route path="/employee-login" element={ <EmployeeLogin /> } />

        {/* Main layout with nested routes */}
        <Route path="/admin/*" element={<Main />}>
          {/* Redirect /admin to dashboard explicitly */}
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cards" element={<Card />} /> 
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="history" element={<History />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;