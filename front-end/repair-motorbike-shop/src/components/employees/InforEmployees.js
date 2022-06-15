/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import EmployeesService from "../../services/employees.js";
import "../../assets/css/employees/updateEmployee.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons
import Person from "@material-ui/icons/Person";
import { ArrowDropDown, NavigateBefore, NavigateBeforeSharp, NavigateNext, NextWeek, People, SkipNext } from "@material-ui/icons";
import Snackbars from 'components/Snackbar/Snackbar.js';


function InfoEmployees(props) {
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
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState();
  const [code, setCode] = useState("");
  const [sex, setSex] = useState();
  const [idCard, setIdCart] = useState("");
  const [salaryDay, setSalaryDay] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [username, setUsername] = useState("");
  // eslint-disable-next-line react/prop-types
  const [id, setId] = useState(props.match.params.id);

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeAddress = (event) => {
    setAddress(event.target.value);
  };
  const changePhone = (event) => {
    setPhone(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changeStatus = (event) => {
    console.log(event.target.checked)
    if (event.target.checked == 1) {
      setStatus(1)
    } else {
      setStatus(2)
    }

  }

  const updateEmployee = (e) => {
    e.preventDefault();
    let employee = { name, address, phone, email, status };
    console.log("employee => " + JSON.stringify(employee));
    EmployeesService.updateEmployee(id, employee)
      .then(() => {
        props.history.push("/admin/employees");
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
    EmployeesService.getEmployeeById(id).then((res) => {
      let user = res.data;
      console.log(user);
      setName(user.name);
      setCode(user.code);
      setSex(user.sex);
      setPhone(user.phone);
      setEmail(user.email);
      setAddress(user.address);
      setStatus(user.status);
      setUsername(user.username);
      setSalaryDay(user.salaryDay)
      setCreateDate(user.createDate)
    });
  }, []);

  const checkStatus = status => {
    if (status == 1) {
      return <input type="checkbox" checked name="status" value={status} onChange={changeStatus} />
    } else {
      return <input type="checkbox" name="status" value={status} onChange={changeStatus} />
    }
  }
  const cancel = () => {
    props.history.push("/admin/employees");
  };

  return (
    <div className="body-edit-employees">
      <Snackbars
        place="tc"
        color="warning"
        message={message}
        open={tl}
        closeNotification={() => setTl(false)}
        close
      />
      <div className="title-employees">
        <div
          className="button-cancel"
          onClick={cancel}
        >
          <NavigateBefore style={{ width: "15px" }} /> <span>Quay lại</span>
        </div>
        <button className="button-add" onClick={updateEmployee}>
          Lưu
        </button>
      </div>
      <div className="top">
        <div className="add-edit-employee">
          <div className="title">
            <span>Sửa thông tin nhân viên</span>
          </div>
          <div className="card-body">
            <form>
              <div className="group">
                <div className="group-main">
                  <div className="form-group">
                    <label>Tên nhân viên<span style={{color: "red"}}>*</span> : </label>
                    <br />
                    <input
                      placeholder="Tên nhân viên"
                      name="name"
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={changeName}
                    />
                  </div>
                  <div className="form-group">
                    <label>Địa chỉ: </label>
                    <br />
                    <input
                      placeholder="Điền địa chỉ ở hiện tại của nhân viên"
                      name="address"
                      className="form-control"
                      value={address}
                      onChange={changeAddress}
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại<span style={{color: "red"}}>*</span>: </label>
                    <br />
                    <input
                      placeholder="Điền số điện thoại của nhân viên"
                      name="phone"
                      className="form-control"
                      value={phone}
                      onChange={changePhone}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email: </label>
                    <br />
                    <input
                      placeholder="Điền địa chỉ email của nhân viên"
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={changeEmail}
                    />
                  </div>
                  <div>
                    {checkStatus(status)} 
                    <label>Đang làm việc</label>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
        <div className="info-employee">
          <div className="title">
            <span className="span-1">Thông tin nhân viên</span><br />
            <span className="span-2">Các thông tin cơ bản của nhân viên</span>
          </div>
          <div className="content">
            <div className="info-group">
              <label>Mã nhân viên:</label><br />
              <input type="text" className="info-detail" value={code} disabled />
            </div>
            <div className="info-group">
              <label>Tên đăng nhập:</label><br />
              <input type="text" className="info-detail" value={username} disabled />
            </div>
            <div className="info-group">
              <label>Lương nv:</label><br />
              <input type="text" className="info-detail" value={salaryDay} disabled />
            </div>
            <div className="info-group">
              <label>Ngày Tạo:</label><br />
              <input type="text" className="info-detail" value={createDate} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InfoEmployees;
