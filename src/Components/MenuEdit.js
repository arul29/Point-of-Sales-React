import React from "react";
import { Modal, Button, Row, Col, Input, Typography, Select } from "antd";
import Axios from "axios";
import Swal from "sweetalert2";

const { Option } = Select;
const { Title } = Typography;
class MenuEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleEditMenu = this.handleEditMenu.bind(this);
    this.handleDeleteMenu = this.handleDeleteMenu.bind(this);
    this.state = {
      loading: false,
      loading2: false,
      visible: false,
      name: "",
      price: "",
      category: "",
      handlingInput: "",
    };
  }

  showModalEdit = (id, name, price, category) => {
    this.setState({
      visible: true,
      id: id,
      name: name,
      price: price,
      category: category,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      previewVisible: false,
      handlingInput: "",
    });
  };

  handleChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleChangeCategory(value) {
    this.setState({
      category: value,
    });
  }

  handleDeleteMenu() {
    let id = this.state.id;
    this.setState({ loading2: true });
    setTimeout(() => {
      this.setState({ loading2: false, visible: false });
      Axios.delete(`https://api-pos.darul.id/api/menu/?id=${id}`)
        .then(() => {
          Swal.fire("Delete Success", "Menu has ben deleted", "success").then(() => {
            document.location.href = "/";
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 3000);
  }

  handleEditMenu() {
    let id = this.state.id;
    if (this.state.name === "") {
      this.setState({ handlingInput: "* Name Cannot Empty" });
    } else if (this.state.price === "" || this.state.price < 1) {
      this.setState({ handlingInput: "* Price Cannot Empty" });
    } else if (this.state.category === "") {
      this.setState({ handlingInput: "* Category Cannot Empty" });
    } else {
      const menuNew = {
        name: this.state.name,
        price: this.state.price,
        category: this.state.category,
      };
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
        Axios.put(`https://api-pos.darul.id/api/menu/?id=${id}`, menuNew)
          .then(() => {
            Swal.fire("Edit Success", "Menu has been edited", "success").then(() => {
              // this.props.getMenuData();
              document.location.href = "/";
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3000);
    }
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  render() {
    const { visible, loading, loading2 } = this.state;
    return (
      <div>
        <Modal
          visible={visible}
          title="Edit Menu"
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleEditMenu}>
              Update
            </Button>,
            <Button style={{ float: "left", marginRight: "1%" }} key="submit" type="danger" loading={loading2} onClick={this.handleDeleteMenu}>
              Delete
            </Button>,
            <p style={{ fontSize: 13, color: "red", float: "left" }}>{this.state.handlingInput}</p>,
          ]}
        >
          <Row>
            <Col span={8}>
              <Title level={3}>Name</Title>
            </Col>
            <Col span={16}>
              <Input value={this.state.name} name="name" onChange={this.handleChangeInput} placeholder="Input Name" style={{ width: "100%" }} />
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Title level={3}>Price</Title>
            </Col>
            <Col span={16}>
              <Input value={this.state.price} type="number" name="price" min={1} onChange={this.handleChangeInput} placeholder="Input Price" style={{ width: "100%" }} />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Title level={3}>Category</Title>
            </Col>
            <Col span={16}>
              <Select
                // name="category"
                value={this.state.category}
                style={{ width: "100%" }}
                onChange={this.handleChangeCategory}
              >
                <Option disabled value="">
                  Select Category
                </Option>
                <Option value="Food">Food</Option>
                <Option value="Beverage">Beverage</Option>
              </Select>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default MenuEdit;
