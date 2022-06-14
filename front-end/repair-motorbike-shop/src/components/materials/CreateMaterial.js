/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import MaterialService from "../../services/materialService.js";
import "../../assets/css/materials/createMaterial.css";
import {NavigateBefore} from "@material-ui/icons";
import Snackbars from 'components/Snackbar/Snackbar.js';

function CreateMaterial(props) {
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setTl of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  const [message, setMessage] = useState('');
  const [tl, setTl] = React.useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [outputPrice, setOutputPrice] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState("");

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };
  const changeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const changeSupplier = (event) => {
    setSupplier(event.target.value);
  };
  const changeOutputPrice = (event) => {
    setOutputPrice(event.target.value);
  };
  const changeInputPrice = (event) => {
    setInputPrice(event.target.value);
  };
  const changeStatus = (event) => {
    setStatus(event.target.value);
  };

  //tạo phụ tùng mới
  const saveMaterial = (e) => {
    e.preventDefault();

    let material = { name, description,supplier, quantity , inputPrice , outputPrice, status};
    console.log("material => " + JSON.stringify(material));
    MaterialService.postMaterial(material)
    .then(() => {
        props.history.push("/admin/materials");
    })
    .catch(function (error) {
        if (error.response.data.errors) {
          setMessage(error.response.data.errors[0].defaultMessage)
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setTl(false)
            },
            3000
          );
        } else {
          setMessage(error.response.data.message)
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setTl(false)
            },
            3000
          );
        }
    });
  };


  const cancel = () => {
    props.history.push("/admin/materials");
  };

  return (
    <div className="body">
      <Snackbars
        place="tc"
        color="warning"
        message={message}
        open={tl}
        closeNotification={() => setTl(false)}
        close
      />
      <div className="title-materials">
        <div
          className="button-cancel"
          onClick={cancel}
        >
          <NavigateBefore style={{ width: "15px" }} /> <span>Quay lại</span>
        </div>
        <button className="button-add" onClick={saveMaterial}>
          Lưu
        </button>
      </div>

      <div className="add-new-materials">
        <div className="title">
          <span>Thêm phụ tùng mới</span>
        </div>
        <div className="card-body">
          <form>
            <div className="group">
              <div className="group-right">
                <div className="form-group">
                  <label>Tên phụ tùng <span style={{color: 'red'}}> *</span> </label>
                  <br />
                  <input
                    placeholder="Tên phụ tùng"
                    name="name"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={changeName}
                  />
                </div>
                <div className="form-group">
                  <label>Mô tả </label>
                  <br />
                  <input
                    placeholder="Điền mô tả của phụ tùng"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={changeDescription}
                  />
                </div>
                
                <div className="form-group">
                  <label>Nhà cung cấp </label>
                  <br />
                  <input
                    placeholder="Điền nhà cung cấp"
                    name="supplier"
                    className="form-control"
                    value={supplier}
                    onChange={changeSupplier}
                  />
                </div>
                <div className="form-group">
                  <label>Số lượng</label>
                  <br />
                  <input
                    placeholder="Điền số lượng của phụ tùng"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={changeQuantity}
                  />
                </div>
                <div className="form-group">
                  <label>Giá nhập <span style={{color: 'red'}}> *</span> </label>
                  <br />
                  <input
                    placeholder="Điền giá nhập"
                    name="inputPrice"
                    className="form-control"
                    value={inputPrice}
                    onChange={changeInputPrice}
                  />
                </div>
                <div className="form-group">
                  <label>Giá bán <span style={{color: 'red'}}> *</span></label>
                  <br />
                  <input
                    placeholder="Điền giá bán"
                    name="outputPrice"
                    className="form-control"
                    value={outputPrice}
                    onChange={changeOutputPrice}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateMaterial;
