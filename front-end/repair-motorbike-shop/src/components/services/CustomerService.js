/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const CUSTOMERS_API_URL = "http://localhost:8080/api/customers";
const VEHICLE_CUSTOMER_API_URL = "http://localhost:8080/api/vehicle-customer"
let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;

const getListCustomer = (filtersCustomer) => {
    const paramsString = queryString.stringify(filtersCustomer);
    return axios.get(CUSTOMERS_API_URL + `?${paramsString}`, filtersCustomer);
};
const getListCustomers = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(CUSTOMERS_API_URL + `/list-customers?${paramsString}`, filters);
};
const postCustomer = (customer) => {
    return axios.post(CUSTOMERS_API_URL, customer);
};
const postCustomerNoVehicle = (customer) => {
    return axios.post(CUSTOMERS_API_URL +"/new", customer);
};
const postCustomerByVehicle = (customerVehicleDTO) =>{
    return axios.post(CUSTOMERS_API_URL +"/vehicle", customerVehicleDTO);
}
const postCustomerAndVehicle = (vehicleCustomerDTORequest) =>{
    return axios.post(VEHICLE_CUSTOMER_API_URL, vehicleCustomerDTORequest);
}


export default {
    getListCustomer,
    postCustomer,
    postCustomerByVehicle,
    postCustomerAndVehicle,
    getListCustomers,
    postCustomerNoVehicle

};