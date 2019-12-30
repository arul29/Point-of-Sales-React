import React, { Component } from "react";
import { Row, Col, Button, Badge, Card, Pagination, InputNumber } from "antd";
// import Title from "antd/lib/skeleton/Title";
import Meta from "antd/lib/card/Meta";
import "./../Css/Pagination.css";
import ButtonGroup from "antd/lib/button/button-group";
import { Typography } from "antd";
import Checkout from "./Checkout";

const { Title } = Typography;
class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItem: [],
      // disabledClick: [],
      valueCountItem: 0,
      valueCountPrice: [],
      cartItemCount: []
    };
  }

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

  // cartItemCount() {}

  cartItemCount(index, count) {
    let items = this.state.cartItem;
    items[index].count = count;
    this.setState({ cartItem: items });
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  render() {
    // console.log(this.state.cartItem);
    let arr = this.state.cartItem;
    let total = arr.reduce((prev, next) => prev + next.count * next.price, 0);
    // console.log("ini cart", this.state.cartItem);
    let food = [
      {
        id: 0,
        name: "Ayam Bakar",
        price: 20000,
        img:
          "https://selerasa.com/wp-content/uploads/2015/12/images_daging_ayam-bakar-pedas-manis.jpg"
      },
      {
        id: 1,
        name: "Ikan Bakar",
        price: 22000,
        img:
          "https://upload.wikimedia.org/wikipedia/commons/f/ff/Gurame_bakar_kecap_1.JPG"
      },
      {
        id: 2,
        name: "Nasi Goreng",
        price: 12000,
        img:
          "https://www.masakapahariini.com/wp-content/uploads/2018/04/cara-membuat-nasi-goreng-seafood-620x440.jpg"
      },
      {
        id: 3,
        name: "Coto Makassar",
        price: 15000,
        img:
          "https://selerasa.com/wp-content/uploads/2016/11/images_Kue_cubit_Resep-coto-makassar.jpg"
      },
      {
        id: 4,
        name: "Ayam Geprek",
        price: 13000,
        img:
          "https://www.masakapahariini.com/wp-content/uploads/2018/04/resep_ayam_bakar_kecap_manis_MAHI-780x440.jpg"
      },
      {
        id: 5,
        name: "Sate Ayam",
        price: 14000,
        img:
          "https://cdn02.indozone.id/re/content/2019/07/01/3esnJq/t_5d19c617f2ce1.jpg?w=700&q=85"
      }
    ];

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
        <Row>
          <Col
            span={18}
            style={{
              backgroundColor: "#e1e6e8"
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
              {food.map((item, index) => {
                return (
                  <Col span={8}>
                    <Card
                      onClick={() =>
                        this.state.cartItem.filter(cart => item.id === cart.id)
                          .length > 0
                          ? null
                          : this.cartAdd(item)
                      }
                      hoverable
                      style={{ width: "76%", borderRadius: 10 }}
                      cover={
                        <img
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
              <div className="pagination">
                <a href="#">&laquo;</a>
                <a href="#">1</a>
                <a href="#" class="active">
                  2
                </a>
                <a href="#">3</a>
                <a href="#">&raquo;</a>
              </div>
            </center>
          </Col>
          <Col span={6} style={{ overflow: "auto", maxHeight: "120vh" }}>
            {/* <div> */}
            {this.state.cartItem.length > 0 ? (
              this.state.cartItem
                .map((item, index) => {
                  // let countPrice = [item.price];
                  // let countPrice2 = [item.price];

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
                            <Button>-</Button>
                            {/* <Button disabled>0</Button> */}
                            <input
                              onChange={event =>
                                // this.setState({
                                // valueCountItem: event.target.value
                                // valueCountPrice: joinedCount
                                // }),
                                this.cartItemCount(index, event.target.value)
                              }
                              // onInput={event => {
                              //   console.log("index", index);

                              //   // (event) {
                              //   // this.setState({value: event.target.value});
                              //   let joinedCount = this.state.valueCountPrice.concat(
                              //     event.target.value * countPrice
                              //   );
                              //   this.setState({
                              //     valueCountItem: event.target.value,
                              //     valueCountPrice: joinedCount
                              //   });
                              //   countPrice2[index] =
                              //     countPrice * event.target.value;
                              //   console.log("counzzz", countPrice2[index]);
                              // }}
                              name="price"
                              // value={this.state.valueCountItem[index]}
                              value={item.count}
                              min={0}
                              type="number"
                              style={{ width: 45, height: 30 }}
                            />
                            <Button>+</Button>
                          </ButtonGroup>
                          <Title level={3}>
                            {item.price * item.count === 0
                              ? this.removeCartItem(item.id)
                              : "Rp. " +
                                this.formatNumber(item.price * item.count)
                            // this.state.valueCountPrice[index] *
                            // this.state.valueCountItem
                            }
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
                    {/* {
                    this.state.cartItem.map((item,index)=>{
                     
                    })} */}
                    <Title level={3}>{"Rp. " + this.formatNumber(total)}</Title>
                  </Col>
                </Row>
                <Title level={4}>*Belum termasuk PPN</Title>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    this.child.showModal();
                  }}
                >
                  Checkout
                </Button>
                {/* onClick={this.showModal} */}
                <Checkout
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
