/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import MaterialService from "../../services/materialService";
import "../../assets/css/materials/updateMaterial.css";
import {NavigateBefore} from "@material-ui/icons";
import Snackbars from 'components/Snackbar/Snackbar.js';


function UpdateMaterial(props) {
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
  const [quantity, setQuantity] = useState("");
  const [outputPrice, setOutputPrice] = useState("");
  const [inputPrice, setInputPrice] = useState("");


  // eslint-disable-next-line react/prop-types
  const [id, setId] = useState(props.match.params.id);

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };
  const changeSupplier = (event) => {
    setSupplier(event.target.value);
  };
  const changeOutputPrice = (event) => {
    setOutputPrice(event.target.value);
    console.log("changeInputPrice: " +event.target.value)
  };
  const changeInputPrice = (event) => {
    setInputPrice(event.target.value);
    console.log("changeInputPrice: " +event.target.value)
  };



  const updateMaterial = (e) => {
    e.preventDefault();
    let material = { name,description,supplier, quantity,inputPrice ,outputPrice};
    console.log("material => " + JSON.stringify(material));
    MaterialService.updateMaterial(id, material)
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

  useEffect(() => {
    MaterialService.getMaterialId(id).then((res) => {
      let material = res.data;
      console.log(material);

      setName(material.name);
      setDescription(material.description);
      setSupplier(material.supplier);
      setQuantity(material.quantity);
      setOutputPrice(material.outputPrice);
      setInputPrice(material.inputPrice);
    });
  }, []);


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
        <button className="button-add" onClick={updateMaterial}>
          Lưu
        </button>
      </div>

      <div className="add-new-material">
        <div className="title">
          <span>Sửa thông tin phụ tùng</span>
        </div>
        <div className="card-body">
          <form>
            <div className="group">
              <div className="group-main">
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
                    placeholder="Thêm mô tả"
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
                  <label>Số lượng </label>
                  <br />
                  <input
                    placeholder="Điền số lượng"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Giá nhập <span style={{color: 'red'}}> *</span> </label>
                  <br />
                  <input
                    placeholder="Điền giá nhập vào"
                    name="inputPrice"
                    className="form-control"
                    value={inputPrice}
                    onChange={changeInputPrice}
                  />
                </div>
                <div className="form-group">
                  <label>Giá bán <span style={{color: 'red'}}> *</span> </label>
                  <br />
                  <input
                    placeholder="Điền giá bán ra"
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
export default UpdateMaterial;
