import React, { useState, useEffect } from "react";
import { Input, Select, Button, Space, Table } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  CloseOutlined,
  EyeOutlined,
  DeleteOutlined
} from "@ant-design/icons";

const { Option } = Select;

export default function Employees() {
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = () => console.log("Search:", searchText);

  const roles = ["Admin", "HR", "Employee", "Manager", "Finance", "Support"];

  const columns = [
    { title: "Ref No.", dataIndex: "ref", key: "ref", align: "center", width: 100 },
    { title: "Card No.", dataIndex: "cardNo", key: "cardNo", align: "center", width: 120 },
    { title: "Full Name", dataIndex: "fullName", key: "fullName", align: "center", width: 200 },
    { title: "Department", dataIndex: "department", key: "department", align: "center", width: 150 },
    { title: "Role", dataIndex: "role", key: "role", align: "center", width: 120 },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 120,
      render: () => (
        <Space size={12}>
          <EyeOutlined
            style={{
              background: "#52c41a",
              color: "white",
              cursor: "pointer",
              borderRadius: 4,
              padding: 4
            }}
          />
          <DeleteOutlined
            style={{
              background: "red",
              color: "white",
              cursor: "pointer",
              borderRadius: 4,
              padding: 4
            }}
          />
        </Space>
      )
    }
  ];

  const dataSource = [
    {
      ref: "E001",
      cardNo: "C001",
      fullName: "Je-ann Callo",
      department: "HR",
      role: "Manager"
    },
    {
      ref: "E002",
      cardNo: "C002",
      fullName: "Walter Maturan",
      department: "Finance",
      role: "Employee"
    },
    {
      ref: "E003",
      cardNo: "C003",
      fullName: "Jayneth Valle",
      department: "Support",
      role: "Employee"
    }
  ];

  return (
    <div style={{ padding: 10 }}>
      <h2 style={{ marginBottom: 20 }}>Employee Management</h2>

      {/* CONTROLS */}
      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        size={12}
        wrap
        style={{ marginBottom: 16, width: "100%" }}
      >
        {/* SEARCH */}
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search employees..."
          style={{ width: isMobile ? "100%" : 260 }}
          suffix={
            <SearchOutlined
              style={{ cursor: "pointer", color: "#555" }}
              onClick={handleSearch}
            />
          }
        />

        <Button
          type="primary"
          onClick={handleSearch}
          style={{ width: isMobile ? "100%" : "auto" }}
        >
          Search
        </Button>

        {/* ROLE FILTER */}
        <Select
          placeholder="Select Role"
          value={roleFilter || undefined}
          style={{ width: isMobile ? "100%" : 200 }}
          onChange={(value) => {
            setRoleFilter(value);
            setRoleOpen(false);
          }}
          allowClear
          open={roleOpen}
          onDropdownVisibleChange={(open) => setRoleOpen(open)}
          dropdownMatchSelectWidth={false}
          listHeight={150}
          suffixIcon={
            roleFilter ? (
              <CloseOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  setRoleFilter("");
                  setRoleOpen(false);
                }}
                style={{ color: "#999", cursor: "pointer" }}
              />
            ) : (
              <FilterOutlined style={{ color: "#555" }} />
            )
          }
        >
          {roles.map((role) => (
            <Option key={role} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Space>

      {/* SEPARATOR */}
      <div style={{ borderTop: "2px solid #e8e8e8", margin: "16px 0" }}></div>

      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="ref"
        bordered
        pagination={false}
        scroll={{ x: 800 }}
        locale={{ emptyText: "No employees found" }}
      />
    </div>
  );
}