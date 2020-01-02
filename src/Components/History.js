import React, { Component } from "react";
import { Row, Col, Card, Typography, Tag, Skeleton } from "antd";
import "./../Css/History.css";
import dateFormat from "dateformat";
import Meta from "antd/lib/card/Meta";
import Pagination from "./Pagination";
import { BarChart } from "reaviz";
const { Title } = Typography;

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      postsPerPage: 6,
      dataTodayIncome: [],
      dataYearsIncome: [],
      dataTodayMenuSell: [],
      chartData: []
    };
  }

  componentDidMount() {
    //jika pindah ke halaman history akan me reset jumlah cart di header
    this.props.parentCallback(0);
    this.getTodaysIncome();
    this.getYearsIncome();
    this.getTodaysMenuSell();
    // this.chartData();
  }

  getTodaysIncome() {
    let dateNow = new Date();
    // console.log("date Today", dateNow.toLocaleString().substring(0, 8));
    let filterTodayTransaction = this.props.dataTransaction;
    filterTodayTransaction = filterTodayTransaction.filter(function(item) {
      return (
        dateFormat(item.created_at)
          .toString()
          .substring(0, 8)
          .search(dateNow.toString().substring(0, 8)) !== -1
      );
    });
    this.setState({ dataTodayIncome: filterTodayTransaction });
  }

  getYearsIncome() {
    let dateNow = new Date();
    let filterTodayTransaction = this.props.dataTransaction;
    filterTodayTransaction = filterTodayTransaction.filter(function(item) {
      return (
        dateFormat(item.created_at)
          .toString()
          .substring(6, 4)
          .search(dateNow.toString().substring(6, 4)) !== -1
      );
    });
    this.setState({ dataYearsIncome: filterTodayTransaction });
  }

  getTodaysMenuSell() {
    let dateNow = new Date();
    // console.log("date Today", dateNow.toLocaleString().substring(0, 8));
    let filterTodayTransaction = this.props.dataTransactionMenu;
    filterTodayTransaction = filterTodayTransaction.filter(function(item) {
      return (
        dateFormat(item.created_at)
          .toString()
          .substring(0, 8)
          .search(dateNow.toString().substring(0, 8)) !== -1
      );
    });
    this.setState({ dataTodayMenuSell: filterTodayTransaction });
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  render() {
    // console.log("chart", this.state.chartData);
    //today income
    let today = this.state.dataTodayIncome;
    let totalIncomeDay = today.reduce((prev, next) => prev + next.total, 0);
    // console.log("TODAYS INCOME", totalIncomeDay);
    //total order
    let order = this.props.dataTransactionMenu;
    let orderTotal = order.reduce((prev, next) => prev + next.quantity, 0);
    //today income
    let year = this.state.dataYearsIncome;
    let totalIncomeYear = year.reduce((prev, next) => prev + next.total, 0);
    //pagination
    const indexOflastpost = this.state.currentPage * this.state.postsPerPage;
    const indexOffirstPost = indexOflastpost - this.state.postsPerPage;
    const currentPost = this.props.dataTransaction.slice(
      indexOffirstPost,
      indexOflastpost
    );

    let SaleToday = [];
    this.state.dataTodayMenuSell.map(item => {
      SaleToday.push({
        key: item.name,
        data: item.quantity
      });
    });
    console.log("Sale Today", SaleToday);

    // console.log("TODAY INCOME", this.state.dataTodayMenuSell);

    const categoryData = [
      {
        key: "2012",
        data: 12
      },
      {
        key: "IDS",
        data: 14
      },
      {
        key: "Malware",
        data: 5
      },
      {
        key: "DLP",
        data: 18
      }
    ];

    // let dataChart = [];
    // this.state.dataTodayMenuSell.map(item => {
    //   dataChart.push({
    //     key: item.created_at,
    //     data: item.price
    //   });
    //   console.log("datacart", dataChart);
    // });

    // this.setState(prevState => ({
    //   chartData: [...prevState.chartData, newChart]
    // }));

    // this.setState( ({
    // chartData: prevState.chartData["key"].push(item.created_at)
    // }));

    return (
      <div>
        {this.props.loading ? (
          <Row>
            <Col span={22}>
              <div
                style={{
                  paddingLeft: "9%",
                  paddingTop: "5%",
                  paddingRight: "5%"
                }}
              >
                <Skeleton active />
              </div>
            </Col>
          </Row>
        ) : (
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
                <Meta
                  title="Today's Income"
                  description={`RP. ${this.formatNumber(totalIncomeDay)}`}
                />
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
                <Meta
                  title="Orders"
                  description={`${this.formatNumber(orderTotal)} Orders`}
                />
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
                <Meta
                  title="This Years Income"
                  description={`RP. ${this.formatNumber(totalIncomeYear)}`}
                />
              </Card>
            </Col>
          </Row>
        )}
        {this.props.loading ? null : (
          <Row style={{ paddingTop: "5%" }}>
            <Col span={2}></Col>
            <center>
              <Col span={20}>
                <div className="container">
                  <BarChart width={500} height={250} data={SaleToday} />
                </div>
                <Title level={4}>Sale's today</Title>
              </Col>
            </center>
            {/* <Col span={24} style={{  backgroundColor: "#e1e6e8" }} ></Col> */}
          </Row>
        )}
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
          {this.props.loading ? (
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
              style={
                {
                  // minHeight: "110vh"
                }
              }
            >
              {currentPost.length > 0 ? (
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
                          <td data-column="Transaction Code">
                            {item.transaction_code}
                          </td>
                          <td data-column="Cashier">{item.cashier}</td>
                          <td data-column="Date">
                            {dateFormat(item.created_at)}
                          </td>
                          <td data-column="Orders" style={{ maxWidth: 300 }}>
                            {this.props.dataTransactionMenu.map(
                              (data, index) => {
                                if (
                                  data.transaction_code ===
                                  item.transaction_code
                                )
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
                              }
                            )}
                            {/* <Tag color="cyan">cyan</Tag> */}
                          </td>
                          <td data-column="Amount">
                            Rp. {this.formatNumber(item.total)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <center>
                  <img
                    style={{ paddingTop: "5%" }}
                    src="https://demo.hydroweb.id/themes/pijamasworld/img/ic_notfound.png"
                  />
                </center>
              )}
            </Col>
          )}
          <center>
            <div
              style={{
                // position: "absolute",
                bottom: "10px",
                margin: "auto",
                left: 0,
                right: 0
              }}
            >
              <Pagination
                currentPage={this.state.currentPage}
                totalPosts={this.props.dataTransaction.length}
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

// chartData() {
//   let dataChart;
//   this.state.dataTodayMenuSell.map(item => {
//     dataChart = {
//       key: item.created_at,
//       data: item.price
//     };
//     console.log(dataChart);

//     // this.setState(prevState => ({
//     //   chartData: [...prevState.chartData, newChart]
//     // }));

//     // this.setState( ({
//     // chartData: prevState.chartData["key"].push(item.created_at)
//     // }));
//   });
// }

// getTodaysIncome() {}

// formatDate(date) {
//   var today = date;
//   let dateformat =
//     today.getDate() +
//     "/" +
//     parseInt(today.getMonth() + 1) +
//     "/" +
//     today.getFullYear();
//   // console.log("today", date);
//   return dateformat;
// }

// getHHHH() {
//   console.log("OKE");
//   let newObject;
//   this.state.dataTransaction.map(item => {
//     let orders;
//     this.state.dataTransactionMenu.map(data => {
//       if (item.code_transaction === data.code_transaction)
//         // console.log(data.name);
//         orders.push(data.name);
//     });
//     // this.setState({
//     //   dataTransaction: this.state.dataTransaction.concat(orders)
//     // });
//     newObject = {
//       ...this.state.dataTransaction,
//       orders: orders
//     };
//   });
//   console.log("yes", newObject);
// }

// getHistory() {
//   setTimeout(() => {
//     Axios.get("http://localhost:6660/api/transaction")
//       .then(res => {
//         this.setState({
//           dataTransaction: res.data.response,
//           loading: false
//         });
//         // console.log(this.state.menuItem);
//       })
//       .then(() => {
//         Axios.get("http://localhost:6660/api/transaction/menu")
//           .then(res => {
//             this.setState({
//               dataTransactionMenu: res.data.response,
//               loading: false
//             });
//             // console.log(this.state.menuItem);
//           })
//           .catch(error => {
//             console.log(error);
//             this.setState({
//               dataTransactionMenu: [],
//               loading: false
//             });
//           });
//       })
//       .catch(error => {
//         console.log(error);
//         this.setState({
//           dataTransaction: [],
//           loading: false
//         });
//       });
//   }, 500);
// }

// getRandomColor() {
//   var letters = "0123456789ABCDEF";
//   var color = "#";
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
