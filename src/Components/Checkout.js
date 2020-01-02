import React from "react";
import { Modal, Button, Row, Col, Input } from "antd";
import { Typography } from "antd";
import Axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
const { Title } = Typography;
class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeCashier = this.handleChangeCashier.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.state = {
      loading: false,
      visible: false,
      cashier: ""
    };
  }

  showModal = () => {
    // alert(new Date());
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false, handlingInput: "" });
  };

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  handleCheckout() {
    let codeReceipt = this.props.codeR;
    let cashier = this.state.cashier;
    let checkout = this.props.dataCheckout;
    let ppn = this.props.total * 0.1;
    let total = this.props.total + ppn;
    // let created_at = new Date();
    // let created_at = this.props.date;
    if (this.state.cashier === "")
      this.setState({
        handlingInput: "* Cashier Cannot Empty"
      });
    else {
      // console.log("receipt code:", codeReceipt); console.log("cashier:", cashier); console.log("ppn:", ppn);
      // console.log("total:", total); console.log("created_at:", created_at); console.log("checkout item:", checkout);
      const transactionNew = {
        transaction_code: codeReceipt,
        cashier: cashier,
        total: total,
        ppn: ppn
        // created_at: created_at
      };

      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
        Axios.post("http://localhost:6660/api/transaction", transactionNew)
          .then(() => {
            if (checkout.length > 0) {
              return checkout.map(item => {
                let transactionMenu = {
                  transaction_code: codeReceipt,
                  id_menu: item.id,
                  quantity: item.count,
                  price: item.price
                  // created_at: created_at
                };
                Axios.post(
                  "http://localhost:6660/api/transaction/menu",
                  transactionMenu
                );
              });
            }
          })
          .then(() => {
            Swal.fire(
              "Checkout Success",
              "Transaction has been finished",
              "success"
            ).then(() => {
              document.location.href = "/";
              var doc = new jsPDF();
              let space = 10;
              doc.text(`Receipt Code ${codeReceipt}`, 10, (space += 10));
              doc.text(`Cashier ${cashier}`, 10, (space += 10));
              // doc.text(`Cashier ${cashier}`, 10, 30);
              // if (checkout.length > 0) {
              checkout.map(items => {
                // doc.text(`${items.name} ${items.count}x Rp. ${this.formatNumber(items)}`, 10, 10);
                doc.text(
                  `${items.name} ${items.count}x Rp. ${this.formatNumber(
                    items.price
                  )}`,
                  10,
                  (space += 10)
                );
              });
              // }
              doc.text(
                `Total Rp. ${this.formatNumber(total)}`,
                10,
                (space += 10)
              );
              doc.text(`Payment Cash`, 10, (space += 10));
              doc.save(`${codeReceipt}.pdf`);
            });
          })
          .catch(error => {
            console.log(error);
          });
      }, 3000);
    }
  }

  handleChangeCashier(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  render() {
    let ppn = this.props.total * 0.1;
    let total = this.props.total + ppn;
    let codeReceiptString = this.props.codeR;
    // let codeReceipt = Date.now();
    let checkout = this.props.dataCheckout;
    const { visible, loading } = this.state;
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Open Modal with customized footer
        </Button> */}
        <Modal
          visible={visible}
          title="Checkout"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleCheckout}
            >
              Print
            </Button>,
            <p style={{ fontSize: 13, color: "red", float: "left" }}>
              {this.state.handlingInput}
            </p>
          ]}
        >
          <center>
            <Title level={4}>Receipt code. {codeReceiptString} </Title>
            <Input
              value={this.state.cashier}
              name="cashier"
              onChange={this.handleChangeCashier}
              placeholder="Chasier"
              style={{ width: "62%" }}
            />
          </center>
          {checkout
            .map((item, index) => {
              return (
                <Row>
                  <Col span={16}>
                    <Title level={3}>
                      {item.name} {item.count}x
                    </Title>
                  </Col>
                  <Col span={8}>
                    <Title level={3}>
                      Rp. {this.formatNumber(item.price * item.count)}
                    </Title>
                  </Col>
                </Row>
                // <Title level={4}>Receipt code. {codeReceiptString} </Title>
              );
            })
            .reverse()}
          <Row>
            <Col span={16}>
              <Title level={3}>Ppn 10%</Title>
            </Col>
            <Col span={8}>
              <Title level={3}>Rp. {this.formatNumber(ppn)}</Title>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col span={16}>
              <Title level={3}>Total</Title>
            </Col>
            <Col span={8}>
              <Title level={3}>Rp. {this.formatNumber(total)}</Title>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <Title level={3}>Payment</Title>
            </Col>
            <Col span={8}>
              <Title level={3}>Cash</Title>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Checkout;
