/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const SERVICES_API_URL = "http://localhost:8080/api/services";
const SERVICES_API_URL_1 = "http://localhost:8080/api/admin/services";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;

const getAllServiceStillServing = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(SERVICES_API_URL +  `/still-serving?${paramsString}`, filters);
}


const getServiceId = (id) => {
    return axios.get(SERVICES_API_URL + "/" + `${id}`);
};

const getListService = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(SERVICES_API_URL_1 + `/list?${paramsString}`,filters);
};

const getListServiceStillServing = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(SERVICES_API_URL_1 + `/list/still-serving?${paramsString}`,filters);
}

const getListServiceStopServing = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(SERVICES_API_URL_1 + `/list/stop-serving?${paramsString}`,filters);
}

const postService = (service) => {
    return axios.post(SERVICES_API_URL_1, service);
};

  
const updateService = (id, service) => {
    return axios.put(SERVICES_API_URL_1 + "/" + `${id}`, service);
};

const putServiceToStopServing = (id) => {
    return axios.put(SERVICES_API_URL_1 + "/stop-serving/" + `${id}`); 
};

const putServiceToStillServing = (id) => {
    return axios.put(SERVICES_API_URL_1 + "/still-serving/" + `${id}`); 
};

const deleteService = (id) => {
    return axios.put(SERVICES_API_URL_1 + "/delete/" + `${id}`);
};


export default {
    getListService,
    getAllServiceStillServing,
    getListServiceStillServing,
    getListServiceStopServing,
    getServiceId,
    postService,
    updateService,
    putServiceToStopServing,
    putServiceToStillServing,
    deleteService
};