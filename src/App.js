import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button, Badge } from "antd";
import Item from "antd/lib/list/Item";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import Food from "./Components/Food";
import History from "./Components/History";
import Error404 from "./Components/Error404";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      cartCount: 0
    };
  }

  // state = { message: "parent message" }
  callbackFunction = childData => {
    this.setState({ cartCount: childData });
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    // let page = this.props.location.search;
    const query = new URLSearchParams(this.props.location.search);
    let pages = query.get("page");
    // console.log(pages);
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            // defaultSelectedKeys={["1"]}
            selectedKeys={[pages === null || pages === "food" ? "1" : "2"]}
            mode="inline"
          >
            <Item style={{ marginLeft: "35%" }}>
              <a href="/">
                <img
                  width="32"
                  src="https://image.flaticon.com/icons/png/512/138/138310.png"
                />
              </a>
            </Item>
            {/* <div style={{ marginBottom: 50 }} /> */}
            <Menu.Item key="1">
              <Link to={"?page=food"}>
                <Icon style={{ fontSize: 25 }} type="shopping-cart" />
                <span>Food Item</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={"?page=history"}>
                <Icon style={{ fontSize: 25 }} type="fund" />
                <span>History</span>
              </Link>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                alert("Tambahkan Item Anda");
              }}
            >
              {/* <Link to={"?page=history"}> */}
              {/* <Icon type="fund" /> */}
              <Icon style={{ fontSize: 25 }} type="plus-circle" />
              <span>Add Item</span>
              {/* </Link> */}
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#002140", padding: 0, height: 60 }}>
            <Row>
              <Col span={pages === null || pages === "food" ? 17 : 24}>
                <Title
                  style={{
                    color: "white",
                    paddingLeft: "50%",
                    paddingTop: 15
                  }}
                  level={4}
                >
                  {pages === null || pages === "food" ? "Food Item" : "History"}
                </Title>
              </Col>
              {pages === null || pages === "food" ? (
                <Col span={1}>
                  <Button shape="circle" icon="search" />
                </Col>
              ) : (
                ""
              )}
              {pages === null || pages === "food" ? (
                <Col span={6}>
                  <div style={{ paddingLeft: "42%" }}>
                    <Badge count={this.state.cartCount}>
                      <Title level={4} style={{ color: "white" }}>
                        Cart
                      </Title>
                    </Badge>
                  </div>
                </Col>
              ) : (
                ""
              )}
            </Row>
          </Header>
          {/* <Content style={{ margin: "0 16px" }}> */}
          {/* <Breadcrumb style={{ margin: "16px 0" }}> */}
          {/* <Breadcrumb.Item> */}
          {/* {pages === null || pages === "food" ? "Food Item" : "History"} */}
          {/* </Breadcrumb.Item> */}
          {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          {/* </Breadcrumb> */}
          <div
            style={{
              //padding: 24,
              background: "#fff",
              minHeight: 500
            }}
          >
            {pages === null || pages === "food" ? (
              <Food parentCallback={this.callbackFunction} />
            ) : pages === "history" ? (
              <History parentCallback={this.callbackFunction} />
            ) : (
              <Error404 />
            )}
          </div>
          {/* </Content> */}
          <Footer style={{ textAlign: "center" }}>
            Food & Beverage ©2020 Created by Andi Mashdarul Khair
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
