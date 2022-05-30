/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;

const EMPLOYEES_API_URL = "http://localhost:8080/api/user";

const getListEmployeeReady = (filters) => {
  const paramsString = queryString.stringify(filters);
  return axios.get(EMPLOYEES_API_URL + `/ready?${paramsString}`, filters);
};

const getListEmployee = () => {
  return axios.get(EMPLOYEES_API_URL);
};

const getEmployeeId = (employeeId) => {
  return axios.get(EMPLOYEES_API_URL + "/" + employeeId);
};
const getStaffById = () => {
  return axios.get(EMPLOYEES_API_URL + "/info");
};



export default {
    getListEmployeeReady,
    getListEmployee,
    getEmployeeId,
    getStaffById
};
