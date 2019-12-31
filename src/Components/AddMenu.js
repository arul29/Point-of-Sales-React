import React from "react";
import { Modal, Button, Row, Col, Input, Upload, Icon } from "antd";
import { Typography } from "antd";
import { Select } from "antd";
import Axios from "axios";
import Swal from "sweetalert2";

const { Option } = Select;
const { Title } = Typography;
class AddMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleInputMenu = this.handleInputMenu.bind(this);
    this.state = {
      loading: false,
      visible: false,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      name: "",
      price: "",
      category: "",
      img: "",
      handlingInput: null
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  // handleOk = () => {
  //   this.setState({ loading: true });
  //   setTimeout(() => {
  //     this.setState({ loading: false, visible: false });
  //   }, 3000);
  // };

  handleCancel = () => {
    this.setState({
      visible: false,
      previewVisible: false,
      handlingInput: null,
      // Reset form data
      fileList: [],
      name: "",
      price: "",
      category: "",
      img: ""
      // Reset form data
    });
  };

  // handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  handleUpload = ({ fileList }) => {
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj
    console.log("fileList", fileList);
    // you store them in state, so that you can make a http req with them later
    this.setState({ fileList });
  };

  handleChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeCategory(value) {
    this.setState({
      category: value
    });
  }

  handleInputMenu() {
    if (this.state.name === "") {
      this.setState({ handlingInput: "* Name Cannot Empty" });
    } else if (this.state.price === "") {
      this.setState({ handlingInput: "* Price Cannot Empty" });
    } else if (this.state.category === "") {
      this.setState({ handlingInput: "* Category Cannot Empty" });
    } else if (this.state.fileList.length === 0 && this.state.img === "") {
      this.setState({ handlingInput: "* Image Cannot Empty" });
    } else {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 3000);
      const menuNew = new FormData();
      menuNew.append("name", this.state.name);
      menuNew.append("price", this.state.price);
      menuNew.append("category", this.state.category);
      if (this.state.fileList.length > 0)
        menuNew.append("img", this.state.fileList[0].originFileObj);
      else menuNew.append("img", this.state.img);
      console.log("menu new", menuNew);

      Axios.post("http://localhost:6660/api/menu", menuNew)
        .then(() => {
          Swal.fire("Added Success", "Menu has ben added", "success").then(
            () => {
              // this.props.getMenuData();
              document.location.href = "/";
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  render() {
    const { visible, loading } = this.state;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        {/* <Icon type="photo" /> */}
        <Icon style={{ fontSize: 30 }} type="picture" theme="twoTone" />
        {/* <div className="ant-upload-text">Upload</div> */}
      </div>
    );
    return (
      <div>
        <Modal
          visible={visible}
          title="Add Menu"
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleInputMenu}
            >
              Add
            </Button>,
            <p style={{ fontSize: 13, color: "red", float: "left" }}>
              {this.state.handlingInput}
            </p>
          ]}
        >
          <Row>
            <Col span={8}>
              <Title level={3}>Name</Title>
            </Col>
            <Col span={16}>
              <Input
                value={this.state.name}
                name="name"
                onChange={this.handleChangeInput}
                placeholder="Input Name"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Title level={3}>Price</Title>
            </Col>
            <Col span={16}>
              <Input
                value={this.state.price}
                type="number"
                name="price"
                min={1}
                onChange={this.handleChangeInput}
                placeholder="Input Price"
                style={{ width: "100%" }}
              />
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
          <Row>
            <Col span={8}>
              <Title level={3}>Image</Title>
              <Title level={4}>(Choose One)</Title>
            </Col>
            <Col span={16}>
              <Upload
                disabled={this.state.img === "" ? false : true}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleUpload}
                beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
              >
                {uploadButton}
              </Upload>
              <Input
                value={this.state.img}
                disabled={this.state.fileList.length > 0 ? true : false}
                type="text"
                name="img"
                onChange={this.handleChangeInput}
                placeholder="Input URL Img"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default AddMenu;
