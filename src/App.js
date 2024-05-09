import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "./utils";
import Items from "./components/items.component";
import Orders from "./components/orders.component";

const { Header, Content, Footer, Sider } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const snap = useSnapshot(state);
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const handleClick = (index) => {
    state.activeIndex = index;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            onClick={() => {
              handleClick(1);
            }}
            key="1"
            icon={<PieChartOutlined />}
          >
            Items
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              handleClick(2);
            }}
            key="2"
            icon={<DesktopOutlined />}
          >
            Orders
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: 32 }}>
          {snap.activeIndex === 1 && <Items />}
          {snap.activeIndex === 2 && <Orders />}
        </Content>
        <Footer style={{ textAlign: "center" }}>SLIIT</Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
