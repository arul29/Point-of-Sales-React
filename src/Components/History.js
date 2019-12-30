import React, { Component } from "react";
import { Row, Col, Card, Badge, Typography } from "antd";

const { Title } = Typography;

class History extends Component {
  componentDidMount() {
    //jika pindah ke halaman history akan me reset jumlah cart di header
    this.props.parentCallback(0);
  }

  render() {
    return (
      <div>
        <Row>
          <Col
            span={24}
            style={
              {
                //   backgroundColor: "#e1e6e8"
              }
            }
          >
            <center>
              <Row
                style={{
                  paddingTop: "5%",
                  paddingBottom: "2%"
                  // paddingLeft: "5%"
                }}
                gutter={16}
              >
                <Title>INI HISTORYYYY</Title>
              </Row>
            </center>
          </Col>
        </Row>
      </div>
    );
  }
}

export default History;
