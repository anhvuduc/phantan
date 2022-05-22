/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const EMPLOYEES_API_URL = "http://localhost:8080/api/admin/users";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;

const listEmployees = (filters) =>{
    const paramsString = queryString.stringify(filters);
    return  axios.get(EMPLOYEES_API_URL +`/list?${paramsString}`, filters);
}
const postEmployee = (employee) => {
  return axios.post(EMPLOYEES_API_URL, employee);
};
const getEmployeeById = (employeeId) => {
  return axios.get(EMPLOYEES_API_URL + "/" + employeeId);
};
const updateEmployee = (id, employee) => {
  return axios.put(EMPLOYEES_API_URL + "/" + id, employee);
};
const changeSalaryDay = (id, salaryDay) => {
  const paramsString = queryString.stringify(salaryDay);
  return axios.put(EMPLOYEES_API_URL + "/" + id + `/salary_day?${paramsString}`);
};
const changeStatus = (id) => {
  return axios.put(EMPLOYEES_API_URL +"/" +id + "/status");
};
const createTimeSheets = (timesheets) => {
  return axios.post(EMPLOYEES_API_URL +"/timesheets", timesheets);
};
const deleteEmployee = (id) => {
  return axios.delete(EMPLOYEES_API_URL +"/" +id);
}


export default {
  postEmployee,
  getEmployeeById,
  updateEmployee,
  changeSalaryDay,
  changeStatus,
  createTimeSheets,
  listEmployees,
  deleteEmployee
};
