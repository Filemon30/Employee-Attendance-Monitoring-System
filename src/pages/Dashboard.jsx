import React from "react";
import { Row, Col, Card, Table, Tag } from "antd";
import { 
  TeamOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined 
} from "@ant-design/icons";

export default function Dashboard() {
  const cards = [
    { title: "Total Employees", value: 120, icon: <TeamOutlined />, bg: "#eff6ff", iconBg: "#dbeafe", iconColor:"#2563eb" },
    { title: "Present Today", value: 98, icon: <CheckCircleOutlined />, bg: "#f0fdfa", iconBg: "#ccfbf1", iconColor:"#059669" },
    { title: "Late Today", value: 12, icon: <ClockCircleOutlined />, bg: "#fffbe6", iconBg: "#fef9c3", iconColor:"#ca8a04" },
    { title: "Absent Today", value: 10, icon: <CloseCircleOutlined />, bg: "#fff2f0", iconBg: "#ffdbc8", iconColor:"#dc2626"},
  ];

  const attendanceData = [
    { ref: "A003", fullName: "Jayneth Hazel, Valle", status: "Late", timeIn: "10:15 AM"},
    { ref: "A001", fullName: "Je-ann, Callo", status: "Late", timeIn: "08:25 AM"},
    { ref: "A002", fullName: "Walter, Maturan", status: "Late", timeIn: "08:05 AM" },
    { ref: "A004", fullName: "Joel Kent, Lascuña", status: "Present", timeIn: "07:58 AM"},
    { ref: "A005", fullName: "Filemon Jr, Galanida", status: "Present", timeIn: "07:58 AM"},
    { ref: "A006", fullName: "Airish, Asur", status: "Present", timeIn: "07:58 AM"},
    { ref: "A007", fullName: "Sherallyn, Dumpasan", status: "Present", timeIn: "07:58 AM"},
  ];

  const transactionData = [
    {ref: "TRANS000001", transactionType: "New Employee", transactionBy: "Je-ann Callo", time: "5:40 PM"},
    {ref: "TRANS000002", transactionType: "New Employee", transactionBy: "Je-ann Callo", time: "5:40 PM"},
    {ref: "TRANS000003", transactionType: "New Employee", transactionBy: "Je-ann Callo", time: "5:40 PM"},
    {ref: "TRANS000004", transactionType: "New Employee", transactionBy: "Je-ann Callo", time: "5:40 PM"},
    {ref: "TRANS000005", transactionType: "New Employee", transactionBy: "Je-ann Callo", time: "5:40 PM"},
    {ref: "TRANS000006", transactionType: "New Employee", transactionBy: "Je-ann Callo", time: "5:40 PM"},
    {ref: "TRANS000007", transactionType: "New Employee", transactionBy: "Je-ann Callo", time: "5:40 PM"},
];

  const statusMap = {
    Present: { color: "green", icon: <CheckCircleOutlined /> },
    Late: { color: "gold", icon: <ClockCircleOutlined /> },
    Absent: { color: "red", icon: <CloseCircleOutlined /> },
  };

  const columns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName", align: "center" },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status", 
      align: "center",
      render: (status) => {
        const { color, icon } = statusMap[status] || { color: "default", icon: null };
        return <Tag color={color} icon={icon}>{status}</Tag>;
      }
    },
    { title: "Time In", dataIndex: "timeIn", key: "timeIn", align: "center" },
    
  ];

  const transactionColumns = [
    { title: "Ref No.", dataIndex: "ref", key: "ref", align: "center" },
    { title: "Transaction Type", dataIndex: "transactionType", key: "transactionType", align: "center" },
    { title: "Transaction By", dataIndex: "transactionBy", key: "transactionBy", align: "center" },
    { title: "Time", dataIndex: "time", key: "time", align: "center" },
    
  ];

  return (
    <div style={{ padding: 10 }}>
      <h2 style={{ marginBottom: 20 }}>Overview</h2>

      {/* Responsive Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 40 }}>
        {cards.map((card, index) => (
          <Col 
            key={index} 
            xs={24}
            sm={12} 
            md={12}  
            lg={6}   
          >
            <Card 
              style={{ 
                backgroundColor: card.bg, 
                borderRadius: 8, 
                height: "auto", 
                minHeight: 100 
              }} 
              bodyStyle={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap" }}
            >
              <div 
                style={{ 
                  width: 50, 
                  height: 50, 
                  borderRadius: "50%", 
                  backgroundColor: card.iconBg, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  flexShrink: 0 
                }}
              >
                {React.cloneElement(card.icon, { 
                  style: { fontSize: 24, color: card.iconColor } 
                })}
              </div>
              <div style={{ flex: 1, minWidth: 100 }}>
                <div style={{ fontSize: 14, opacity: 0.85 }}>{card.title}</div>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>{card.value}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Responsive Attendance Table */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ margin: 0, fontSize: 16, fontWeight: "bold" }}>Recent Attendance</span>
        <span style={{ color: "#888", fontSize: 12 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
      <Table 
        columns={columns} 
        dataSource={attendanceData.slice(0, 10)} 
        rowKey="ref" 
        pagination={false} 
        bordered
        scroll={{ y: 330, x: "max-content" }} 
      />

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>Recent Transactions</span>
            <span style={{ color: "#888", fontSize: 14 }}>
            </span>
        </div>

        <Table 
            columns={transactionColumns} 
            dataSource={transactionData.slice(0, 10)} 
            rowKey="ref" 
            pagination={false} 
            bordered
            scroll={{ y: 330, x: "max-content" }} 
        />
        </div>
  );
}