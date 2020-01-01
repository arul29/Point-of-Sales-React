import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Badge,
  Typography,
  Table,
  Tag,
  Divider,
  Skeleton,
  Button
} from "antd";
import Axios from "axios";
import "./../Css/History.css";
import dateFormat from "dateformat";
import Meta from "antd/lib/card/Meta";
import Pagination from "./Pagination";
const { Title } = Typography;

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataTransaction: [],
      dataTransactionMenu: [],
      currentPage: 1,
      postsPerPage: 6
    };
  }
  componentDidMount() {
    //jika pindah ke halaman history akan me reset jumlah cart di header
    this.props.parentCallback(0);
    this.getHistory();
    this.getHHHH();

    // var newState = [...this.state.dataTransaction];
    // if (this.state.dataTransaction.length > 0) {
    //   this.state.dataTransaction.map(item => {
    //     return this.state.dataTransactionMenu.filter(
    //       code => item.code_transaction === code.code_transaction
    //     ).length > 0
    //       ? newState.forEach(function(file) {
    //           file.key4 = "val4";
    //         })
    //       : "";
    //   });
    // }
    // this.setState({ dataTransaction: newState }, function() {
    //   console.log(this.state.dataTransaction);
    // });
  }
  getHHHH() {
    console.log("OKE");
    let newObject;
    this.state.dataTransaction.map(item => {
      let orders;
      this.state.dataTransactionMenu.map(data => {
        if (item.code_transaction === data.code_transaction)
          // console.log(data.name);
          orders.push(data.name);
      });
      // this.setState({
      //   dataTransaction: this.state.dataTransaction.concat(orders)
      // });
      newObject = {
        ...this.state.dataTransaction,
        orders: orders
      };
    });
    console.log("yes", newObject);
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

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  render() {
    const indexOflastpost = this.state.currentPage * this.state.postsPerPage;
    const indexOffirstPost = indexOflastpost - this.state.postsPerPage;
    const currentPost = this.state.dataTransaction.slice(
      indexOffirstPost,
      indexOflastpost
    );
    // let orders = [];
    // // let source = {
    // // orders:
    // this.state.dataTransaction.map(item => {
    //   this.state.dataTransactionMenu.map(data => {
    //     if (item.code_transaction === data.code_transaction)
    //       // console.log(data.name);
    //       orders.push(data.name);
    //   });
    // });
    console.log(this.state.dataTransaction);

    const columns = [
      {
        title: "Code Transaction",
        dataIndex: "transaction_code",
        key: "transaction_code",
        render: text => <a>{text}</a>
      },
      {
        title: "Cashier",
        dataIndex: "cashier",
        key: "cashier"
      },
      {
        title: "Date",
        dataIndex: "created_at",
        key: "created_at"
      },
      // {
      //   title: "Orders",
      //   key: "orders",
      //   dataIndex: "orders",
      //   render: orders => (
      //     <span>
      //       {orders.map(tag => {
      //         let color = tag.length > 5 ? "geekblue" : "green";
      //         if (tag === "loser") {
      //           color = "volcano";
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </span>
      //   )
      // },
      {
        title: "Amount",
        dataIndex: "total",
        key: "total"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a>Invite {record.name}</a>
            <Divider type="vertical" />
            <a>Delete</a>
          </span>
        )
      }
    ];

    // const data = this.state.dataTransaction;

    return (
      <div>
        <Row>
          {/* <Col
            span={24}
            style={{
              // backgroundColor: "#e1e6e8"
            }}
          ></Col> */}
        </Row>
        <Row
          //  gutter={16}
          style={{ paddingTop: "5%", paddingLeft: "8%" }}
        >
          <Col span={8}>
            <Card
              hoverable
              style={{
                width: "76%",
                borderRadius: 10,
                backgroundColor: "#ffd6e7"
              }}
              // cover={<img alt="example" src={} height="200" style={{}} />}
            >
              <Meta title="Today's Income" description={"Rp. 999,999"} />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{
                width: "76%",
                borderRadius: 10,
                backgroundColor: "#d6e4ff"
              }}
              // cover={<img alt="example" src={} height="200" style={{}} />}
            >
              <Meta title="Orders" description={"Rp. 999,999"} />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={{
                width: "76%",
                borderRadius: 10,
                backgroundColor: "#efdbff"
              }}
              // cover={<img alt="example" src={} height="200" style={{}} />}
            >
              <Meta title="This Years Income" description={"Rp. 999,999"} />
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col span={24}>
            <Table
              style={{ padding: "2%" }}
              dataSource={data}
              columns={columns}
            />
          </Col>
        </Row> */}
        <Row>
          <Col span={2}></Col>
          {this.state.loading ? (
            <Col span={20}>
              <div style={{ paddingRight: "5%" }}>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                {/* <Skeleton active /> */}
              </div>
            </Col>
          ) : (
            <Col
              span={24}
              style={{
                minHeight: "110vh"
              }}
            >
              <table style={{ width: "90%" }}>
                <thead>
                  <tr>
                    <th>Transaction Code</th>
                    <th>Cashier</th>
                    <th>Date</th>
                    <th>Orders</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPost.map((item, index) => {
                    return (
                      <tr>
                        <td data-column="First Name">
                          {item.transaction_code}
                        </td>
                        <td data-column="Last Name">{item.cashier}</td>
                        <td data-column="Job Title">
                          {dateFormat(item.created_at)}
                        </td>
                        <td data-column="Twitter" style={{ maxWidth: 300 }}>
                          {this.state.dataTransactionMenu.map((data, index) => {
                            if (data.transaction_code === item.transaction_code)
                              return (
                                <Tag
                                  color={
                                    data.category === "Food"
                                      ? "cyan"
                                      : "magenta"
                                  }
                                >
                                  {data.name} {data.quantity}
                                  {"x"}
                                </Tag>
                              );
                          })}
                          {/* <Tag color="cyan">cyan</Tag> */}
                        </td>
                        <td data-column="Twitter">
                          Rp. {this.formatNumber(item.total)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Col>
          )}
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
                totalPosts={this.state.dataTransaction.length}
                postsPerPage={this.state.postsPerPage}
                paginate={pagenumbers =>
                  this.setState({ currentPage: pagenumbers })
                }
              />
            </div>
          </center>
        </Row>
      </div>
    );
  }
}

export default History;
