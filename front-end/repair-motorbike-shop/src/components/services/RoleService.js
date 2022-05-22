/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const ROLES_API_URL = "http://localhost:8080/api/admin/roles";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;
const getRoleUsing = () => {
  return axios.get(ROLES_API_URL + "/status");
};
const getRoleById = (id) => {
  return axios.get(ROLES_API_URL + `/${id}`);
};
const postRoles = (role) => {
  return axios.post(ROLES_API_URL, role);
}
const putRole = (role, id) =>{
  return axios.put(ROLES_API_URL + `/${id}`, role);
}
const getRoles = (filters) => {
  const paramsString = queryString.stringify(filters);
  return axios.get(ROLES_API_URL + `/list?${paramsString}`,filters);
}
const getPermissionUsing = () => {
  return axios.get(ROLES_API_URL + "/permissions");
};
const postPermission = (permission) =>{
  return axios.post(ROLES_API_URL + "/permissions", permission);
}
const deletePermission = (id) =>{
  return axios.put(ROLES_API_URL + "/permissions/status", id);
}

export default {
  getRoleUsing,
  postRoles,
  getRoles,
  getPermissionUsing,
  postPermission,
  deletePermission,
  getRoleById,
  putRole
};