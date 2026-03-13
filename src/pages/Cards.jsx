import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Space,
  Table,
  Modal,
  Select,
  Form,
  DatePicker,
  Spin
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  LoadingOutlined
} from "@ant-design/icons";

const { Option } = Select;

export default function Cards() {

  const [searchText, setSearchText] = useState("");
  const [employeeModalVisible, setEmployeeModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [registerCardVisible, setRegisterCardVisible] = useState(false);

  const [selectedCard, setSelectedCard] = useState("");
  const [formValues, setFormValues] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  const handleSearch = () => console.log("Searching for:", searchText);

  const handleDeleteCard = (cardNo) =>
    console.log("Delete clicked for Card:", cardNo);

  const handleAddCardModal = (cardNo) => {
    setSelectedCard(cardNo);
    setEmployeeModalVisible(true);
    form.setFieldsValue({ card: cardNo });
  };

  const handleEmployeeModalClose = () => {
    setEmployeeModalVisible(false);
    setSelectedCard("");
    form.resetFields();
  };

  const handleEmployeeSubmit = (values) => {

    setFormValues(values);

    setEmployeeModalVisible(false);

    setTimeout(() => {
      setConfirmModalVisible(true);
    }, 200);

  };

  const handleConfirmClose = () => {
    setConfirmModalVisible(false);
    setFormValues({});
    setSelectedCard("");
    form.resetFields();
  };

  const handleFinalSubmit = () => {

    console.log("Final submission confirmed:", formValues);
    handleConfirmClose();

  };

  const handleReturnToEmployeeModal = () => {

    setConfirmModalVisible(false);
    setEmployeeModalVisible(true);
    form.setFieldsValue(formValues);

  };

  const handleFloatingButtonClick = () => {
    setRegisterCardVisible(true);
  };

  /* TABLE */

  const columns = [
    { title: "Card No", dataIndex: "cardNo", key: "cardNo", align: "center", width: 150 },
    { title: "Status", dataIndex: "status", key: "status", align: "center", width: 150 },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space size={12}>
          <PlusOutlined
            style={{
              background: "#1677ff",
              color: "white",
              cursor: "pointer",
              fontSize: 16,
              padding: 4,
              borderRadius: 4
            }}
            onClick={() => handleAddCardModal(record.cardNo)}
          />

          <DeleteOutlined
            style={{
              background: "#dc2626",
              color: "white",
              cursor: "pointer",
              fontSize: 16,
              padding: 4,
              borderRadius: 4
            }}
            onClick={() => handleDeleteCard(record.cardNo)}
          />
        </Space>
      )
    }
  ];

  const dataSource = [
    { cardNo: "C001", status: "Assigned" },
    { cardNo: "C002", status: "Unassigned" }
  ];

  const personalInfoColumns = isMobile ? "1fr" : "repeat(4,1fr)";
  const secondRowColumns = isMobile ? "1fr" : "repeat(3,1fr)";

  return (
    <div style={{ padding: 10, minHeight: "80vh" }}>

      <h2 style={{ marginBottom: 12 }}>RFID Card Management</h2>

      {/* SEARCH AREA */}

      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        wrap
        style={{ marginBottom: 12, width: "100%" }}
      >

        <Input
          placeholder="Search cards..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: isMobile ? "100%" : 300 }}
          suffix={<SearchOutlined onClick={handleSearch} />}
        />

        <Button
          type="primary"
          onClick={handleSearch}
          style={{ width: isMobile ? "100%" : "auto" }}
        >
          Search
        </Button>

      </Space>

      {/* TABLE */}

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="cardNo"
        bordered
        pagination={false}
        scroll={{ x: 500 }}
      />

      {/* FLOATING BUTTON */}

      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 1000,
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
        }}
        onClick={handleFloatingButtonClick}
      />

      {/* REGISTER CARD MODAL */}

      <Modal
        open={registerCardVisible}
        footer={null}
        centered
        closable
        onCancel={() => setRegisterCardVisible(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px"
          }}
        >

          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />

          <p style={{ marginTop: 20, fontSize: 12, color: "#555" }}>
            Please wait...
          </p>

          <p style={{ fontSize: 16 }}>
            Please turn the RFID scanner to register mode.
          </p>

        </div>
      </Modal>

      {/* EMPLOYEE MODAL */}

      <Modal
        title="Employee Information"
        open={employeeModalVisible}
        onCancel={handleEmployeeModalClose}
        footer={null}
        width={isMobile ? "95%" : 700}
        centered
      >

        <Form layout="vertical" form={form} onFinish={handleEmployeeSubmit}>

          <Form.Item label="RFID Card No." name="card">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Role" name="role">
            <Select placeholder="Select role">
              <Option value="Admin">Admin</Option>
              <Option value="Employee">Employee</Option>
              <Option value="Manager">Manager</Option>
            </Select>
          </Form.Item>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: personalInfoColumns,
              gap: 8
            }}
          >

            <Form.Item label="Last Name" name="lastName">
              <Input />
            </Form.Item>

            <Form.Item label="First Name" name="firstName">
              <Input />
            </Form.Item>

            <Form.Item label="Middle Name" name="middleName">
              <Input />
            </Form.Item>

            <Form.Item label="Suffix" name="suffix">
              <Input />
            </Form.Item>

          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: secondRowColumns,
              gap: 8
            }}
          >

            <Form.Item label="Birthdate" name="birthdate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Gender" name="gender">
              <Select>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Contact No." name="contact">
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              style={{ gridColumn: "1 / -1" }}
            >
              <Input />
            </Form.Item>

          </div>

          <h3 style={{ textAlign: "center" }}>Account Section</h3>

          <div style={{ display: "grid", gap: 8 }}>

            <Form.Item label="Username" name="username">
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Re-enter Password" name="rePassword">
              <Input.Password style={{ width: "100%" }} />
            </Form.Item>

          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ marginTop: 10, background: "#10b981" }}
          >
            Proceed
          </Button>

        </Form>
      </Modal>

      {/* CONFIRM MODAL */}

      <Modal
        title="Confirm Employee Information"
        open={confirmModalVisible}
        onCancel={handleReturnToEmployeeModal}
        onOk={handleFinalSubmit}
        okText="Confirm"
        cancelText="Return"
        centered
      >

        <p><b>Card No:</b> {formValues.card}</p>
        <p><b>Role:</b> {formValues.role}</p>
        <p><b>Name:</b> {formValues.lastName} {formValues.firstName}</p>
        <p><b>Contact:</b> {formValues.contact}</p>
        <p><b>Username:</b> {formValues.username}</p>

      </Modal>

    </div>
  );
}