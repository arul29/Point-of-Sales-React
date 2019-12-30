import React, { Component } from "react";
import { Row, Col, Button, Badge, Card, Pagination, InputNumber } from "antd";
// import Title from "antd/lib/skeleton/Title";
import Meta from "antd/lib/card/Meta";
import "./../Css/Pagination.css";
import ButtonGroup from "antd/lib/button/button-group";
import { Typography } from "antd";

const { Title } = Typography;
class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItem: [],
      disabledClick: [],
      valueCountItem: [],
      valueCountPrice: []
    };
  }

  sendBackData = count => {
    this.props.parentCallback(count + 1);
  };
  cartReset() {
    this.setState({ cartItem: [], disabledClick: [] });
    this.props.parentCallback(0);
  }
  cartAdd(name, price, img, id) {
    let newCart = {
      id,
      name,
      price,
      img
    };
    let joined = this.state.cartItem.concat(newCart);
    let joinedID = this.state.disabledClick.concat(id);
    // this.setState({ myArray: joined })
    this.setState({
      cartItem: joined,
      disabledClick: joinedID
    });
    let cartCount = this.state.cartItem.length;
    this.sendBackData(cartCount);
    console.log("id klik", this.state.disabledClick);
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  render() {
    // console.log("ini cart", this.state.cartItem);
    let food = [
      {
        id: 0,
        name: "ikan",
        price: 5000,
        img:
          "https://upload.wikimedia.org/wikipedia/commons/f/ff/Gurame_bakar_kecap_1.JPG"
      },
      {
        id: 1,
        name: "ayam",
        price: 6000,
        img:
          "https://www.masakapahariini.com/wp-content/uploads/2018/04/resep_ayam_bakar_kecap_manis_MAHI-780x440.jpg"
      },
      {
        id: 2,
        name: "sayur",
        price: 3000,
        img:
          "http://lagizi.com/wp-content/uploads/2017/01/memanggang-sayuran.png"
      },
      {
        id: 3,
        name: "ikan",
        price: 5000,
        img:
          "https://upload.wikimedia.org/wikipedia/commons/f/ff/Gurame_bakar_kecap_1.JPG"
      },
      {
        id: 4,
        name: "ayam",
        price: 6000,
        img:
          "https://www.masakapahariini.com/wp-content/uploads/2018/04/resep_ayam_bakar_kecap_manis_MAHI-780x440.jpg"
      },
      {
        id: 5,
        name: "sayur",
        price: 3000,
        img:
          "http://lagizi.com/wp-content/uploads/2017/01/memanggang-sayuran.png"
      }
    ];
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
                let disabled = "";
                return (
                  this.state.disabledClick.map((id, index) => {
                    if (id === item.id) return (disabled = null);
                  }),
                  (
                    <Col span={8}>
                      <Card
                        onClick={() =>
                          disabled === null
                            ? disabled
                            : this.cartAdd(
                                item.name,
                                item.price,
                                item.img,
                                item.id
                              )
                        }
                        hoverable
                        style={{ width: "76%", borderRadius: 10 }}
                        cover={
                          <img
                            alt="example"
                            src={item.img}
                            height="200"
                            style={{
                              opacity: disabled === null ? 0.5 : "",
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
                        {this.state.disabledClick.map((id, index) => {
                          if (id === item.id)
                            return (
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
                            );
                        })}
                      </Card>
                      <br />
                    </Col>
                  )
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
                  let countPrice = [item.price];
                  let countPrice2 = [item.price];

                  return (
                    <Card
                      key={index}
                      title={item.name}
                      extra={<a href="#">Remove</a>}
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
                              min={1}
                              type="number"
                              style={{ width: 45, height: 30 }}
                            />
                            <Button>+</Button>
                          </ButtonGroup>
                          <Title level={3}>
                            {"Rp. " + this.formatNumber(item.price)
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
              // <div></div>
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
                    <Title level={3}>Rp. 10000*</Title>
                  </Col>
                </Row>
                <Title level={4}>*Belum termasuk PPN</Title>
                <Button type="primary" block>
                  Primary
                </Button>
                <div style={{ padding: 2 }} />
                <Button type="danger" block onClick={() => this.cartReset()}>
                  Danger
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
