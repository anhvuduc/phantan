/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const EMPLOYEES_API_URL = "http://localhost:8080/api/admin/time-sheet";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;

const getListTimesheet = (filters) => {
  const paramsString = queryString.stringify(filters);
  return axios.get(EMPLOYEES_API_URL + `/list?${paramsString}`,filters);
};

const postTimesheet = (month) => {
  return axios.post(EMPLOYEES_API_URL, month);
};
const putWorkTimesheet = (ids) => {
  return axios.put(EMPLOYEES_API_URL + "/work", ids);
};
const putWorkLateTimesheet = (ids) => {
  return axios.put(EMPLOYEES_API_URL + "/work-late", ids);
};
const putStatusTimesheet = (ids) => {
  return axios.put(EMPLOYEES_API_URL + "/status", ids);
};
const getTimesheetById = (id) => {
  return axios.get(EMPLOYEES_API_URL + "/" +id);
};
const putTimesheet = (id, timesheet) => {
  return axios.put(EMPLOYEES_API_URL + "/" +id, timesheet);
};
const postTimesheetExcel = (month) => {
  return axios.post(EMPLOYEES_API_URL + "/download",{responseType : 'blob'}, month);
};

export default {
  postTimesheet,
  putWorkTimesheet,
  putWorkLateTimesheet,
  putStatusTimesheet,
  putTimesheet,
  getTimesheetById,
  postTimesheetExcel,
  getListTimesheet
};
