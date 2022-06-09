import React, { useState } from 'react'
import 'assets/css/login/login.css';
import LoginService from 'services/LoginService';

export default function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useState("");
    const changeUsername = (event) => {
        setUsername(event.target.value);
    };
    const changePassword = (event) => {
        setPassword(event.target.value);    
    };
    const login = (e) => {
        e.preventDefault();
        let loginRequest = {username, password}
        console.log("LOGIN: " + loginRequest.username +" " +loginRequest.password)
        LoginService.login(loginRequest)
        .then((res) => {
          
          let token = res.data.tokenType +" "+ res.data.accessToken ;
          setJwt(token);
          console.log(token)
          sessionStorage.setItem('jwt', token);
          props.history.push('/admin/dashboard')
          window.location.reload();
        })
        .catch(function (error) {
          if (error.response.data.errors) {
            alert(error.response.data.errors[0].defaultMessage);
          } else {
            alert(error.response.data.message);
          }
        });
    }
    return (
        <div className="body-login-form">
            <div className="form-login">
                <div className="title-login">
                    <img src={require('../../assets/img/logo.png')} style={{width: "25%", marginTop:"10px", maginBottom:"10px"}} /><br />
                    <span className="title">Đăng nhập vào cửa hàng của bạn</span>
                </div>
                <div className="content-login">
                    <div className="form">

                        <label>Tên đăng nhập</label><br />
                        <input type="text" onChange={changeUsername} placeholder="Nhập tên đăng nhập" />
                    </div>
                    <div className="form">
                        <label>Mật khẩu</label><br />
                        <input type="password" onChange={changePassword} placeholder="Nhập tên đăng nhập" />
                    </div>
                </div>
                <button className="buton-login" onClick={login}>Đăng nhập</button>
            </div>
        </div>
    )
}
