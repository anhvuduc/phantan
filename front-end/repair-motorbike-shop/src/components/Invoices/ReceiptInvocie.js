/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "../../assets/css/invoices/EditInvoice.css";
import InvoicesService from "services/InvoicesService";
import InvoiceSearch from "components/FiltersForm/InvoiceSearch";
import { Search } from '@material-ui/icons';
import '../../assets/css/search/InvoiceSearch.css'
import CustomerService from "services/CustomerService";
import Snackbars from 'components/Snackbar/Snackbar.js';
import '../../assets/css/invoices/InvoiceMaterialSearch.css'
import MaterialService from "services/materialService";
import ServicesService from "services/ServicesService";
import EmployeeService from "services/EmployeeService";
import '../../assets/css/invoices/InvoiceServiceSearch.css'

export default function ReceiptInvocie(props) {
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

    const [materialList, setMaterialList] = useState([]);
    const [materialChoose, setMaterialChoose] = useState([]);
    const [listMaterial, setListMaterial] = useState('');
    const [materitals, setMaterials] = useState([]);
    const [sumMaterial, setSumMaterial] = useState(0);

    const [serviceList, setServiceList] = useState([]);
    const [serviceChoose, setServiceChoose] = useState([]);
    const [listService, setListService] = useState('');
    const [services, setServices] = useState([]);
    const [sumServices, setSumServices] = useState(0);
    const [status, setStatus] = useState('');

    const [listEmployeeClass, setListEmployeeClass] = useState('');
    const [showInfoEmployee, setShowInfoEmployee] = useState('');
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({
        id: 0,
        code: '',
        name: '',
        phone: ''
    });
    const [noteInvoice, setNoteInvoice] = useState('');
    const [payMethod, setPayMethod] = useState();
    const [customer, setCustomer] = useState({
        id: 0,
        code: '',
        name: '',
        phone: '',
        licensePlate: ''
    });
    const [disabled, setDisabled] = useState(true)

    const [name, setName] = useState();
    const [licensePlate, setLicensePlate] = useState();
    const [phone, setPhone] = useState();

    //Employee
    const showListEmployee = () => {
        if (listEmployeeClass == '') {
            setListEmployeeClass('info-employees');
        } else {
            setListEmployeeClass('')
        }
    }
    const deleteEmployee = () => {
        setShowInfoEmployee('')
    }

    const chooseEmployee = (employee) => {
        setEmployee(employee);
        setListEmployeeClass('')
        setShowInfoEmployee('info-name')
    }

    //Lấy thông tin hóa đơn
    useEffect(() => {
        async function fetchInvoice() {
            try {
                InvoicesService.getInvoiceById(id).then((res) => {
                    let customer = {
                        id: res.data.customerDTO.id,
                        code: res.data.customerDTO.code,
                        name: res.data.customerDTO.phone,
                        licensePlate: res.data.customerDTO.licensePlate,
                    };
                    let materials = res.data.materialOrderResponseDTOS;
                    let services = res.data.serviceOrderResponseDTOS;
                    console.log(res.data);
                    setStatus(res.data.status)
                    setCustomer(customer);

                    if (res.data.userDTO.id == 0) {
                        setDisabled(false)
                    }
                    setEmployee(res.data.userDTO);

                    setMaterialChoose(materials)
                    setServiceChoose(services)
                    setNoteInvoice(res.data.note)
                    setPayMethod(res.data.payMethod)
                    let currentSumMaterial = 0;
                    materials.map((material) => {
                        currentSumMaterial = currentSumMaterial + material.quantityBuy * material.outputPrice;
                    })
                    setSumMaterial(currentSumMaterial)


                    let currentSumService = 0;
                    services.map((service) => {
                        currentSumService = currentSumService + service.price;
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
                                licensePlate: customer.licensePlate,
                            }
                        }))

                });

            } catch (error) {
                console.log("Failed to fetch Customer list: ", error.message);
            }
        }
        fetchCustomerList();
    }, []);
    //Lấy list thợ sửa đang rảnh
    useEffect(() => {
        async function fetchEmployeeList() {
            try {
                EmployeeService.getListEmployeeReady().then((res) => {
                    let employees = res.data;
                    console.log(res.data);
                    setEmployees(
                        employees.map((employee) => {
                            return {
                                id: employee.id,
                                code: employee.code,
                                name: employee.name,
                                phone: employee.phone
                            }
                        }))

                });

            } catch (error) {
                console.log("Failed to fetch Employee list: ", error.message);
            }
        }
        fetchEmployeeList();
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
                                materialOrderId: 0,
                                code: materital.code,
                                name: materital.name,
                                outputPrice: materital.outputPrice,
                                quantity: materital.quantity,
                                quantityBuy: 1,
                            }
                        }))
                });
                console.log(materitals)

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
                                serviceOrderId: 0,
                                code: service.code,
                                name: service.name,
                                description: service.description,
                                price: service.price,
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
    const formAddCustomer = () => {
        if (modalCustomerClass == '') {
            setModalCustomerClass('modal-customer');
            setListCustomerClass('')
        } else {
            setModalCustomerClass('')
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

    const chooseCustomer = (customer) => {
        setCustomer(customer);
        setListCustomerClass('')
        setShowInfoCustomer('info-license-plate')
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
                        materialOrderId: materials[check - 1].id,
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

    const deleteMaterialChoosed = (material) => {
        let materials = materialChoose;

        let check = checkMaterial(material, materials);
        let materialRemaining = [];
        for (var i = 0; i < materials.length; i++) {
            if ((check - 1) !== i) {
                materialRemaining.push(materials[i]);
            }
        }
        setMaterialChoose(materialRemaining);
        let currentSum = sumMaterial;
        currentSum = currentSum - (material.quantityBuy * material.outputPrice);
        setSumMaterial(currentSum);
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
    const showListService = () => {
        setListService('info-service');
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
                    status: services[check - 1].status,
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

    const deleteServiceChoosed = (service) => {
        let check = checkService(service, serviceChoose);
        let servicesRemaining = [];
        for (var i = 0; i < serviceChoose.length; i++) {
            if ((check - 1) !== i) {
                servicesRemaining.push(serviceChoose[i]);
            }
        }
        setServiceChoose(servicesRemaining);
        let currentSum = sumServices;
        currentSum = currentSum - service.price;
        setSumServices(currentSum);
    }

    //Hàm thêm đơn hàng mới
    const editInvoice = (e) => {
        e.preventDefault();
        if (customer.id == 0) {
            alert("Không được để trống khách hàng")
        }
        let materialDTOS = [];
        materialChoose.map((material) => {
            let material1 = {
                id: material.id,
                quantity: material.quantityBuy,
                materialOrderId: material.materialOrderId
            }
            materialDTOS.push(material1)
        })
        let serviceDTOS = [];
        serviceChoose.map((service) => {
            let service1 = {
                id: service.id,
                serviceOrderId: service.serviceOrderId
            }
            serviceDTOS.push(service1)
        })
        let invoice = {
            customerId: customer.id,
            note: noteInvoice,
            payMethod,
            total: (sumMaterial + sumServices),
            materialDTOS,
            serviceDTOS
        };
        console.log("invoice => " + JSON.stringify(invoice));
        InvoicesService.putInvoice(id, invoice)
            .then(() => {
                setTl(true);
                // use this to make the notification autoclose
                setTimeout(
                    function () {
                        setTl(false)
                    },
                    3000
                );
                props.history.push("/admin/invoices");
            })
            .catch(function (error) {
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

    //Hàm thêm khách hàng mới
    const addCustomer = (e) => {
        e.preventDefault();

        let customer = { name, phone, licensePlate };

        CustomerService.postCustomer(customer)
            .then(() => {
                setTl(true);
                // use this to make the notification autoclose
                setTimeout(
                    function () {
                        setTl(false)
                    },
                    3000
                );
                window.location.reload();
            })
            .catch(function (error) {
                if (error.response.data.errors) {
                    alert(error.response.data.errors[0].defaultMessage);
                } else {
                    alert(error.response.data.message);
                }
            });
    };

    const showStatus = (status) => {
        if (status == null) {
            return <span>Chờ xét duyệt</span>
        } else {
            return <span>{status}</span>
        }
    }

    return (
        <div>
            <div className="body-edit-invoice">
                <div className="title-add-invoice">
                    <div className="left-title-add-invoice">
                        <div className="back"><button className="cancel-button" onClick={back}><span>&lsaquo; </span>Quay lại</button></div>
                        <div className="name-page" ><span>Phiếu sửa chữa</span> <span style={{ fontSize: "13px", color: "#008aff" }}>({status})</span></div>
                    </div>
                    <div className="right-title-add-invoice">
                        <button className="btn-add" onClick={editInvoice}>Sửa</button>
                    </div>
                </div>
                <div className="content-add-invoice">
                    <div className="top-left-invoice">
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
                                    <div className="license-plate" onClick={formAddCustomer}><span className="button-add-customers">+ Thêm Khách Hàng</span></div>
                                    {customers.map((customer) => (
                                        <div key={customer.id} >
                                            <div className="license-plate" onClick={() => chooseCustomer(customer)}><span>{customer.licensePlate}</span></div>
                                        </div>
                                    ))}
                                </div>
                                <div id="info-license-plate" className={showInfoCustomer} style={{ display: "block" }}>
                                    <div className="info" >
                                        <div className="table" >
                                            <table>
                                                <tr>
                                                    <th>Biển số</th>
                                                    <td>:</td>
                                                    <td>{customer.licensePlate}</td>
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
                                        <div className="delete-license"><span></span></div>
                                    </div>
                                </div>
                                <div id="modal-customer" className={modalCustomerClass}>
                                    <div id="add-customer">
                                        <div className="title-add-customer">
                                            <div className="name-title"><span>Thêm mới khách hàng</span></div>
                                            <div className="close-form-add-customer"><span onClick={outFormAddCustomer}>&Chi;</span></div>
                                        </div>
                                        <div className="content-add-customer">
                                            <form>
                                                <div className="form-group-top">
                                                    <div className="form-group">
                                                        <label>Họ Tên</label><br />
                                                        <input type="text" className="input-customer" name="name" onChange={changeName} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Số điện thoại</label><br />
                                                        <input type="text" className="input-customer" name="phone" onChange={changePhone} />
                                                    </div>
                                                </div>
                                                <div className="form-group-bot">
                                                    <label>Biển số xe</label><br />
                                                    <input type="text" className="input-customer" name="licensePlate" onChange={changeLicensePlate} />
                                                </div>
                                            </form>

                                            <div className="button-add-customer">
                                                <button className="btn-add" onClick={addCustomer}>Thêm</button>
                                                <div className="btn-out" onClick={outFormAddCustomer}><span>Thoát</span></div>
                                            </div>
                                        </div>
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
                                            onClick={showListEmployee}
                                            placeholder="Tìm kiếm theo tên nhân viên"
                                            disabled={disabled}
                                        />
                                    </div>
                                </form>
                                <div id="info-employees" className={listEmployeeClass} >
                                    {employees.map((employee) => (
                                        <div key={employee.id} >
                                            <div className="name" onClick={() => chooseEmployee(employee)}><span>{employee.name}</span></div>
                                        </div>
                                    ))}
                                </div>
                                <div id="info-name" className={showInfoEmployee} style={{ display: "block" }}>
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
                                        <div className="delete-name"><span onClick={deleteEmployee}></span></div>
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
                                                                <td className="td-2">{materital.outputPrice}</td>
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
                                                                <td className="td-2">{service.price}</td>
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
                                                    <td className="th-6"><span>Trạng thái</span></td>
                                                    <td className="th-5"></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {materialChoose.map((material) => (
                                                    <tr key={material.id}>
                                                        <td className="td-1"><span>{material.code}</span></td>
                                                        <td className="td-2"><span>{material.name}</span></td>
                                                        <td className="td-3"><span>{material.quantityBuy}</span></td>
                                                        <td className="td-4"><span>{material.outputPrice}</span></td>
                                                        <td className="td-6">{showStatus(material.status)}</td>
                                                        <td className="td-5 delete-material"><span onClick={() => deleteMaterialChoosed(material)}>x</span></td>
                                                    </tr>
                                                ))}
                                                {serviceChoose.map((service) => (
                                                    <tr key={service.id}>
                                                        <td className="td-1"><span>{service.code}</span></td>
                                                        <td className="td-2"><span>{service.name}</span></td>
                                                        <td className="td-3"><span>1</span></td>
                                                        <td className="td-4"><span>{service.price}</span></td>
                                                        <td className="td-6">{showStatus(service.status)}</td>
                                                        <td className="td-5 delete-service"><span onClick={() => deleteServiceChoosed(service)}>x</span></td>
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
                                                <td>{sumMaterial + sumServices}</td>
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
                                            <td>{sumMaterial}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ color: "#008aff" }}>Tổng tiền dịch vụ ({serviceChoose.length} dịch vụ)</th>
                                            <td>:</td>
                                            <td>{sumServices}</td>
                                        </tr>
                                        <tr className="total">
                                            <th>Tổng tiền thanh toán</th>
                                            <td>:</td>
                                            <td className="total-td">{sumMaterial + sumServices}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

