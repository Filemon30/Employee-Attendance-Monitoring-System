import React from "react";
import { Layout, Row, Col } from "antd";
import { UserOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin"; 
import 'primeicons/primeicons.css';
import EmployeeLogin from "./EmployeeLogin";
const { Header, Content } = Layout;

export default function Landing() {
  const navigate = useNavigate();

  const boxStyle = { 
    display: "flex", 
    flexDirection: "column",
    alignItems: "center", 
    textAlign: "center", 
    borderRadius: "12px", 
    backgroundColor: "#fff",
    padding: "40px 30px",
    transition: "transform 0.3s, box-shadow 0.3s", 
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
    margin: "15px", 
    width: "100%", 
    maxWidth: "450px",
  };

  const iconContainerStyle = (bgColor) => ({
    width: "50px",
    height: "50px",
    borderRadius: "20%",
    backgroundColor: bgColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
  });

  const buttonStyle = (bgColor) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: bgColor,
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
  });

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.2)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* HEADER */}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#001529",
          padding: "0 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <i className="pi pi-users" style={{ color: "#fff", fontSize: "25px" }}></i>
          <div style={{ color: "#fff", fontSize: "18px", fontFamily: "Poppins"}}>EMPLOYEE ATTENDANCE MONITORING SYSTEM</div>
        </div>
        <div style={{ color: "#fff", fontSize: "16px", fontWeight: "bold", marginRight: "50px"}}>Welcome</div>
      </Header>

      {/* CONTENT */}
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", // start below header
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          background: "#f9fafb",
          padding: "60px 20px", // top padding to push content below header
          width: "100%",
        }}
      >
        <Routes>
          {/* LANDING PAGE */}
          <Route
            path="/"
            element={
              <>
                <div style={{ textAlign: "center", marginBottom: "50px", maxWidth: "700px" }}>
                  <h2 style={{ margin: "0 0 0 0", fontSize: "30px" }}>
                    EMPLOYEE ATTENDANCE MONITORING SYSTEM                 
                  </h2>

                  <h1 style={{ margin: "0 0 10px 0", fontSize: "25px", color: "#17a34b" }}>
                    “Know who’s in, when it matters.”
                  </h1>
                  <p style={{ fontSize: "16px", color: "#555"}}>
                  Track and manage employee attendance with ease. Our system provides real-time monitoring, detailed reports, 
                  and seamless integration with your existing HR tools.                  </p>
                </div>

                <Row gutter={[48, 48]} justify="center">
                  {/* Admin Box */}
                  <Col xs={24} sm={16} md={12}>
                    <div
                      style={boxStyle}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div style={iconContainerStyle("#ffedd5")}>
                        <SafetyCertificateOutlined style={{ fontSize: "25px", color: "#ea580c" }} />
                      </div>
                      <h2 style={{ margin: "0", fontSize: "18px" }}>Admin Login</h2>
                      <p style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>
                        Access the admin dashboard
                      </p>
                      <button style={buttonStyle("#ea580c")} onClick={() => navigate("/admin-login")}>
                        <SafetyCertificateOutlined /> Admin Login
                      </button>
                    </div>
                  </Col>

                  {/* Employee Box */}
                  <Col xs={24} sm={16} md={12}>
                    <div
                      style={boxStyle}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div style={iconContainerStyle("#dcfce7")}>
                        <UserOutlined style={{ fontSize: "25px", color: "#17a34b" }} />
                      </div>
                      <h2 style={{ margin: "0", fontSize: "18px" }}>Employee Login</h2>
                      <p style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>
                        Access the employee portal
                      </p>
                      <button style={buttonStyle("#17a34b")} onClick={() => navigate("/employee-login")}>
                        <UserOutlined /> Employee Login
                      </button>
                    </div>
                  </Col>
                </Row>
              </>
            }
          />

          {/* ADMIN LOGIN */}
          <Route
            path="/admin-login"
            element={<AdminLogin onBack={() => navigate("/")} />}
          />

          {/* EMPLOYEE LOGIN */}
          <Route
            path="/employee-login"
            element={ <EmployeeLogin onBack = {() => navigate("/")} />}
          />

        </Routes>
      </Content>
    </Layout>
  );
}