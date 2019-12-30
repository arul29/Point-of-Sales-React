import React from "react";
import { Modal, Button, Row, Col, Input } from "antd";
import { Typography } from "antd";

const { Title } = Typography;
class Checkout extends React.Component {
  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
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
    this.setState({ visible: false });
  };

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
              onClick={this.handleOk}
            >
              Print
            </Button>
          ]}
        >
          <center>
            <Title level={4}>Receipt code. {codeReceiptString} </Title>
            <Input placeholder="Chasier" style={{ width: "62%" }} />
          </center>
          {checkout.map((item, index) => {
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
          })}
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
