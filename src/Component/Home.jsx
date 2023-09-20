import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  UserAddOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  OrderedListOutlined,
  AlignLeftOutlined,
  AppstoreAddOutlined,
  HolderOutlined,
  FilterOutlined,
  LinkOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Menu, Col, Row } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("User List", "sub1", <UserAddOutlined />, [
    getItem("Merchant", "Merchant", <UserSwitchOutlined />),
    getItem("All Users", "2", <UsergroupAddOutlined />),
  ]),
  {
    type: "divider",
  },
  getItem("Product", "sub2", <OrderedListOutlined />, [
    getItem("Add product", "addProduct", <AlignLeftOutlined />),
    getItem("Product List", "4", <AlignLeftOutlined />),
  ]),
  {
    type: "divider",
  },

  getItem("Catagories", "sub3", <AppstoreAddOutlined />, [
    getItem("Add Catagorie", "5", <HolderOutlined />),
    getItem("All Catagories", "6", <HolderOutlined />),
  ]),
  {
    type: "divider",
  },
  getItem("SubCatagories", "sub4", <FilterOutlined />, [
    getItem("Add SubCatagories", "7", <LinkOutlined />),
    getItem("All SubCatagories", "8", <ScheduleOutlined />),
  ]),
];

const Home = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log("click ", e.key);
    navigate(`/${e.key}`);
  };
  return (
    <>
      <Row>
        <Col span={6}>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Col>
        <Col span={18} pull={1}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default Home;
