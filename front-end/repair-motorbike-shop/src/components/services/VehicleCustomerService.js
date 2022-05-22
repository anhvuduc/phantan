/* eslint-disable no-unused-vars */
import axios from "axios";

const VehicleCustomer_API_URL = "http://localhost:8080/api/vehicle-customer";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;


const addNewVehicleCustomer = (VehicleCustomerDTORequest) => {
  return axios.post(VehicleCustomer_API_URL, VehicleCustomerDTORequest);
};

const getListCustomerByVehicleId = (vehicleId) => {
    return axios.get(VehicleCustomer_API_URL + "/" + `${vehicleId}`);
};

export default {
    addNewVehicleCustomer,
    getListCustomerByVehicleId
};