import React, { useState } from "react";
import { Layout, Form, Input, Button, message, Modal, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined, 
  SafetyCertificateOutlined,
  CheckCircleOutlined, 
  LoadingOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';

const { Header, Content } = Layout;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({ open: false, success: false });

  const onFinish = (values) => {
    setModalState({ open: true, success: false });

    setTimeout(() => {
      setModalState({ open: true, success: true });

      setTimeout(() => {
        setModalState({ open: false, success: false });
        message.success(`Logged in as: ${values.username}`);
        navigate("/admin/dashboard"); // Navigate to dashboard route explicitly
      }, 1500);
    }, 3000);
  };

  const onFinishFailed = (errorInfo) => {
    const { values } = errorInfo;
    if (!values.username && !values.password) message.error("Please enter username and password!");
    else if (!values.username) message.error("Please enter username");
    else if (!values.password) message.error("Please enter password");
  };

  const boxStyle = {
    display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
    borderRadius: "12px", backgroundColor: "#fff", padding: "40px 30px", boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
    width: "100%", maxWidth: "450px",
  };

  const iconContainerStyle = {
    width: "60px", height: "60px", borderRadius: "20%", backgroundColor: "#ffedd5",
    display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px",
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#001529", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <i className="pi pi-users" style={{ color: "#fff", fontSize: "25px" }}></i>
          <div style={{ color: "#fff", fontSize: "18px", fontFamily: "Poppins"}}>EMPLOYEE ATTENDANCE MONITORING SYSTEM</div>
        </div>
        <div style={{ color: "#fff", fontSize: "16px", fontWeight: "bold", marginRight: "50px"}}>Admin Login</div>
      </Header>

      <Content style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column", padding: "60px 20px", width: "100%", background: "#f9fafb" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={boxStyle}>
            <div style={iconContainerStyle}>
              <SafetyCertificateOutlined style={{ fontSize: "25px", color: "#ea580c" }} />
            </div>
            <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Admin Login</h2>

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
      </Content>

      <Modal open={modalState.open} footer={null} closable={false} centered
        bodyStyle={{ padding: "20px", borderRadius: "12px", overflow: "hidden" }} style={{ maxWidth: "180px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100px", textAlign: "center" }}>
          {!modalState.success ? (
            <>
              <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
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
      `}</style>
    </Layout>
  );
}