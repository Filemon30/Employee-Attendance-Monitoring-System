import React, { useState } from "react";
import { Layout, Form, Input, Button, message, Modal, Spin } from "antd";
import { UserOutlined, LockOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';

const { Header, Content } = Layout;

export default function EmployeeLogin() {
 

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#001529", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <i className="pi pi-users" style={{ color: "#fff", fontSize: "25px" }}></i>
          <div style={{ color: "#fff", fontSize: "18px", fontFamily: "Poppins" }}>EMPLOYEE ATTENDANCE MONITORING SYSTEM</div>
        </div>
        <div style={{ color: "#fff", fontSize: "16px", fontWeight: "bold", marginRight: "50px" }}>Employee Login</div>
      </Header>

      {/* <Content style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column", padding: "60px 20px", width: "100%", background: "#f9fafb" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={boxStyle}>
            <div style={iconContainerStyle}>
              <UserOutlined style={{ fontSize: "25px", color: "#17a34b" }} />
            </div>
            <h2 style={{ fontSize: "20px", marginBottom: "20px", marginRight: "50px"}}> Employee Login</h2>

            <Form layout="vertical" style={{ width: "100%" }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item name="username" rules={[{ required: true, message: "" }]}>
                <Input size="large" placeholder="Username" prefix={<UserOutlined />} style={{ height: "50px", fontSize: "16px", paddingLeft: "10px" }} />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: "" }]}>
                <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} style={{ height: "50px", fontSize: "16px", paddingLeft: "10px" }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">Login</Button>
              </Form.Item>
              <Button type="link" block onClick={() => navigate("/")}>Back</Button>
            </Form>
          </div>
        </div>
      </Content> */}

      {/* <Modal open={modalState.open} footer={null} closable={false} centered
        bodyStyle={{ padding: "20px", borderRadius: "12px", overflow: "hidden" }} style={{ maxWidth: "180px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100px", textAlign: "center" }}>
          {!modalState.success ? (
            <>
              <Spin size="large" style={{ display: "block", margin: "0 auto" }} />
              <p style={{ marginTop: "15px", fontSize: "16px" }}>Logging in</p>
              <p style={{ marginTop: "5px", fontSize: "12px" }}>Please wait...</p>
            </>
          ) : (
            <>
              <CheckCircleOutlined style={{ fontSize: "40px", color: "#52c41a", transform: "scale(0)", animation: "popCheck 0.5s forwards" }} />
              <p style={{ marginTop: "15px", fontSize: "12px" }}>Login Successful</p>
            </>
          )}
        </div>
      </Modal>

      <style>{`
        @keyframes popCheck {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style> */}
    </Layout>
  );
}