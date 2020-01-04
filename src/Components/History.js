import React, { Component } from "react";
import { Row, Col, Card, Typography, Tag, Skeleton, Radio } from "antd";
import "./../Css/History.css";
import dateFormat from "dateformat";
import Pagination from "./Pagination";
import { BarChart } from "reaviz";
const { Title } = Typography;

class History extends Component {
  constructor(props) {
    super(props);
    this.handleChangeChart = this.handleChangeChart.bind(this);
    this.state = {
      currentPage: 1,
      postsPerPage: 10,
      dataTodayIncome: [],
      dataYearsIncome: [],
      dataTodayMenuSell: [],
      dataPoints: [],
      dataYearSale: [],
      dataAllSale: [],
      selectChart: "week"
    };
  }

  componentDidMount() {
    //jika pindah ke halaman history akan me reset jumlah cart di header
    this.props.parentCallback(0);
    this.getTodaysIncome();
    this.getYearsIncome();
    this.getTodaysMenuSell();
    this.getWeeklySales();
    this.getYearlySales();
    this.getAllSales();
  }

  getAllSales() {
    let data = this.props.dataTransaction;
    let dataAll = [];

    for (var i = 0; i < data.length; i++) {
      let Year = new Date(data[i].created_at).toString().substr(11, 4);
      dataAll.push({
        x: Year,
        y: data[i].total
      });
    }
    let arr = dataAll;
    const reducedArray = arr.reduce((acc, next) => {
      // acc stands for accumulator
      const lastItemIndex = acc.length - 1;
      const accHasContent = acc.length >= 1;

      if (accHasContent && acc[lastItemIndex].x === next.x) {
        acc[lastItemIndex].y += next.y;
      } else {
        // first time seeing this entry. add it!
        acc[lastItemIndex + 1] = next;
      }
      return acc;
    }, []);

    this.setState({
      dataAllSale: reducedArray
    });
  }
  getYearlySales() {
    let dateNow = new Date();
    // console.log("detnow", dateNow.toString().substr(11, 4));

    let data = this.props.dataTransaction;
    let dataYear = [];

    data.sort(function(a, b) {
      if (a.created_at < b.created_at) return -1;
      if (a.created_at > b.created_at) return 1;
      return 0;
    });

    for (var i = 0; i < data.length; i++) {
      if (
        dateNow.toString().substr(11, 4) ===
        new Date(data[i].created_at).toString().substr(11, 4)
      ) {
        let Month =
          new Date(data[i].created_at).toString().substr(4, 3) +
          " " +
          new Date(data[i].created_at).toString().substr(11, 4);
        dataYear.push({
          x: Month,
          y: data[i].total
        });
      }
    }

    let arr = dataYear;
    const reducedArray = arr.reduce((acc, next) => {
      // acc stands for accumulator
      const lastItemIndex = acc.length - 1;
      const accHasContent = acc.length >= 1;

      if (accHasContent && acc[lastItemIndex].x === next.x) {
        acc[lastItemIndex].y += next.y;
      } else {
        // first time seeing this entry. add it!
        acc[lastItemIndex + 1] = next;
      }
      return acc;
    }, []);
    // console.log("reduce", reducedArray);
    this.setState({
      dataYearSale: reducedArray
    });
  }

  getWeeklySales() {
    let dateNow = new Date();
    let data = this.props.dataTransaction;
    let dataPoints = [];
    for (var i = 0; i < data.length; i++) {
      // console.log("data[i]", new Date(data[i].created_at).toDateString());
      // this.dateChart(new Date(data[i].created_at)).toString().substr(0, 8)
      // console.log("yessa",new Date(data[i].created_at).toString().substr(0, 15));
      if (
        dateNow.toString().substr(11, 4) ===
        new Date(data[i].created_at).toString().substr(11, 4)
      ) {
        dataPoints.push({
          x: new Date(data[i].created_at).toString().substr(0, 15),
          y: data[i].total
        });
      }
    }
    // console.log("datapoints", dataPoints);
    let arr = dataPoints;
    const reducedArray = arr.reduce((acc, next) => {
      // acc stands for accumulator
      const lastItemIndex = acc.length - 1;
      const accHasContent = acc.length >= 1;

      if (accHasContent && acc[lastItemIndex].x === next.x) {
        acc[lastItemIndex].y += next.y;
      } else {
        // first time seeing this entry. add it!
        acc[lastItemIndex + 1] = next;
      }
      return acc;
    }, []);
    // console.log("reduce", reducedArray);
    this.setState({
      dataPoints: reducedArray
    });
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
    // console.log("ngambil year",dateFormat(dateNow).toString().substring(17, 4).split(" ")[2]);
    let filterTodayTransaction = this.props.dataTransaction;
    filterTodayTransaction = filterTodayTransaction.filter(function(item) {
      return (
        dateFormat(item.created_at)
          .toString()
          .substring(17, 4)
          .split(" ")[2]
          .search(
            dateFormat(dateNow)
              .toString()
              .substring(17, 4)
              .split(" ")[2]
          ) !== -1
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
    // this.setState({ dataTodayMenuSell: filterTodayTransaction });
    let data = filterTodayTransaction;
    data.sort(function(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    let dataSell = [];
    for (var i = 0; i < data.length; i++) {
      dataSell.push({
        x: data[i].name,
        y: data[i].quantity
      });
    }
    // console.log("datapoints", dataPoints);
    let arr = dataSell;
    const reducedArray = arr.reduce((acc, next) => {
      // acc stands for accumulator
      const lastItemIndex = acc.length - 1;
      const accHasContent = acc.length >= 1;

      if (accHasContent && acc[lastItemIndex].x === next.x) {
        acc[lastItemIndex].y += next.y;
      } else {
        // first time seeing this entry. add it!
        acc[lastItemIndex + 1] = next;
      }
      return acc;
    }, []);
    // console.log("reduce", reducedArray);
    this.setState({
      dataTodayMenuSell: reducedArray
    });
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  handleChangeChart(value) {
    this.setState({
      selectChart: value.target.value
      // selectChart:value <---- for Select Option
    });
  }

  render() {
    //today income
    let today = this.state.dataTodayIncome;
    let totalIncomeDay = today.reduce((prev, next) => prev + next.total, 0);
    //total order
    let order = this.props.dataTransactionMenu;
    let orderTotal = order.reduce((prev, next) => prev + next.quantity, 0);
    //this year income
    let year = this.state.dataYearsIncome;
    let totalIncomeYear = year.reduce((prev, next) => prev + next.total, 0);
    //pagination
    const indexOflastpost = this.state.currentPage * this.state.postsPerPage;
    const indexOffirstPost = indexOflastpost - this.state.postsPerPage;
    const currentPost = this.props.dataTransaction.slice(
      indexOffirstPost,
      indexOflastpost
    );

    let Chart = [];
    if (this.state.selectChart === "week") {
      this.state.dataPoints.slice(0, 7).map(item => {
        Chart.push({
          key: item.x,
          data: item.y
        });
      });
    } else if (this.state.selectChart === "year") {
      this.state.dataYearSale.slice(0, 7).map(item => {
        Chart.push({
          key: item.x,
          data: item.y
        });
      });
    } else if (this.state.selectChart === "today") {
      this.state.dataTodayMenuSell.map(item => {
        Chart.push({
          key: item.x,
          data: item.y
        });
      });
    } else {
      this.state.dataAllSale.map(item => {
        Chart.push({
          key: item.x,
          data: item.y
        });
      });
    }

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
        ) : currentPost.length > 0 ? (
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
                {/* <Meta
                  title="Today's Income"
                  // description={`RP. ${this.formatNumber(totalIncomeDay)}`}
                /> */}
                <Title level={4}>Today's Income</Title>
                <Title level={3}>Rp. {this.formatNumber(totalIncomeDay)}</Title>
                <img
                  style={{ position: "absolute", bottom: "35%", left: "70%" }}
                  src="https://image.flaticon.com/icons/svg/1759/1759208.svg"
                  width="50"
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
              >
                <Title level={4}>Order's</Title>
                <Title level={3}>{this.formatNumber(orderTotal)} orders</Title>
                <img
                  style={{ position: "absolute", bottom: "35%", left: "70%" }}
                  src="https://image.flaticon.com/icons/svg/1214/1214966.svg"
                  width="50"
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
              >
                <Title level={4}>This Year's Income</Title>
                <Title level={3}>
                  Rp. {this.formatNumber(totalIncomeYear)}
                </Title>
                <img
                  style={{ position: "absolute", bottom: "35%", left: "70%" }}
                  src="https://image.flaticon.com/icons/svg/1584/1584863.svg"
                  width="50"
                />
              </Card>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {this.props.loading ? null : currentPost.length > 0 ? (
          <Row style={{ paddingTop: "5%" }}>
            <Col span={2}></Col>
            <center>
              <Col span={20}>
                <Radio.Group
                  name="selectChart"
                  onChange={this.handleChangeChart}
                  value={this.state.selectChart}
                >
                  <Radio value="today">Today</Radio>
                  <Radio value="week">Weekly</Radio>
                  <Radio value="year">Yearly</Radio>
                  <Radio value="all">All</Radio>
                </Radio.Group>
                {/* <Select value={this.state.selectChart} style={{ width: "20%" }} onChange={this.handleChangeChart} >
                  <Option value="today">Today</Option> <Option value="week">Weekly</Option> <Option value="year">Yearly</Option> </Select> */}
                <br />
                <div className="container">
                  <BarChart width={500} height={250} data={Chart} />
                </div>
                <Title level={4}>
                  {this.state.selectChart === "week"
                    ? "Last week's sales"
                    : this.state.selectChart === "year"
                    ? "This year's sales"
                    : this.state.selectChart === "today"
                    ? "Today's Sales"
                    : "All Sales"}
                </Title>
              </Col>
            </center>
            {/* <Col span={24} style={{  backgroundColor: "#e1e6e8" }} ></Col> */}
          </Row>
        ) : (
          ""
        )}
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
                        <tr key={index}>
                          <td data-column="Transaction Code">
                            {item.transaction_code}
                          </td>
                          <td data-column="Cashier">{item.cashier}</td>
                          <td data-column="Date">
                            {dateFormat(item.created_at).substr(0, 21)}
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
                                      key={index}
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

// dateChart(date) {
//   return (
//     date.getFullYear().toString() +
//     this.pad2(date.getMonth() + 1) +
//     this.pad2(date.getDate()) +
//     this.pad2(date.getHours()) +
//     this.pad2(date.getMinutes()) +
//     this.pad2(date.getSeconds())
//   );
// }

// pad2(n) {
//   return n < 10 ? "0" + n : n;
// }

// var output = [];
// let array = dataYear;
// let res = array.reduce((acc, obj) => {
//   Object.values(obj).forEach(({ item_id, tag }) => {
//     acc[tag] = acc[tag] || { [tag]: [] };
//     acc[tag][tag].push(item_id);
//   });
//   return acc;
// }, {});
// console.log(Object.values(res));

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

// const categoryData = [
//   {
//     key: "2012",
//     data: 12
//   },
//   {
//     key: "IDS",
//     data: 14
//   },
//   {
//     key: "Malware",
//     data: 5
//   },
//   {
//     key: "DLP",
//     data: 18
//   }
// ];

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
