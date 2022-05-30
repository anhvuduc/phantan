/* eslint-disable no-unused-vars */
import axios from "axios";

const LOGIN_API_URL = "http://localhost:8080/api/auth/login";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;
const login = (loginRequest) => {
  return axios.post(LOGIN_API_URL, loginRequest);
};

export default {
    login,
};
