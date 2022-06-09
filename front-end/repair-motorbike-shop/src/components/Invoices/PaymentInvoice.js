/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "../../assets/css/invoices/PaymentInvoice.css";
import InvoicesService from "services/InvoicesService";
import { Search } from '@material-ui/icons';
import '../../assets/css/search/InvoiceSearch.css'
import EmployeeService from "services/EmployeeService";
import '../../assets/css/invoices/InvoiceMaterialSearch.css'
import {showPrice} from "../../helper/function";
import '../../assets/css/invoices/InvoiceServiceSearch.css'

function PaymentInvoice(props) {
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
    const [listCustomerVehicleClass,  setListCustomerVehicleClass] = useState('');
    const [showInfoCustomerVehicle, setShowInfoCustomerVehicle] = useState('');
 
    const [id, setId] = useState(props.match.params.id);
    const [showInfoCustomer, setShowInfoCustomer] = useState('');
    const [showInfoEmployee, setShowInfoEmployee] = useState('');

    const [btnClass, setBtnClass] = useState('');
    const [materialChoose, setMaterialChoose] = useState([]);
    const [sumMaterial, setSumMaterial] = useState(0);

    const [serviceChoose, setServiceChoose] = useState([]);
    const [sumServices, setSumServices] = useState(0);
    const [status, setStatus] =  useState('');

    const [noteInvoice, setNoteInvoice] = useState('');
    const [payMethod, setPayMethod]  = useState();
    const [customer, setCustomer] = useState({
        id: 0,
        code: '',
        name: '',
        phone: '',
    });

    const [employee, setEmployee] = useState({
        id: 0,
        code: '',
        name: '',
        phone: ''
    });
    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState({
        id: 0,
        code: '',
        licensePlate: ''
    });

    //Lấy thông tin hóa đơn
    useEffect(() => {
        async function fetchInvoice() {
            try {
                InvoicesService.getInvoiceById(id).then((res) => {
                    console.log("invoice => " +res.data)
                    let customer = {
                        id: res.data.customerVehicleDTO.customerDTO.id,
                        code: res.data.customerVehicleDTO.customerDTO.code,
                        name: res.data.customerVehicleDTO.customerDTO.name,
                        phone: res.data.customerVehicleDTO.customerDTO.phone,
                    };
                    let vehicle ={
                        id: res.data.customerVehicleDTO.vehicleDTO.id,
                        code: res.data.customerVehicleDTO.vehicleDTO.code,
                        licensePlate: res.data.customerVehicleDTO.vehicleDTO.licensePlate,
                    }
                    let materials = res.data.materialOrderResponseDTOS;
                    let services = res.data.serviceOrderResponseDTOS;
                    let employee = res.data.userDTO;
                    console.log(res.data);
                    setStatus(res.data.status)
                    setCustomer(customer);
                    setVehicle(vehicle);
                    setEmployee(employee);
                    setMaterialChoose(materials)
                    setServiceChoose(services)
                    setNoteInvoice(res.data.note)
                    setPayMethod(res.data.payMethod)
                    if(res.data.status.localeCompare("Chờ thanh toán") == 0){
                        setBtnClass('btn-pay')
                    }
                    let currentSumMaterial = 0;
                    materials.map((material) => {
                        currentSumMaterial = currentSumMaterial + material.quantityBuy * material.outputPrice ;
                    })
                    setSumMaterial(currentSumMaterial)


                    let currentSumService = 0;
                    services.map((service) => {
                        currentSumService = currentSumService+ service.price ;
                    })
                    setSumServices(currentSumService)
                });
            
            } catch (error) {
                console.log("Failed to fetch Invoicce: ", error.message);
            }
        }
        fetchInvoice();
    }, []);

    const back = () => {
        props.history.push('/admin/invoices/payment');
    }

    //Hàm thanh toán
    const payment = (e) => {
        e.preventDefault();
        if(customer.id == 0){
            alert("Không được để trống khách hàng")
        }
      
        let materialDTOS = [];
        let serviceDTOS = [];
        let invoice = { 
            fixerId: employee.id,
            vehicleId: vehicle.id,
            customerId: customer.id,
            note: noteInvoice,
            total: sumMaterial+sumServices,
            payMethod: payMethod,
            materialDTOS: materialDTOS,
            serviceDTOS: serviceDTOS,
        }
        InvoicesService.changeStatusInvoiceToCompletePayment(id, invoice)
            .then(() => {
                props.history.push("/admin/invoices/payment");
            })
            .catch(function (error) {
                if (error.response.data.errors) {
                    console.log(error.response.data.errors[0].defaultMessage);
                } else {
                    console.log(error.response.data.message);
                }
            });
    };

    const changePayMethod = (e) =>{
        setPayMethod(e.target.value);
    }
    const changeNote = (e) =>{
        setNoteInvoice(e.target.value);
    }


    return (
        <div className="body-payment-invoice">
            <div className="title-add-invoice">
                <div className="left-title-add-invoice">
                    <div className="back"><button className="cancel-button" onClick={back}><span>&lsaquo; </span>Quay lại</button></div>
                    <div className="name-page" ><span>Thanh toán phiếu sửa chữa</span> <span style={{fontSize : "13px", color:"#008aff"}}>({status})</span></div>
                </div>
                <div className="right-title-add-invoice">
                    <button id="btn-pay" className={btnClass} style={{marginLeft:"-30px"}} onClick={payment} >Thanh toán</button>
                </div>
            </div>
            <div className="content-add-invoice">

            <div className="top-right-invoice">
                    <div className="title-employee"><span>Thông tin nhân viên sửa chữa</span></div>
                    <div className="content-employees">
                        <div className="search-employee" >
                            <form>
                                <div className="search-invoice">
                                    <Search className="icon-search" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm theo tên nhân viên"
                                        disabled
                                    />
                                </div>
                            </form>
                            <div id="info-name" className={showInfoEmployee} style={{display:"block"}}>
                                <div className="info" >
                                    <div className="table" >
                                        <table>
                                            <tr>
                                                <th>Tên</th>
                                                <td>:</td>
                                                <td>{employee.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Số điện thoại</th>
                                                <td>:</td>
                                                <td>{employee.phone}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="top-left-invoice">
                    <div className="title-customer"><span>Thông tin khách hàng</span></div>
                    <div className="content-customer">
                        <div className="search-customer" >
                            <form>
                                <div className="search-invoice">
                                    <Search className="icon-search" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm theo biển số xe"
                                        disabled
                                    />
                                </div>
                            </form>
                            <div id="info-license-plate" className={showInfoCustomer}  style={{display:"block"}}>
                                <div className="info" >
                                    <div className="table" >
                                        <table>
                                            <tr>
                                                <th>Biển số</th>
                                                <td>:</td>
                                                <td>{vehicle.licensePlate}</td>
                                            </tr>
                                            <tr>
                                                <th>Tên</th>
                                                <td>:</td>
                                                <td>{customer.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Số điện thoại</th>
                                                <td>:</td>
                                                <td>{customer.phone}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-invoice">
                    <div className="left-invoice">
                        <div className="title-material">
                            <div className="name-title">
                                <span>Thông tin phụ kiện và dịch vụ</span>
                            </div>
                        </div>
                        <div className="content-material">
                            <div className="top-content">
                                <div className="search-material">
                                    <form>
                                        <div className="search-invoice">
                                            <Search className="icon-search" />
                                            <input
                                                type="text"
                                                placeholder="Tìm kiếm tên sản phẩm, mã ..."
                                                disabled
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="main-content">
                                <div className="table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td className="th-1"><span>Mã phụ kiện, dịch vụ</span></td>
                                                <td className="th-2"><span>Tên phụ kiện</span></td>
                                                <td className="th-3"><span>Số lượng</span></td>
                                                <td className="th-4"><span>Thành tiền</span></td>
                                                <td className="th-5"></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {materialChoose.map((materital) => (
                                                <tr key={materital.id}>
                                                    <td className="td-1"><span>{materital.code}</span></td>
                                                    <td className="td-2"><span>{materital.name}</span></td>
                                                    <td className="td-3"><span>{materital.quantityBuy}</span></td>
                                                    <td className="td-4"><span>{showPrice(materital.outputPrice).toString()}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tbody>
                                            {serviceChoose.map((service) => (
                                                <tr key={service.id}>
                                                    <td className="td-1"><span>{service.code}</span></td>
                                                    <td className="td-2"><span>{service.name}</span></td>
                                                    <td className="td-3"><span>1</span></td>
                                                    <td className="td-4"><span>{showPrice(service.price).toString()}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="bottom-content">
                                <div className="total">
                                    <table>
                                        {/* <tr>
                                            <th>Tổng tạm tính: </th>
                                            <td>{showPrice(sumMaterial+ sumServices).toString()}</td>
                                        </tr> */}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="bottom-invoice">
                    <div className="left-invoice">
                        <div className="note-invoice">
                            <label>Ghi chú</label><br />
                            <textarea placeholder="Thông tin thêm về đơn hàng" name="noteInvoice" value={noteInvoice} onChange={changeNote}/>
                        </div>
                    </div>
                    <div className="right-invoice">
                        <div className="title-right-invoice">
                            <span>Thanh Toán</span>
                        </div>
                        <div className="content-pay-invoice">

                            <div className="pay-method">
                                <div className="title-pay-method">
                                    <span>Xác nhận thanh toán</span>
                                </div>
                                <div className="content-pay-method">
                                    <form>
                                        <div className="pay-method-group">
                                            <input type="radio" name="payMethod" value="1" onChange={changePayMethod} checked/>
                                            <label>Thanh toán tiền mặt</label>
                                        </div>
                                        <div className="pay-method-group">
                                            <input type="radio" name="payMethod" value="2" onChange={changePayMethod} />
                                            <label>Thanh toán chuyển khoản</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="total-pay">
                                <table>
                                    <tr>
                                        <th style={{ color: "#008aff" }}>Tổng tiền phụ kiện ({materialChoose.length} sản phẩm)</th>
                                        <td>:</td>
                                        <td>{showPrice(sumMaterial).toString()}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ color: "#008aff" }}>Tổng tiền dịch vụ ({serviceChoose.length} dịch vụ)</th>
                                        <td>:</td>
                                        <td>{showPrice(sumServices).toString()}</td>
                                    </tr>
                                    <tr className="total">
                                        <th>Tổng tiền thanh toán</th>
                                        <td>:</td>
                                        <td className="total-td">{showPrice(sumMaterial+ sumServices).toString()}</td>
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
export default PaymentInvoice;
