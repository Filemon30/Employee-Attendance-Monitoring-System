import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Badge, Avatar, Space, Popover, List, Modal, Spin } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  BarChartOutlined,
  LogoutOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  HistoryOutlined,
  IdcardOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [notifVisible, setNotifVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New employee registered", icon: <TeamOutlined />, key: "new-employee", read: false },
  ]);

  const handleNotificationClick = (notification) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item
      )
    );
    setNotifVisible(false);
  };

  // Update active menu from URL
  useEffect(() => {
    const path = location.pathname.split("/").pop(); // last segment
    setSelectedMenu(path || "dashboard");
  }, [location.pathname]);

  useEffect(() => {
    // remove the fixed global overflow block that hides content in some environments
    return undefined;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Menu click navigation
  const closeMobileTooltip = (delay = 500) => {
    if (!isMobile) return;
    setTimeout(() => {
      const tooltips = document.querySelectorAll('.ant-tooltip');
      tooltips.forEach((tooltip) => {
        tooltip.style.display = 'none';
      });
    }, delay);
  };

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
    closeMobileTooltip(500); // hide tooltips after 0.5s
    navigate(`/admin/${e.key}`);
  };

  const handleLogout = () => {
    setConfirmLogoutOpen(true);
  };

  const startLogout = () => {
    setConfirmLogoutOpen(false);
    setIsLoggingOut(true);

    setTimeout(() => {
      setIsLoggingOut(false);
      navigate("/");
    }, 5000);
  };
  const menuItems = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "cards", icon: <IdcardOutlined />, label: "Cards" },
    { key: "employees", icon: <TeamOutlined />, label: "Employees" },
    { key: "attendance", icon: <CalendarOutlined />, label: "Attendance" },
    { key: "history", icon: <HistoryOutlined />, label: "History"},
    { key: "reports", icon: <BarChartOutlined />, label: "Reports" },
  ]; 

  const selectedMenuItem = menuItems.find((item) => item.key === selectedMenu) || menuItems[0];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={collapsed}
        width={230}
        collapsedWidth={isMobile ? 80 : 80}
        breakpoint="md"
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          setCollapsed(broken);
        }}
        style={{
          background: "#001529",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          maxHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          paddingBottom: 16,
        }}
      >
        <div>
          <div
            style={{
              color: "#fff",
              padding: "18px",
              fontSize: 14,
              textAlign: "center",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "50px",
            }}
          >
            {isMobile ? "EAMS" : "Employee Attendance Monitoring System"}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedMenu]}
            items={menuItems}
            onClick={handleMenuClick}
            maxHeight="calc(100vh - 150px)"
            style={{ overflowY: "auto", borderRight: 0 }}
          />
        </div>

        <div style={{ padding: 16 }}>
          <Button
            type="text"
            icon={<LogoutOutlined style={{ color: "#fff" }} />}
            onClick={handleLogout}
            style={{ background: "#b70404", color: "#fff", width: "100%" }}
          >
            {!isMobile ? "Logout" : null}
          </Button>
        </div>
      </Sider>

      <Layout style={{ minHeight: "100vh", marginLeft: collapsed ? 80 : 230 }}>
        <Header
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: 0, textTransform: "capitalize", fontSize: 20, display: "flex", alignItems: "center", gap: "8px" }}>
            {selectedMenuItem.icon}
            {selectedMenuItem.label}
          </h3>
          <Space size="large">
            <Popover
              content={
                <List
                  dataSource={notifications}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      onClick={() => handleNotificationClick(item)}
                      style={{ cursor: "pointer", backgroundColor: item.read ? "#f5f5f5" : "transparent" }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={item.icon} style={{ backgroundColor: "transparent", color: "#000" }} />}
                        title={
                          <span style={{ color: item.read ? "#999" : "#000", fontWeight: "normal" }}>
                            {item.text}
                          </span>
                        }
                        description={<small style={{ fontWeight: "normal" }}>{item.read ? "Read" : "Mark as read"}</small>}
                      />
                    </List.Item>
                  )}
                  style={{ width: 300 }}
                />
              }
              title={`Notifications (${notifications.filter((item) => !item.read).length})`}
              trigger="click"
              visible={notifVisible}
              onVisibleChange={(visible) => setNotifVisible(visible)}
              placement="bottomRight"
            >
              <Badge count={notifications.filter((item) => !item.read).length} offset={[0, 8]}>
                <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
              </Badge>
            </Popover>
            {!isMobile && <span>User's Name</span>}
            <Popover
              content={
                <List
                  dataSource={[
                    { id: "profile", text: "Profile", icon: <UserOutlined /> },
                    { id: "settings", text: "Settings", icon: <SettingOutlined /> },
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      onClick={() => {
                        setProfileVisible(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={item.icon} style={{ backgroundColor: "transparent", color: "#000" }} />}
                        title={<span style={{ fontWeight: "normal" }}>{item.text}</span>}
                      />
                    </List.Item>
                  )}
                  style={{ width: 200 }}
                />
              }
              trigger="click"
              visible={profileVisible}
              onVisibleChange={(visible) => setProfileVisible(visible)}
              placement="bottomRight"
            >
              <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: "#1890ff", cursor: "pointer" }} />
            </Popover>
          </Space>
        </Header>

        <Content
          className="content-scrollable"
          style={{
            marginTop: "2px",
            padding: "15px",
            background: "#fff",
            height: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Content>

        <Modal
          title="Confirm Logout"
          centered
          open={confirmLogoutOpen}
          onOk={startLogout}
          onCancel={() => setConfirmLogoutOpen(false)}
          okText="Yes, Logout"
          cancelText="Cancel"
        >
          <p>Do you really want to logout?</p>

        </Modal>

        <Modal
          title=""
          centered
          open={isLoggingOut}
          footer={null}
          closable={false}
          bodyStyle={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px" }}
          width={320}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          <h3 style={{ margin: 0 }}>Logging out</h3>
          <p style={{ marginTop: "8px", color: "rgba(0,0,0,0.65)" }}>Please wait</p>
        </Modal>
      </Layout>
    </Layout>
  );
}