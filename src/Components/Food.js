import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Badge,
  Card,
  // Pagination,
  InputNumber,
  Skeleton
} from "antd";
// import Title from "antd/lib/skeleton/Title";
import Meta from "antd/lib/card/Meta";
// import "./../Css/Pagination.css";
import ButtonGroup from "antd/lib/button/button-group";
import { Typography } from "antd";
import Checkout from "./Checkout";
import { getMenu } from "../Public/Redux/Actions/menu";
import { connect } from "react-redux";
import Axios from "axios";
import Pagination from "./Pagination";
import MenuEdit from "./MenuEdit";
import MenuEditImg from "./MenuEditImg";

const { Title } = Typography;
class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItem: [],
      // menuItem: [],
      // loading: true,
      currentPage: 1,
      postsPerPage: 6
      // disabledClick: [],
      // valueCountItem: 0,
      // valueCountPrice: [],
      // cartItemCount: []
    };
  }

  // componentDidMount() {
  //   this.getMenuData();
  // }

  sendBackData = count => {
    this.props.parentCallback(count + 1);
  };

  removeCartItem(id) {
    this.setState({
      cartItem: this.state.cartItem.filter(item => item.id !== id)
    });
    let cartCount = this.state.cartItem.length;
    this.sendBackData(cartCount - 2);
    // this.props.parentCallback(count + 1)
  }
  cartReset() {
    this.setState({
      cartItem: []
      // disabledClick: []
    });
    this.props.parentCallback(0);
  }
  cartAdd(item) {
    let count = {
      id: item.id,
      name: item.name,
      img: item.img,
      price: item.price,
      count: 1
    };
    this.setState(prevState => {
      return {
        cartItem: [...prevState.cartItem, count]
        // cartItemCount: [...prevState.cartItemCount, count]
      };
    });
    let cartCount = this.state.cartItem.length;
    this.sendBackData(cartCount);
  }

  cartItemCount(index, count) {
    let items = this.state.cartItem;
    items[index].count = count;
    this.setState({ cartItem: items });
  }

  buttonCartItemCount(index, method) {
    let items = this.state.cartItem;
    if (method === "+") items[index].count += 1;
    else items[index].count -= 1;
    this.setState({ cartItem: items });
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  showModalEdit(item) {
    this.setState({
      edit_id: item.id,
      edit_name: item.name,
      edit_price: item.price,
      edit_category: item.category
    });
    this.refs.childEdit.showModalEdit(
      item.id,
      item.name,
      item.price,
      item.category
    );
  }

  showModalEditImg(id, img) {
    this.refs.childEditImg.showModalEditImg(id, img);
  }
  render() {
    //PAGINATION
    const indexOflastpost = this.state.currentPage * this.state.postsPerPage;
    const indexOffirstPost = indexOflastpost - this.state.postsPerPage;
    const currentPost = this.props.menuItem.slice(
      indexOffirstPost,
      indexOflastpost
    );
    // console.log("menu dari db", this.state.menuItem);
    let arr = this.state.cartItem;
    let total = arr.reduce((prev, next) => prev + next.count * next.price, 0);
    // console.log("ini cart", this.state.cartItem);

    //KODE RECEIPT
    let date = new Date();
    let components = [
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ];
    let codeReceiptString = components.join("");
    return (
      <div>
        <MenuEdit ref="childEdit" />
        <MenuEditImg ref="childEditImg" />
        <Row>
          <Col
            span={18}
            style={{
              backgroundColor: "#e1e6e8",
              minHeight: localStorage.token ? "135vh" : "120vh"
            }}
          >
            {/* <center> */}
            <Row
              style={{
                paddingTop: "5%",
                paddingBottom: "2%",
                marginLeft: "6%"
              }}
              gutter={16}
            >
              {this.props.loading ? (
                <div style={{ paddingRight: "8%" }}>
                  <Skeleton active />
                  <Skeleton active />
                  <Skeleton active />
                  <Skeleton active />
                </div>
              ) : null}
              {this.props.menuItem.length > 0 ? null : (
                <center>
                  <img
                    style={{ paddingTop: "5%" }}
                    width="50%"
                    src="https://hoangnguyengreen.com/public/static/theme/img/cart_empty_icon.png"
                  />
                  <Title level={2}>No Result Found</Title>
                </center>
              )}

              {currentPost.map((item, index) => {
                return (
                  <Col span={8}>
                    <Card
                      hoverable
                      style={{ width: "76%", borderRadius: 10 }}
                      cover={
                        <img
                          onClick={() =>
                            this.state.cartItem.filter(
                              cart => item.id === cart.id
                            ).length > 0
                              ? null
                              : this.cartAdd(item)
                          }
                          alt="example"
                          src={item.img}
                          height="200"
                          style={{
                            opacity:
                              this.state.cartItem.filter(
                                cart => item.id === cart.id
                              ).length > 0
                                ? 0.5
                                : "",
                            objectFit: "cover",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                          }}
                        />
                      }
                    >
                      <Meta
                        title={item.name}
                        description={"Rp. " + this.formatNumber(item.price)}
                      />
                      {localStorage.token ? (
                        <div>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "37%",
                              width: "100%",
                              left: 0
                            }}
                          >
                            <Button
                              type="default"
                              style={{
                                width: "100%"
                              }}
                              onClick={() => {
                                this.showModalEditImg(item.id, item.img);
                              }}
                            >
                              Change Image
                            </Button>
                          </div>
                          <div style={{ paddingTop: "10%" }}>
                            <Button
                              type="primary"
                              style={{ width: "100%" }}
                              onClick={() => {
                                this.showModalEdit(item);
                              }}
                            >
                              Edit
                            </Button>

                            {/* &nbsp; */}
                            {/* <Button>Delete</Button> */}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {this.state.cartItem.filter(cart => item.id === cart.id)
                        .length > 0 && (
                        <img
                          style={{
                            position: "absolute",
                            bottom: "50%",
                            left: "25%",
                            paddingLeft: 10
                          }}
                          width="50%"
                          src="https://image.flaticon.com/icons/png/512/1271/1271380.png"
                        />
                      )}
                    </Card>
                    <br />
                  </Col>
                );
              })}
            </Row>
            {/* </center> */}
            <center>
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  margin: "auto",
                  left: 0,
                  right: 0
                }}
              >
                <Pagination
                  currentPage={this.state.currentPage}
                  totalPosts={this.props.menuItem.length}
                  postsPerPage={this.state.postsPerPage}
                  paginate={pagenumbers =>
                    this.setState({ currentPage: pagenumbers })
                  }
                />
              </div>
            </center>
          </Col>
          <Col
            span={6}
            style={{
              overflow: "auto",
              maxHeight: localStorage.token ? "135vh" : "120vh"
            }}
          >
            {/* <div> */}
            {this.state.cartItem.length > 0 ? (
              this.state.cartItem
                .map((item, index) => {
                  return (
                    <Card
                      key={index}
                      title={item.name}
                      extra={
                        <a onClick={() => this.removeCartItem(item.id)}>
                          Remove
                        </a>
                      }
                      style={{ width: "100%" }}
                    >
                      <Row>
                        <Col span={8}>
                          <img
                            style={{ objectFit: "cover" }}
                            src={item.img}
                            width="100%"
                          />
                        </Col>
                        <Col span={3} />
                        <Col span={12}>
                          <ButtonGroup>
                            <Button
                              onClick={() =>
                                this.buttonCartItemCount(index, "-")
                              }
                            >
                              -
                            </Button>
                            <input
                              onChange={event =>
                                this.cartItemCount(index, event.target.value)
                              }
                              name="price"
                              value={item.count}
                              min={0}
                              type="number"
                              style={{ width: 45, height: 30 }}
                            />
                            <Button
                              onClick={() =>
                                this.buttonCartItemCount(index, "+")
                              }
                            >
                              +
                            </Button>
                          </ButtonGroup>
                          <Title level={3}>
                            {item.price * item.count === 0
                              ? this.removeCartItem(item.id)
                              : "Rp. " +
                                this.formatNumber(item.price * item.count)}
                          </Title>
                        </Col>
                      </Row>
                    </Card>
                  );
                })
                .reverse()
            ) : (
              <div style={{ paddingTop: "40%" }}>
                <img
                  width="100%"
                  src="https://www.razencustoms.com/includes/img/empty-cart.png"
                />{" "}
              </div>
            )}
            {this.state.cartItem.length > 0 ? (
              <div style={{ padding: "2%" }}>
                <Row>
                  <Col span={12}>
                    <Title level={3}>Total:</Title>
                  </Col>
                  <Col span={12}>
                    <Title level={3}>{"Rp. " + this.formatNumber(total)}</Title>
                  </Col>
                </Row>
                <Title level={4}>* Not including PPN</Title>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    this.child.showModal();
                  }}
                >
                  Checkout
                </Button>
                <Checkout
                  date={date}
                  total={total}
                  codeR={codeReceiptString}
                  dataCheckout={this.state.cartItem}
                  ref={instance => {
                    this.child = instance;
                  }}
                />
                <div style={{ padding: 2 }} />
                <Button type="danger" block onClick={() => this.cartReset()}>
                  Cancel
                </Button>
              </div>
            ) : (
              ""
            )}
            {/* </div> */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Food;

// const mapStateToProps = state => {
//   return {
//     menu: state.menu // namaProps: state.namaReducer
//   };
// };

// export default connect(mapStateToProps)(Food);
