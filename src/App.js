import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Row,
  Col,
  Button,
  Badge,
  Input,
  Select
} from "antd";
import Item from "antd/lib/list/Item";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import Food from "./Components/Food";
import History from "./Components/History";
import Error404 from "./Components/Error404";
import MenuAdd from "./Components/MenuAdd";
import Axios from "axios";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;
const { Option } = Select;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
    this.sortAscending = this.sortAscending.bind(this);
    this.sortDescending = this.sortDescending.bind(this);
    this.searchMenu = this.searchMenu.bind(this);
    this.filterMenubyCategory = this.filterMenubyCategory.bind(this);
    this.state = {
      collapsed: true,
      cartCount: 0,
      menuItem: [],
      menuItemShow: [],
      loading: true,
      sortby: "name",
      dataTransaction: [],
      dataTransactionMenu: []
    };
  }

  componentDidMount() {
    this.getMenuData();
    this.getHistory();
  }

  getHistory() {
    setTimeout(() => {
      Axios.get("http://localhost:6660/api/transaction")
        .then(res => {
          this.setState({
            dataTransaction: res.data.response,
            loading: false
          });
          // console.log(this.state.menuItem);
        })
        .then(() => {
          Axios.get("http://localhost:6660/api/transaction/menu")
            .then(res => {
              this.setState({
                dataTransactionMenu: res.data.response,
                loading: false
              });
              // console.log(this.state.menuItem);
            })
            .catch(error => {
              console.log(error);
              this.setState({
                dataTransactionMenu: [],
                loading: false
              });
            });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            dataTransaction: [],
            loading: false
          });
        });
    }, 500);
  }

  // async
  getMenuData() {
    // di komen reduxnya dulu ya
    // await this.props.dispatch(getMenu());
    // this.setState({
    // menuItem: this.props.menu.menuData,
    // loading: false
    // });
    setTimeout(() => {
      Axios.get("http://localhost:6660/api/menu")
        .then(res => {
          this.setState({
            menuItem: res.data.response,
            menuItemShow: res.data.response,
            loading: false
          });
          // console.log(this.state.menuItem);
        })
        .catch(error => {
          console.log(error);
          this.setState({
            menuItem: [],
            loading: false
          });
        });
    }, 500);
  }

  callbackFunction = childData => {
    this.setState({ cartCount: childData });
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  showModalLogin() {
    this.refs.childLogin.showModalLogin();
  }
  showModalLogout() {
    this.refs.childLogout.showModalLogout();
  }
  showModalAdd() {
    this.refs.childAdd.showModalAdd();
  }

  // var FilteredList = React.createClass({
  searchMenu(event) {
    let updatedList = this.state.menuItem;
    updatedList = updatedList.filter(function(item) {
      return (
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ menuItemShow: updatedList });
  }
  filterMenubyCategory(value) {
    if (value === "all") {
      this.setState({ menuItemShow: this.state.menuItem });
    } else {
      let updatedList = this.state.menuItem;
      updatedList = updatedList.filter(function(item) {
        return item.category.toLowerCase().search(value.toLowerCase()) !== -1;
      });
      this.setState({ menuItemShow: updatedList });
    }
  }

  sortBy(value) {
    this.setState({
      sortby: value
    });
  }

  sortDescending() {
    let sort = this.state.sortby;
    const myData = this.state.menuItem.sort(function(a, b) {
      if (sort === "name") {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      } else {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
      }
      return 0;
    });
    // console.log(myData);
    this.setState({
      menuItemShow: myData
    });
  }

  sortAscending = () => {
    let sort = this.state.sortby;
    const myData = this.state.menuItem.sort(function(b, a) {
      if (sort === "name") {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      } else {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
      }
      return 0;
    });
    // console.log(myData);
    this.setState({
      menuItemShow: myData
    });
  };

  render() {
    // this.props.location.hash === "#!"
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
            selectedKeys={[
              pages === null || pages === "food"
                ? "1"
                : pages === "history"
                ? "2"
                : ""
            ]}
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
                this.showModalAdd();
              }}
            >
              <Icon style={{ fontSize: 25 }} type="plus-circle" />
              <span>Add Item</span>
              <MenuAdd ref="childAdd" />
            </Menu.Item>
            {!localStorage.token ? (
              <Menu.Item
                onClick={() => {
                  this.showModalLogin();
                }}
              >
                <Icon style={{ fontSize: 25 }} type="key" />
                <span>Login</span>
                <Login
                  ref="childLogin"
                  // ref={instance => {
                  //   this.child = instance;
                  // }}
                />
              </Menu.Item>
            ) : (
              <Menu.Item
                onClick={() => {
                  this.showModalLogout();
                }}
              >
                <Icon style={{ fontSize: 25 }} type="poweroff" />
                <span>Logout</span>
                <Logout ref="childLogout" />
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#002140", padding: 0, height: 60 }}>
            <Row>
              {/* <Button type="primary" shape="circle" icon="search" /> */}
              {pages === null || pages === "food" ? (
                <Col span={1}>
                  {/* &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; */}
                  &nbsp; &nbsp;
                  <Button
                    onClick={this.sortAscending}
                    // style={{ paddingLeft: "2" }}
                    type="default"
                    icon="arrow-up"
                  />
                  {/* &nbsp; */}
                </Col>
              ) : (
                ""
              )}

              {pages === null || pages === "food" ? (
                <Col span={1}>
                  <Button
                    onClick={this.sortDescending}
                    type="default"
                    icon="arrow-down"
                  />
                </Col>
              ) : (
                ""
              )}
              {pages === null || pages === "food" ? (
                <Col span={2}>
                  <Select
                    name="sort"
                    placeholder="Sort by"
                    style={{ width: "100%" }}
                    onChange={this.sortBy}
                  >
                    <Option value="name">Name</Option>
                    <Option value="price">Price</Option>
                  </Select>
                </Col>
              ) : (
                ""
              )}
              <Col span={pages === null || pages === "food" ? 8 : 24}>
                <Title
                  style={{
                    color: "white",
                    paddingLeft: "50%",
                    paddingTop: 15
                  }}
                  level={4}
                >
                  {pages === null || pages === "food"
                    ? "Food Item"
                    : pages === "history"
                    ? "History"
                    : "Not Found"}
                </Title>
              </Col>
              {pages === null || pages === "food" ? (
                <Col span={6}>
                  <Row>
                    <Col span={12}>
                      <Input
                        style={{ width: "95%" }}
                        placeholder="Input Keyword "
                        onChange={this.searchMenu}
                      />
                    </Col>
                    <Col span={12}>
                      <Select
                        name="category"
                        placeholder="Select Category"
                        style={{ width: "95%" }}
                        onChange={this.filterMenubyCategory}
                      >
                        <Option value="all">Show All</Option>
                        <Option value="food">Food</Option>
                        <Option value="beverage">Beverage</Option>
                      </Select>
                    </Col>
                  </Row>
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

          {/* <Content style={{ margin: "0 16px" }}> <Breadcrumb style={{ margin: "16px 0" }}> <Breadcrumb.Item> */}
          {/* {pages === null || pages === "food" ? "Food Item" : "History"} </Breadcrumb.Item> */}
          {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> </Breadcrumb> */}
          <div
            style={{
              //padding: 24,
              background: "#fff",
              minHeight: 500
            }}
          >
            {pages === null || pages === "food" ? (
              <Food
                loading={this.state.loading}
                parentCallback={this.callbackFunction}
                menuItem={this.state.menuItemShow}
              />
            ) : pages === "history" ? (
              <History
                loading={this.state.loading}
                dataTransaction={this.state.dataTransaction}
                dataTransactionMenu={this.state.dataTransactionMenu}
                parentCallback={this.callbackFunction}
              />
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
