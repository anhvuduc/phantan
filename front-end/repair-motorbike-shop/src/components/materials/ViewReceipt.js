/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "../../assets/css/materials/ViewReceipt.css";
import ReceiptsService from "services/ReceiptsService";
import { Search } from '@material-ui/icons';
import '../../assets/css/search/ReceiptSearch.css'
import Snackbars from 'components/Snackbar/Snackbar.js';
import '../../assets/css/invoices/InvoiceMaterialSearch.css'
import MaterialService from "services/materialService";
// import ServicesService from "services/ServicesService";
import '../../assets/css/invoices/InvoiceServiceSearch.css'

export default function ViewReceipt(props) {

    React.useEffect(() => {
        // Specify how to clean up after this effect:
        return function cleanup() {
            // to stop the warning of calling setTl of unmounted component
            var id = window.setTimeout(null, 0);
            while (id--) {
                window.clearTimeout(id);
            }
        };
    });
    const [tl, setTl] = React.useState(false);

    const [id, setId] = useState(props.match.params.id);
    const [materialChoose, setMaterialChoose] = useState([]);
    const [listMaterial, setListMaterial] = useState('');
    const [materitals, setMaterials] = useState([]);

    const [receipt, setReceipt] = useState({
        id: 0,
        code: '',
        createDate: '',
        note: '',
        total: '0 đ',
    });
    const [modalMaterialClass, setModalMaterialClass] = useState('');

    //Lấy thông tin hóa đơn
    useEffect(() => {
        async function fetchInvoice() {
            try {
                ReceiptsService.getReceiptById(id).then((res) => {
                    console.log(res.data)
                    let materialChoose = res.data.receiptMaterialResponseDTOs;
                    setMaterialChoose( materialChoose.map((material) => {
                        return {
                            id: material.idMaterial,
                            code: material.code,
                            name: material.name,
                            inputPrice: material.price,
                            quantityInput: material.quantity,
                        }
                    }))
                    let receipt = res.data;
                    setReceipt({
                        id: receipt.id,
                        code: receipt.code,
                        createDate: receipt.createDate,
                        note: receipt.note,
                        total: receipt.total,
                    })
                }).catch(function (error) {
                    console.log("ERROR: " +error.response.data.status)
                    if(error.response.data.status == 403){
                      alert("Không có quyền truy cập!")
                    }
                })
            } catch (error) {
                console.log("Failed to fetch Invoicce: ", error.message);
            }
        }
        fetchInvoice();
    }, []);
    const back = () => {
        props.history.push('/admin/receipts');
    }

    return (
        <div className="body-view-receipt">
            <div className="title-add-receipt">
                <div className="left-title-add-receipt">
                    <div className="back"><button className="cancel-button" onClick={back}><span>&lsaquo; </span>Quay lại</button></div>
                    <div className="name-page" ><span>Tạo phiếu nhập phụ tùng</span></div>
                </div>
                <div className="right-title-add-receipt">
     
                </div>
            </div>
            <div className="content-add-receipt">
                <div className="top-receipt">
                    <div className="title-receipt"><span>Thông tin phiếu nhập phụ kiện</span></div>
                    <div className="info-receipt">
                        <table>
                            <tr>
                                <td>Mã Phiếu</td>
                                <td>:</td>
                                <td>{receipt.code}</td>
                            </tr>
                            <tr>
                                <td>Ngày tạo</td>
                                <td>:</td>
                                <td>{receipt.createDate}</td>
                            </tr>
                            <tr>
                                <td>Người tạo</td>
                                <td>:</td>
                                <td>Quản trị viên</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="main-receipt">
                    <div className="left-receipt">
                        <div className="title-material">
                            <div className="name-title">
                                <span>Thông tin phụ tùng</span>
                            </div>
                        </div>
                        <div className="content-material">
                            <div className="top-content">
                                <div className="search-material">
                                    <form>
                                        <div className="search-receipt">
                                            <Search className="icon-search" />
                                            <input
                                                type="text"
                                                disabled
                                                placeholder="Tìm kiếm tên sản phẩm, mã ..."
                                            />
                                        </div>
                                    </form>
                                    <div id="info-material" className={listMaterial}>
                                        <div className="material" ><span className="button-add-materials">+ Thêm mới phụ kiện</span></div>
                                        {materitals.map((materital) => (
                                            <div key={materital.id}>
                                                <div className="info-detail" >
                                                    <table>
                                                        <tr>
                                                            <td className="td-1">{materital.name}</td>
                                                            <td className="td-2">{materital.inputPrice}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-1">{materital.code}</td>
                                                            <td className="td-2">Số lượng trong kho: {materital.quantity}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div id="modal-material" className={modalMaterialClass}>
                                        <div id="add-material">
                                            <div className="title-add-material">
                                                <div className="name-title"><span>Thêm mới phụ tùng</span></div>
                                                <div className="close-form-add-material"><span>&Chi;</span></div>
                                            </div>
                                            <div className="content-add-material">
                                                <form>
                                                    <div className="form-group-top">
                                                        <div className="form-group">
                                                            <label>Tên phụ tùng</label><span className="attribute" style={{ color: "red" }}>*</span><br />
                                                            <input type="text" className="input-material" name="nameMaterial" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Giá nhập</label><span className="attribute" style={{ color: "red" }}>*</span><br />
                                                            <input type="text" className="input-material" name="inputPrice" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group-top">
                                                        <div className="form-group">
                                                            <label>Nhà cung cấp</label><br />
                                                            <input type="text" className="input-material" name="supplier" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Giá bán</label><br />
                                                            <input type="text" className="input-material" name="outputPrice" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group-bot">
                                                        <label>Mô tả chi tiết</label><br />
                                                        <textarea type="text" className="input-material" name="description" />
                                                    </div>
                                                </form>

                                                <div className="button-add-material">
                                                    <button className="btn-add" >Thêm</button>
                                                    <div className="btn-out" ><span>Thoát</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-content">
                                <div className="table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td className="th-1"><span>Mã</span></td>
                                                <td className="th-2"><span>Tên</span></td>
                                                <td className="th-3"><span>Số lượng</span></td>
                                                <td className="th-4"><span>Giá</span></td>
                                                <td className="th-5"></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {materialChoose.map((materital) => (
                                                <tr key={materital.id}>
                                                    <td className="td-1"><span>{materital.code}</span></td>
                                                    <td className="td-2"><span>{materital.name}</span></td>
                                                    <td className="td-3"><span>{materital.quantityInput}</span></td>
                                                    <td className="td-4"><span>{materital.inputPrice}</span></td>
                                                    <td className="td-5 delete-material"><span></span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="bottom-content">
                                <div className="total">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-receipt">
                    <div className="left-receipt">
                    <div className="note-receipt">
                            <label>Ghi chú</label><br />
                            <textarea placeholder="Thông tin thêm về đơn hàng" name="noteInvoice" value={receipt.note} disabled/>
                        </div>
                    </div>
                    <div className="right-receipt">
                        <div className="title-right-receipt">
                            <span>Thanh Toán</span>
                        </div>
                        <div className="content-pay-receipt">

                            <div className="pay-method">
                                <div className="title-pay-method">
                                    <span>Xác nhận thanh toán</span>
                                </div>
                                <div className="content-pay-method">
                                    <form>
                                        <div className="pay-method-group">
                                            <input type="radio" name="payMethod" value="1" checked disabled/>
                                            <label>Thanh toán tiền mặt</label>
                                        </div>
                                        <div className="pay-method-group">
                                            <input type="radio" name="payMethod" value="2" disabled/>
                                            <label>Thanh toán chuyển khoản</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="total-pay">
                                <table>
                                    <tr>
                                        <th style={{ color: "#008aff" }}>Tổng tiền phụ kiện ({materialChoose.length} phụ kiện)</th>
                                        <td>:</td>
                                        <td>{receipt.total}</td>
                                    </tr>
                                    <tr className="total">
                                        <th>Tổng tiền thanh toán</th>   
                                        <td>:</td>
                                        <td className="total-td">{receipt.total}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
