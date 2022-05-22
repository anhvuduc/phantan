/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const MATERIALS_API_URL = "http://localhost:8080/api/admin/materials";
const MATERIALS_API_URL_1 = "http://localhost:8080/api/materials";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;

const postMaterial = (material) => {
  return axios.post(MATERIALS_API_URL, material);

};
const getMaterialId = (materialId) => {
  return axios.get(MATERIALS_API_URL + "/" + materialId);
};

const getAllMaterial = (filters) => {
  const paramsString = queryString.stringify(filters);
  return axios.get(MATERIALS_API_URL + `/list?${paramsString}`,filters);
};

const updateMaterial = (id, material) => {
  return axios.put(MATERIALS_API_URL + "/" + `${id}`, material);
};
const postMaterialDTO = (material) =>{
  return axios.post(MATERIALS_API_URL+ "/receipt", material);
}
const getListMaterial = (filters) => {
  const paramsString = queryString.stringify(filters);
  return axios.get(MATERIALS_API_URL_1 +`?${paramsString}`,filters);
};

const deleteMaterial = (id) => {
  return axios.put(MATERIALS_API_URL + "/delete/" + `${id}`);
};



export default {
  getListMaterial,
  postMaterial,
  getAllMaterial,
  getMaterialId,
  updateMaterial,
  postMaterialDTO,
  deleteMaterial
};
