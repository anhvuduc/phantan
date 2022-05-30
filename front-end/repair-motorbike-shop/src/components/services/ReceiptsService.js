/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const RECEIPTS_API_URL_1 = "http://localhost:8080/api/admin/receipts";

const postReceipt = (receipt) => {
    return axios.post(RECEIPTS_API_URL_1, receipt);
};
const getReceipt = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(RECEIPTS_API_URL_1 +`/list?${paramsString}` ,filters);
}

const getReceiptById = (id) => {
    return axios.get(RECEIPTS_API_URL_1 +`/detail/${id}`);
}

export default {
    postReceipt,
    getReceipt,
    getReceiptById
};
