/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const VEHICLE_API_URL = "http://localhost:8080/api/vehicles";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;


const getListVehicle = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(VEHICLE_API_URL + `?${paramsString}`, filters);
};

const listVehiclePagination = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(VEHICLE_API_URL + `/list?${paramsString}`, filters);
};

export default {
    getListVehicle,
    listVehiclePagination
};