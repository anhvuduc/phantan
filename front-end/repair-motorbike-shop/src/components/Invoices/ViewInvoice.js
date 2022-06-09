/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "../../assets/css/invoices/ViewInvoice.css";
import InvoicesService from "services/InvoicesService";
import InvoiceSearch from "components/FiltersForm/InvoiceSearch";
import { Search } from '@material-ui/icons';
import '../../assets/css/search/InvoiceSearch.css'
import {showPrice} from "../../helper/function";
import CustomerService from "services/CustomerService";
import Snackbars from 'components/Snackbar/Snackbar.js';
import '../../assets/css/invoices/InvoiceMaterialSearch.css'
import MaterialService from "services/materialService";
import ServicesService from "services/ServicesService";
import '../../assets/css/invoices/InvoiceServiceSearch.css'
import { sum } from "chartist";

function ViewInvoice(props) {
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
    const [id, setId] = useState(props.match.params.id);
    const [tl, setTl] = React.useState(false);
    const [listCustomerClass, setListCustomerClass] = useState('');
    const [showInfoCustomer, setShowInfoCustomer] = useState('');
    const [modalCustomerClass, setModalCustomerClass] = useState('');
    const [customers, setCustomers] = useState([]);
    const [listCustomerVehicleClass,  setListCustomerVehicleClass] = useState('');
    const [showInfoCustomerVehicle, setShowInfoCustomerVehicle] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [vehicle, setVehicle] = useState({
        id: 0,
        code: '',
        licensePlate: ''
    });
    const [employee, setEmployee] = useState({
        id: 0,
        code: '',
        name: '',
        phone: ''
    });
    const [materialChoose, setMaterialChoose] = useState([]);
    const [listMaterial, setListMaterial] = useState('');
    const [materitals, setMaterials] = useState([]);
    const [sumMaterial, setSumMaterial] = useState(0);

    const [serviceChoose, setServiceChoose] = useState([]);
    const [listService, setListService] = useState('');
    const [services, setServices] = useState([]);
    const [sumServices, setSumServices] = useState(0);
    const [status, setStatus] = useState('');


    const [noteInvoice, setNoteInvoice] = useState('');
    const [payMethod, setPayMethod] = useState();
    const [customer, setCustomer] = useState({
        id: 0,
        code: '',
        name: '',
        phone: '',
        licensePlate: ''
    });

    const [name, setName] = useState();
    const [licensePlate, setLicensePlate] = useState();
    const [phone, setPhone] = useState();

    //Lấy thông tin hóa đơn
    useEffect(() => {
        async function fetchInvoice() {
            try {
                InvoicesService.getInvoiceById(id).then((res) => {
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
                    console.log(res.data);
                    setStatus(res.data.status)
                    setCustomer(customer);
                    setVehicle(vehicle);
                    setMaterialChoose(materials)
                    setEmployee(res.data.userDTO);
                    setServiceChoose(services)
                    setNoteInvoice(res.data.note)
                    setPayMethod(res.data.payMethod)
                    let currentSumMaterial = 0;
                    materials.map((material) => {
                        if (material.status !== 'Từ chối') {
                            currentSumMaterial = currentSumMaterial + material.quantityBuy * material.outputPrice;
                        }
                    })
                    setSumMaterial(currentSumMaterial)
                    let currentSumService = 0;
                    services.map((service) => {
                        if (service.status !== 'Từ chối') {
                            currentSumService = currentSumService + service.price;
                        }
                    })
                    setSumServices(currentSumService)
                });

            } catch (error) {
                console.log("Failed to fetch Invoicce: ", error.message);
            }
        }
        fetchInvoice();
    }, []);

    //Lấy list khách hàng
    useEffect(() => {
        async function fetchCustomerList() {
            try {
                CustomerService.getListCustomer().then((res) => {
                    let customers = res.data;
                    console.log(res.data);
                    setCustomers(
                        customers.map((customer) => {
                            return {
                                id: customer.id,
                                code: customer.code,
                                name: customer.name,
                                phone: customer.phone,
                                
                            }
                        }))

                });

            } catch (error) {
                console.log("Failed to fetch Customer list: ", error.message);
            }
        }
        fetchCustomerList();
    }, []);

    //Lấy list Phụ kiện
    useEffect(() => {
        async function fetchMaterialList() {
            try {
                MaterialService.getListMaterial().then((res) => {
                    let materitals = res.data;
                    console.log(res.data);
                    setMaterials(
                        materitals.map((materital) => {
                            return {
                                id: materital.id,
                                code: materital.code,
                                name: materital.name,
                                outputPrice: materital.outputPrice,
                                quantity: materital.quantity,
                                quantityBuy: 1,
                                status: status,
                            }
                        }))
                });

            } catch (error) {
                console.log("Failed to fetch material list: ", error.message);
            }
        }
        fetchMaterialList();
    }, []);

    //Lấy list dịch vụ
    useEffect(() => {
        async function fetchServiceList() {
            try {
                ServicesService.getListService().then((res) => {
                    let servicesData = res.data;
                    console.log(res.data);
                    setServices(
                        servicesData.map((service) => {
                            return {
                                id: service.id,
                                code: service.code,
                                name: service.name,
                                description: service.description,
                                price: service.price,
                                status: status,
                            }
                        }))
                    console.log(" dịch vụ : " + servicesData + " : " + services)
                });

            } catch (error) {
                console.log("Failed to fetch Service list: ", error.message);
            }
        }
        fetchServiceList();
    }, []);

    const showListCustomer = () => {
        if (listCustomerClass == '') {
            setListCustomerClass('info-customers');
        } else {
            setListCustomerClass('')
        }
    }

    const outFormAddCustomer = () => {
        if (modalCustomerClass == '') {
            setModalCustomerClass('modal-customer');
        } else {
            setModalCustomerClass('')
        }
    }

    const back = () => {
        props.history.push('/admin/invoices');
    }

    const showListMaterial = () => {
        if (listMaterial == '') {
            setListMaterial('info-material');
        } else {
            setListMaterial('');
        }

    }

    function checkMaterial(material, materials) {
        var a = 1;
        for (var i = 0; i < materials.length; i++) {
            if (material.id === materials[i].id) {
                return a;
            }
            a++;
        }
        return 0;
    }

    const chooseMaterial = (material) => {
        setListMaterial('');
        if (material.quantity === 0) {
            return alert("Phụ kiện đã hết!")
        } else {
            let materials = materialChoose;
            if (materials.length > 0) {
                let check = checkMaterial(material, materials);
                if (check !== 0) {
                    var material1 = {
                        id: materials[check - 1].id,
                        code: materials[check - 1].code,
                        name: materials[check - 1].name,
                        outputPrice: materials[check - 1].outputPrice,
                        quantity: materials[check - 1].quantity,
                        quantityBuy: materials[check - 1].quantityBuy + 1,
                    }
                    materials[check - 1] = material1;

                } else {
                    materials.push(material);
                }
            } else {
                materials.push(material)
            }
            let currentSumMaterial = 0;
            materials.map((data) => {
                currentSumMaterial += data.quantityBuy * data.outputPrice;
            })
            setSumMaterial(currentSumMaterial);
            setMaterialChoose(materials);
        }

    }

    // Dịch vụ
    function checkService(service, services) {
        var a = 1;
        for (var i = 0; i < services.length; i++) {
            if (service.id === services[i].id) {
                console.log("i : " + a)
                return a;
            }
            a++;
        }
        return 0;
    }


    const chooseService = (service) => {
        setListMaterial('');
        let services = serviceChoose;
        if (services.length > 0) {
            let check = checkService(service, services);
            if (check !== 0) {
                var service1 = {
                    id: services[check - 1].id,
                    code: services[check - 1].code,
                    name: services[check - 1].name,
                    price: services[check - 1].price,
                }
                services[check - 1] = service1;

            } else {
                services.push(service);
            }
        } else {
            services.push(service)
        }
        let currentSum = 0;
        serviceChoose.map((service) => {
            currentSum += service.price;
        })
        setSumServices(currentSum);
    }

    //Hàm xác nhận
    const agree = (e) => {
        e.preventDefault();
        let agreement = true
        let statusInovice = { agreement }
        console.log("Choose :" + agreement)
        InvoicesService.changeStatusInvoice(id, statusInovice)
            .then(() => {
                props.history.push("/admin/invoices");
            })
            .catch(function (error) {
                if (error.response.data.status == 403) {
                    alert("Không có quyền truy cập!")
                  }
                if (error.response.data.errors) {
                    console.log(error.response.data.errors[0].defaultMessage);
                } else {
                    console.log(error.response.data.message);
                }
            });
    };

    //Hàm từ chối
    const disagree = (e) => {
        e.preventDefault();
        let agreement = false
        let statusInovice = { agreement }
        console.log("Choose :" + statusInovice.agreement)
        InvoicesService.changeStatusInvoice(id, statusInovice)
            .then(() => {
                props.history.push("/admin/invoices");
            })
            .catch(function (error) {
                if (error.response.data.status == 403) {
                    alert("Không có quyền truy cập!")
                  }
                if (error.response.data.errors) {
                    console.log(error.response.data.errors[0].defaultMessage);
                } else {
                    console.log(error.response.data.message);
                }
            });
    };

    const changePayMethod = (e) => {
        setPayMethod(e.target.value);
    }
    const changeNote = (e) => {
        setNoteInvoice(e.target.value);
    }
    const changeName = (e) => {
        setName(e.target.value);
    }
    const changePhone = (e) => {
        setPhone(e.target.value);
    }
    const changeLicensePlate = (e) => {
        setLicensePlate(e.target.value);
    }
    const colorStatus = (status) => {
        if (status.localeCompare("Từ chối") == 0) {
            return <span style={{ color: "red" }}>{status}</span>
        } else if (status.localeCompare("Đang xét duyệt") == 0) {
            return <span style={{ color: "blue" }}>{status}</span>
        } else {
            return <span style={{ color: "green" }}>{status}</span>
        }
    }

    return (
        <div className="body-view-invoice">
            <Snackbars
                place="tc"
                color="info"
                message="Thành công!"
                open={tl}
                closeNotification={() => setTl(false)}
                close
            />
            <div className="title-add-invoice">
                <div className="left-title-add-invoice">
                    <div className="back"><button className="cancel-button" onClick={back}><span>&lsaquo; </span>Quay lại</button></div>
                    <div className="name-page" ><span>Phiếu sửa chữa</span> <span style={{ fontSize: "13px", color: "#008aff" }}>({status})</span></div>
                </div>
                <div className="right-title-add-invoice">
                    <button id="btn-back" onClick={disagree}>Không duyệt</button>
                    <button className="btn-add" onClick={agree}>Duyệt</button>
                </div>
            </div>
            <div className="content-add-invoice">
                <div className="top-invoice">
                    <div className="title-customer"><span>Thông tin khách hàng</span></div>
                    <div className="content-customer">
                        <div className="search-customer" >
                            <form>
                                <div className="search-invoice">
                                    <Search className="icon-search" />
                                    <input
                                        type="text"
                                        onClick={showListCustomer}
                                        placeholder="Tìm kiếm theo biển số xe"
                                        disabled
                                    />
                                </div>
                            </form>
                            <div id="info-customers" className={listCustomerClass}>
                                <div className="license-plate" ><span className="button-add-customers">+ Thêm Khách Hàng</span></div>

                            </div>
                            <div id="info-license-plate" className={showInfoCustomer} style={{ display: "block" }}>
                                <div className="info" >
                                    <div className="table" >
                                        <table>
                                            <tr>
                                                <th>Biển số</th>
                                                <td>:</td>
                                                <td>{vehicle.licensePlate}</td>
                                            </tr>
                                        
                                        </table>
                                    </div>
                                    <div className="delete-license"><span></span></div>
                                </div>
                            </div>
                            
                        </div>
                        <div id="search-customer-vehicle" style={{display:"block"}} >
                            <form>
                                <div className="search-invoice">
                                    <Search className="icon-search" />
                                    <input
                                        type="text"
                                        disabled
                                        
                                        placeholder="Tìm kiếm theo tên"
                                    />
                                </div>
                            </form>
                            <div id="info-customer-vehicle" className={listCustomerVehicleClass}>
                                <div className="license-plate"><span className="button-add-customers">+ Thêm khách hàng</span></div>
                                {customers.map((customer) => (
                                    <div key={customer.id} >
                                        <div className="license-plate">
                                            <table>
                                                <tr>
                                                    <td><span>{customer.name}</span> </td>
                                                    <td><span>{customer.phone}</span></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div id="info-customer" className={showInfoCustomerVehicle} style={{display:"block"}}>
                                <div className="info" >
                                    <div className="table" >
                                        <table>
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
                                    <div className="delete-license"><span></span></div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
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
                            <div id="info-name" style={{ display: "block" }}>
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
                                    <div className="delete-name"><span ></span></div>
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
                                                onClick={showListMaterial}
                                                placeholder="Tìm kiếm tên sản phẩm, mã ..."
                                                disabled
                                            />
                                            <div className="choose-materials"><span>Chọn</span></div>
                                        </div>
                                    </form>
                                    <div id="info-material" className={listMaterial}>
                                        {materitals.map((materital) => (
                                            <div key={materital.id}>
                                                <div className="info-detail" onClick={() => chooseMaterial(materital)}>
                                                    <table>
                                                        <tr>
                                                            <td className="td-1">{materital.name}</td>
                                                            <td className="td-2">{showPrice(materital.outputPrice).toString()}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-1">{materital.code}</td>
                                                            <td className="td-2">Có thể bán: {materital.quantity}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                        {services.map((service) => (
                                            <div key={service.id}>
                                                <div className="info-detail" onClick={() => chooseService(service)}>
                                                    <table>
                                                        <tr>
                                                            <td className="td-1">{service.name}</td>
                                                            <td className="td-2">{showPrice(service.price).toString()}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="td-1">{service.code}</td>
                                                            <td className="td-2">Đang hoạt động</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
                                                <td className="th-5"><span>Trạng thái</span></td>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {materialChoose.map((materital) => (
                                                <tr key={materital.id}>
                                                    <td className="td-1"><span>{materital.code}</span></td>
                                                    <td className="td-2"><span>{materital.name}</span></td>
                                                    <td className="td-3"><span>{materital.quantityBuy}</span></td>
                                                    <td className="td-4"><span>{showPrice(materital.outputPrice).toString()}</span></td>
                                                    <td className="td-5">{colorStatus(materital.status)}</td>

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
                                                    <td className="td-5">{colorStatus(service.status)}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="bottom-content">
                                <div className="total">
                                    <table>
                                        <tr>
                                            <th>Tổng tạm tính: </th>
                                            <td>{showPrice(sumMaterial + sumServices).toString()}</td>
                                        </tr>
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
                            <textarea placeholder="Thông tin thêm về đơn hàng" name="noteInvoice" value={noteInvoice} onChange={changeNote} />
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
                                            <input type="radio" name="payMethod" onChange={changePayMethod} value="1" />
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
                                        <td className="total-td">{showPrice(sumMaterial + sumServices).toString()}</td>
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
export default ViewInvoice;
