/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const CUSTOMERS_API_URL = "http://localhost:8080/api/customers";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;

const postCustomer = (customer) => {
  return axios.post(CUSTOMERS_API_URL, customer);
};

const getlistCustomer = (filters) => {
  const paramsString = queryString.stringify(filters);
  return  axios.get(CUSTOMERS_API_URL + `/list?${paramsString}`,filters);

}
const getCustomerId = (customerId) => {
  return axios.get(CUSTOMERS_API_URL + "/" + customerId);
};

const updateCustomer = (id, customer) => {
  return axios.put(CUSTOMERS_API_URL + "/" + `${id}`, customer);
};



export default { 
  postCustomer,
  getCustomerId,
  updateCustomer,
  getlistCustomer
};
