import React from "react";
import { Modal, Button, Row, Col, Input, Upload, Icon, Typography } from "antd";
import Axios from "axios";
import Swal from "sweetalert2";

const { Title } = Typography;
class MenuEditImg extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleEditMenuImg = this.handleEditMenuImg.bind(this);
    this.state = {
      loading: false,
      visible: false,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      handlingInput: ""
    };
  }

  showModalEditImg = (id, img) => {
    this.setState({
      visible: true,
      id: id,
      img: "",
      imgPreview: img
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      previewVisible: false,
      handlingInput: "",
      // Reset form data
      fileList: []
      // Reset form data
    });
  };

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

  handleEditMenuImg() {
    let id = this.state.id;
    if (this.state.fileList.length === 0 && this.state.img === "") {
      this.setState({ handlingInput: "* Image Cannot Empty" });
    } else {
      const menuNew = new FormData();
      if (this.state.fileList.length > 0)
        menuNew.append("img", this.state.fileList[0].originFileObj);
      else menuNew.append("img", this.state.img);
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
        Axios.put(
          `https://mypoint-of-sales.herokuapp.com/api/menu/img/${id}`,
          menuNew
        )
          .then(() => {
            Swal.fire(
              "Update Image Success",
              " Image Menu has been edited",
              "success"
            ).then(() => {
              document.location.href = "/";
            });
          })
          .catch(error => {
            console.log(error);
          });
      }, 3000);
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
          title="Edit Menu Img"
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
              onClick={this.handleEditMenuImg}
            >
              Update
            </Button>,
            <p style={{ fontSize: 13, color: "red", float: "left" }}>
              {this.state.handlingInput}
            </p>
          ]}
        >
          <Row>
            <Col>
              <center>
                <img
                  style={{ padding: "2%", borderRadius: 20 }}
                  width="50%"
                  src={this.state.imgPreview}
                />
              </center>
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

export default MenuEditImg;
