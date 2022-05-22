/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const INVOICES_API_URL_1 = "http://localhost:8080/api/admin/invoices";
const INVOICES_API_URL_2 = "http://localhost:8080/api/invoices";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;

const getInvoices = (filters) => {
    const paramsString = queryString.stringify(filters);
    return  axios.get(INVOICES_API_URL_2 +`/list?${paramsString}`, filters);
};
const getInvoiceBuyMaterial = (filters) => {
    const paramsString = queryString.stringify(filters);
    return  axios.get(INVOICES_API_URL_1 +`/list-invoices-material?${paramsString}`, filters);
};
const postInvoice = (invoice) => {
    return axios.post(INVOICES_API_URL_2, invoice);
};
const postInvoiceMaterial = (invoice) => {
    return axios.post(INVOICES_API_URL_2 + "/materials", invoice);
};
const getInvoiceById = (id) => {
    return axios.get(INVOICES_API_URL_2  + "/"+ `${id}`);
};
const getInvoiceConfirmById = (id) => {
    return axios.get(INVOICES_API_URL_2  + "/"+ `${id}`);
};
const putInvoice = (id, invoice) => {
    return axios.put(INVOICES_API_URL_2  + "/"+ `${id}`, invoice);
}
const changeStatusInvoice = (id, agreement) => {
    return axios.put(INVOICES_API_URL_2  + "/status/"+ `${id}`, agreement);
}
const listInvoiceNoFixer = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(INVOICES_API_URL_2  + `/list-invoices-no-fixer?${paramsString}`, filters);
}

const getInvoiceInProcess = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(INVOICES_API_URL_1 +`/list?${paramsString}`, filters);
};

const changeStatusInvoiceToCompletePayment = (id, invoice) => {
    return axios.put(INVOICES_API_URL_1  + "/"+ `${id}`, invoice);
}

const getInvoiceCanDelete = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(INVOICES_API_URL_2 +`/list-can-delete?${paramsString}`, filters);
};

const deleteInvoice = (id) => {
    return axios.put(INVOICES_API_URL_1  + "/delete/"+ `${id}`);
}

const receiptInvoiceByFixer = (id, userId) => {
    return axios.put(INVOICES_API_URL_2  + "/invoices-fixer"+ `${id}`, userId);
}
const confirm = (id) => {
    return axios.put(INVOICES_API_URL_2  + `/status-confirmation/${id}` );
}
const getListInvoiceOfStaff = () => {
    return axios.get(INVOICES_API_URL_2  + "/list/status" );
}
const finish = (id) => {
    return axios.put(INVOICES_API_URL_2  + `/status-finishing/${id}` );
}

const checkMaterial = (checkQuantity) =>{
    const paramsString = queryString.stringify(checkQuantity);
    return axios.get(INVOICES_API_URL_2  +`/comparison?${paramsString}`, checkQuantity );
}

export default {
    getInvoices,
    postInvoice,
    getInvoiceById,
    putInvoice,
    changeStatusInvoice,
    listInvoiceNoFixer,
    getInvoiceInProcess,
    changeStatusInvoiceToCompletePayment,
    getInvoiceCanDelete,
    getInvoiceConfirmById,
    deleteInvoice,
    receiptInvoiceByFixer,
    getListInvoiceOfStaff,
    confirm,
    finish,
    checkMaterial,
    postInvoiceMaterial,
    getInvoiceBuyMaterial
};
