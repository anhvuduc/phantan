/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/invoices/CreateInvoices.css";
import InvoicesService from "services/InvoicesService";
// eslint-disable-next-line no-unused-vars
import InvoiceSearch from "components/FiltersForm/InvoiceSearch";
import { Filter, Search } from '@material-ui/icons';
import '../../assets/css/search/InvoiceSearch.css'
import CustomerService from "../../services/CustomerService";
import EmployeeService from "services/EmployeeService";
// eslint-disable-next-line no-unused-vars
import Snackbars from 'components/Snackbar/Snackbar.js';
import '../../assets/css/invoices/InvoiceMaterialSearch.css'
import { showPrice } from "../../helper/function";
import MaterialService from "services/materialService.js";
import ServicesService from "../../services/ServicesService";

import '../../assets/css/invoices/InvoiceServiceSearch.css'
import VehicleService from "../../services/VehicleService";

function CreateInvoices(props) {
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
    // eslint-disable-next-line no-unused-vars
    const [tl, setTl] = React.useState(false);
    const [fail, setFail] = React.useState(false);
    const [messageSucsess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const [listCustomerClass, setListCustomerClass] = useState('');
    const [showInfoCustomer, setShowInfoCustomer] = useState('');
    const [modalCustomerClass, setModalCustomerClass] = useState('');
    const [customers, setCustomers] = useState([]);
    const typingTimeoutRef = useRef(null);
    const [listEmployeeClass, setListEmployeeClass] = useState('');
    const [showInfoEmployee, setShowInfoEmployee] = useState('');
    const [employees, setEmployees] = useState([]);
    const [listCustomerVehicleClass, setListCustomerVehicleClass] = useState('');
    const [showInfoCustomerVehicle, setShowInfoCustomerVehicle] = useState('');
    const [materialChoose, setMaterialChoose] = useState([]);
    const [listMaterial, setListMaterial] = useState('');
    const [materitals, setMaterials] = useState([]);
    const [sumMaterial, setSumMaterial] = useState(0);
    const [customerClass, setCustomerClass] = useState('');

    const [filters, setFilters] = useState({
        keyword: "",
    });
    const [filterSum, setFilterSum] = useState({
        sum: 0,
    });
    const [checkQuantity, setCheckQuantity] = useState({
        id: 1,
        quantity: 0,
    });
    const [filtersCustomer, setFiltersCustomer] = useState({
        idVehicle: 1,
        keyword: "",
    });
    const [serviceChoose, setServiceChoose] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [listService, setListService] = useState('');
    const [services, setServices] = useState([]);
    const [sumServices, setSumServices] = useState(0);

    const [noteInvoice, setNoteInvoice] = useState('');
    const [payMethod, setPayMethod] = useState();
    const [customer, setCustomer] = useState({
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

    const [name, setName] = useState();
    const [licensePlate, setLicensePlate] = useState();

    const [phone, setPhone] = useState();

    const [employee, setEmployee] = useState({
        id: 0,
        code: '',
        name: '',
        phone: ''
    });

    //Lấy list Biển số xe
    useEffect(() => {
        async function fetchVehicleList() {
            try {
                VehicleService.getListVehicle(filters).then((res) => {
                    let vehicleDTOS = res.data;
                    console.log("VEHICLE :" + res.data);
                    setVehicles(
                        vehicleDTOS.map((vehicle) => {
                            return {
                                id: vehicle.id,
                                code: vehicle.code,
                                licensePlate: vehicle.licensePlate,
                            }
                        }))

                }).catch(function (error) {
                    console.log(error.response)
                    if (error.response.data.errors) {
                        setMessageError(error.response.data.errors[0].defaultMessage)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    } else {
                        setMessageError(error.response.data.message)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    }
                });

            } catch (error) {
                console.log("Failed to fetch Customer list: ", error.message);
            }
        }
        fetchVehicleList();
    }, [filters]);

    //Lấy list khách hàng
    useEffect(() => {
        async function fetchCustomerList() {
            try {
                CustomerService.getListCustomer(filtersCustomer).then((res) => {
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

                }).catch(function (error) {
                    console.log(error.response)
                    if (error.response.data.errors) {
                        setMessageError(error.response.data.errors[0].defaultMessage)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    } else {
                        // setMessageError(error.response.data.message)
                        // setFail(true);
                        // // use this to make the notification autoclose
                        // setTimeout(
                        //     function () {
                        //         setFail(false)
                        //     },
                        //     3000
                        // );
                    }
                });

            } catch (error) {
                console.log("Failed to fetch Customer list: ", error.message);
            }
        }
        fetchCustomerList();
    }, [filtersCustomer]);

    //Lấy list thợ sửa đang rảnh
    useEffect(() => {
        async function fetchEmployeeList() {
            try {
                EmployeeService.getListEmployeeReady(filters).then((res) => {
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

                }).catch(function (error) {
                    console.log(error.response)
                    if (error.response.data.errors) {
                        setMessageError(error.response.data.errors[0].defaultMessage)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    } else {
                        setMessageError(error.response.data.message)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    }
                });

            } catch (error) {
                console.log("Failed to fetch Employee list: ", error.message);
            }
        }
        fetchEmployeeList();
    }, [filters]);

    //Lấy list Phụ kiện
    useEffect(() => {
        async function fetchMaterialList() {
            try {
                MaterialService.getListMaterial(filters).then((res) => {
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
                            }
                        }))
                }).catch(function (error) {
                    console.log(error.response)
                    if (error.response.data.errors) {
                        setMessageError(error.response.data.errors[0].defaultMessage)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    } else {
                        setMessageError(error.response.data.message)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    }
                });
            } catch (error) {
                console.log("Failed to fetch Material list: ", error.message);
            }
        }
        fetchMaterialList();
    }, [filters]);

    //Lấy list dịch vụ
    useEffect(() => {
        async function fetchServiceList() {
            try {
                ServicesService.getAllServiceStillServing(filters).then((res) => {
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
                            }
                        }))
                    console.log(" dịch vụ : " + servicesData + " : " + services)
                }).catch(function (error) {
                    console.log(error.response)
                    if (error.response.data.errors) {
                        setMessageError(error.response.data.errors[0].defaultMessage)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    } else {
                        setMessageError(error.response.data.message)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    }
                });

            } catch (error) {
                console.log("Failed to fetch Service list: ", error.message);
            }
        }
        fetchServiceList();
    }, [filters]);

    useEffect(() => {
        async function fetchServiceList() {
            try {
                let currentSumMaterial = 0;
                materialChoose.map((data) => {
                    currentSumMaterial += data.quantityBuy * data.outputPrice;
                })
                setSumMaterial(currentSumMaterial);
            } catch (error) {
                console.log("Failed to fetch Service list: ", error.message);
            }
        }
        fetchServiceList();
    }, [filterSum]);


    //Hàm check số lượng
    useEffect(() => {
        async function fetchServiceList() {
            try {
                console.log("quantity : " + checkQuantity.id + checkQuantity.quantity)
                InvoicesService.checkMaterial(checkQuantity).then((res) => {

                }).catch(function (error) {
                    console.log(error.response)
                    if (error.response.data.errors) {
                        setMessageError(error.response.data.errors[0].defaultMessage)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    } else {
                        setMessageError(error.response.data.message)
                        setFail(true);
                        // use this to make the notification autoclose
                        setTimeout(
                            function () {
                                setFail(false)
                            },
                            3000
                        );
                    }
                });

            } catch (error) {
                console.log(error.message)
            }
        }
        fetchServiceList();
    }, [checkQuantity]);
    //customer
    const showListCustomer = () => {
        if (listCustomerClass == '') {
            setListCustomerClass('info-customers');

        } else {
            setListCustomerClass('')
        }
    }
    const formAddCustomer = () => {
        if (modalCustomerClass == '') {
            setModalCustomerClass('modal-vehicle');
            setListCustomerClass('')
        } else {
            setModalCustomerClass('')
        }
    }
    const formAddCustomerVehicle = () => {
        if (modalCustomerClass == '') {
            setModalCustomerClass('modal-customer');
            setListCustomerVehicleClass('')
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
    const deleteCustomer = () => {
        setShowInfoCustomer('')
        setCustomerClass('');
    }
    const deleteCustomerVehicle = () => {
        setShowInfoCustomerVehicle('')
    }

    //Employee
    const showListEmployee = () => {
        if (listEmployeeClass == '') {
            setListEmployeeClass('info-employees');
        } else {
            setListEmployeeClass('')
        }
    }
    const showListCustomerVehicle = () => {
        if (listCustomerVehicleClass == '') {
            setListCustomerVehicleClass('info-customer-vehicle')
        } else {
            setListCustomerVehicleClass('')
        }
    }
    const deleteEmployee = () => {
        setShowInfoEmployee('')
    }

    const back = () => {
        props.history.push('/admin/invoices');
    }

    const chooseVehicle = (vehicle) => {
        setVehicle(vehicle);
        setFiltersCustomer({
            ...filters,
            idVehicle: vehicle.id
        })
        setCustomerClass('search-customer-vehicle');
        setListCustomerClass('')
        setShowInfoCustomer('info-license-plate')
    }
    const chooseCustomer = (customer) => {
        setCustomer(customer);
        setListCustomerVehicleClass('');
        setShowInfoCustomerVehicle('info-customer')
    }

    const chooseEmployee = (employee) => {
        setEmployee(employee);
        setListEmployeeClass('')
        setShowInfoEmployee('info-name')
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
        setCheckQuantity({
            ...checkQuantity,
            id: material.id,
            quantity: material.quantityBuy
        })

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
    // eslint-disable-next-line no-unused-vars
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
    const addInvoice = (e) => {
        e.preventDefault();

        let materialDTOS = [];
        materialChoose.map((material) => {
            let material1 = {
                id: material.id,
                quantity: material.quantityBuy,
            }
            materialDTOS.push(material1)
        })
        let serviceDTOS = [];
        serviceChoose.map((service) => {
            let service1 = {
                id: service.id,
            }
            serviceDTOS.push(service1)
        })
        let invoice = {
            customerId: customer.id,
            vehicleId: vehicle.id,
            fixerId: employee.id,
            note: noteInvoice,
            payMethod,
            total: (sumMaterial + sumServices),
            materialDTOS,
            serviceDTOS
        };
        console.log("invoice => " + JSON.stringify(invoice));
        InvoicesService.postInvoice(invoice)
            .then(() => {
                props.history.push("/admin/invoices");
            }).catch(function (error) {
                console.log(error.response)
                if (error.response.data.errors) {
                    setMessageError(error.response.data.errors[0].defaultMessage)
                    setFail(true);
                    // use this to make the notification autoclose
                    setTimeout(
                        function () {
                            setFail(false)
                        },
                        3000
                    );
                } else {
                    setMessageError(error.response.data.message)
                    setFail(true);
                    // use this to make the notification autoclose
                    setTimeout(
                        function () {
                            setFail(false)
                        },
                        3000
                    );
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

    //Hàm thêm phương tiện và thông tin khách hàng
    const addCustomerVehicle = (e) => {
        e.preventDefault();

        let vehicleCustomerDTORequest = { name, phone, licensePlate };
        console.log("vehicleCustomerDTORequest => " + vehicleCustomerDTORequest.name + vehicleCustomerDTORequest.phone + vehicleCustomerDTORequest.licensePlate)

        CustomerService.postCustomerAndVehicle(vehicleCustomerDTORequest)
            .then(() => {
                setFilters({
                    ...filters,
                })
                setTl(true)
                setTimeout(
                    function () {
                        setTl(false)
                    },
                    3000
                );
                setListCustomerClass('');
                setModalCustomerClass('');
            })
            .catch(function (error) {
                if (error.response.data.errors) {
                    alert(error.response.data.errors[0].defaultMessage);
                } else {
                    alert(error.response.data.message);
                }
            });
    };

    //Hàm thêm khách hàng mới có sẵn biển số
    const addCustomer = (e) => {
        e.preventDefault();

        let customerVehicleDTO = { name, phone, licensePlate: vehicle.licensePlate };
        console.log("Customer => " + customerVehicleDTO)

        CustomerService.postCustomerByVehicle(customerVehicleDTO)
            .then(() => {
                setFiltersCustomer({
                    ...filters,
                    idVehicle: vehicle.id
                })
                setModalCustomerClass('')
                setTl(true)
                setTimeout(
                    function () {
                        setTl(false)
                    },
                    3000
                );
                setCustomer({
                    name: name,
                    phone: phone
                });
                setShowInfoCustomerVehicle('info-customer')
            }).catch(function (error) {
                console.log(error.response)
                if (error.response.data.errors) {
                    setMessageError(error.response.data.errors[0].defaultMessage)
                    setFail(true);
                    // use this to make the notification autoclose
                    setTimeout(
                        function () {
                            setFail(false)
                        },
                        3000
                    );
                } else {
                    setMessageError(error.response.data.message)
                    setFail(true);
                    // use this to make the notification autoclose
                    setTimeout(
                        function () {
                            setFail(false)
                        },
                        3000
                    );
                }
            });
    };

    function handleSearchTermChange(e) {
        const value = e.target.value;
        //Set --100 --clear, set --300 -> submit
        //Set --300 --> submit
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setFilters({
                ...filters,
                keyword: value,
            })
            setFiltersCustomer({
                ...filters,
                keyword: value,
            })
        }, 300);

    }

    function handleSearchTermChangeCustomerVehicle(e) {
        const value = e.target.value;
        //Set --100 --clear, set --300 -> submit
        //Set --300 --> submit
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setFiltersCustomer({
                ...filters,
                keyword: value,
            })

        }, 300);
    }

    return (
        <div className="body-add-invoice">
            <Snackbars
                place="tc"
                color="info"
                message={messageSucsess}
                open={tl}
                closeNotification={() => setTl(false)}
                close
            />
            <Snackbars
                place="tc"
                color="danger"
                message={messageError}
                open={fail}
                closeNotification={() => setFail(false)}
                close
            />
            <div className="title-add-invoice">
                <div className="left-title-add-invoice">
                    <div className="back"><button className="cancel-button" onClick={back}><span>&lsaquo; </span>Quay lại</button></div>
                    <div className="name-page" ><span>Tạo phiếu sửa chữa</span></div>
                </div>
                <div className="right-title-add-invoice">
                    <button className="btn-add" onClick={addInvoice}>Tạo</button>
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
                                        onChange={handleSearchTermChange}
                                        onClick={showListEmployee}
                                        placeholder="Tìm kiếm theo tên nhân viên"
                                    />
                                </div>
                            </form>
                            <div id="info-employees" className={listEmployeeClass}>
                                {employees.map((employee) => (
                                    <div key={employee.id} >
                                        <div className="name" onClick={() => chooseEmployee(employee)}><span>{employee.name}</span></div>
                                    </div>
                                ))}
                            </div>
                            <div id="info-name" className={showInfoEmployee}>
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
                                    <div className="delete-name"><span onClick={deleteEmployee}>x</span></div>
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
                                        onChange={handleSearchTermChange}
                                        onClick={showListCustomer}
                                        placeholder="Tìm kiếm theo biển số xe"
                                    />
                                </div>
                            </form>
                            <div id="info-customers" className={listCustomerClass}>
                                <div className="license-plate" onClick={formAddCustomer}><span className="button-add-customers">+ Thêm phương tiện</span></div>
                                {vehicles.map((vehicle) => (
                                    <div key={vehicle.id} >
                                        <div className="license-plate" onClick={() => chooseVehicle(vehicle)}><span>{vehicle.licensePlate}</span></div>
                                    </div>
                                ))}
                            </div>
                            <div id="info-license-plate" className={showInfoCustomer}>
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
                                    <div className="delete-license"><span onClick={deleteCustomer}>x</span></div>
                                </div>
                            </div>
                            <div id="modal-vehicle" className={modalCustomerClass}>
                                <div id="add-vehicle">
                                    <div className="title-add-customer">
                                        <div className="name-title"><span>Thêm mới phương tiện</span></div>
                                        <div className="close-form-add-customer"><span onClick={outFormAddCustomer}>&Chi;</span></div>
                                    </div>
                                    <div className="content-add-customer">
                                        <form>
                                            <div className="form-group-top">
                                                <div className="form-group">
                                                    <label>Họ Tên<span style={{ color: "red" }}>*</span></label><br />
                                                    <input type="text" className="input-customer" name="name" onChange={changeName} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Số điện thoại<span style={{ color: "red" }}>*</span></label><br />
                                                    <input type="text" className="input-customer" name="phone" onChange={changePhone} />
                                                </div>
                                            </div>
                                            <div className="form-group-bot">
                                                <label>Biển số xe<span style={{ color: "red" }}>*</span></label><br />
                                                <input type="text" className="input-customer" name="licensePlate" onChange={changeLicensePlate} />
                                            </div>
                                        </form>

                                        <div className="button-add-customer">
                                            <button className="btn-add" onClick={addCustomerVehicle}>Thêm</button>
                                            <div className="btn-out" onClick={outFormAddCustomer}><span>Thoát</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="search-customer-vehicle" className={customerClass} >
                            <form>
                                <div className="search-invoice">
                                    <Search className="icon-search" />
                                    <input
                                        type="text"
                                        onChange={handleSearchTermChangeCustomerVehicle}
                                        onClick={showListCustomerVehicle}
                                        placeholder="Tìm kiếm theo tên"
                                    />
                                </div>
                            </form>
                            <div id="info-customer-vehicle" className={listCustomerVehicleClass}>
                                <div className="license-plate" onClick={formAddCustomerVehicle}><span className="button-add-customers">+ Thêm khách hàng</span></div>
                                {customers.map((customer) => (
                                    <div key={customer.id} >
                                        <div className="license-plate" onClick={() => chooseCustomer(customer)}>
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
                            <div id="info-customer" className={showInfoCustomerVehicle}>
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
                                    <div className="delete-license"><span onClick={deleteCustomerVehicle}>x</span></div>
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
                                                    <label>Họ Tên<span style={{ color: "red" }}>*</span></label><br />
                                                    <input type="text" className="input-customer" name="name" onChange={changeName} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Số điện thoại<span style={{ color: "red" }}>*</span></label><br />
                                                    <input type="text" className="input-customer" name="phone" onChange={changePhone} />
                                                </div>
                                            </div>
                                            <div className="form-group-bot">
                                                <label>Biển số xe</label><br />
                                                <input type="text" disabled className="input-customer" name="licensePlate" value={vehicle.licensePlate} />
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
                                                onChange={handleSearchTermChange}
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
                                                    <td className="td-3">
                                                        <span>
                                                            <input value={materital.quantityBuy} onChange={e => {
                                                                setMaterialChoose(
                                                                    materialChoose.map(materialCheck => {
                                                                        if (materialCheck.id === materital.id) {
                                                                            materialCheck.quantityBuy = e.target.value;
                                                                        }
                                                                        setFilterSum({
                                                                            sum: 0
                                                                        });
                                                                        if (e.target.value > 0) {
                                                                            setCheckQuantity({
                                                                                ...checkQuantity,
                                                                                id: materialCheck.id,
                                                                                quantity: e.target.value
                                                                            })
                                                                        }
                                                                        return materialCheck;
                                                                    })
                                                                )

                                                            }} />
                                                        </span>
                                                    </td>
                                                    <td className="td-4"><span>{showPrice(materital.outputPrice).toString()}</span></td>
                                                    <td className="td-5 delete-material"><span onClick={() => deleteMaterialChoosed(materital)}>x</span></td>
                                                </tr>
                                            ))}
                                            {serviceChoose.map((service) => (
                                                <tr key={service.id}>
                                                    <td className="td-1"><span>{service.code}</span></td>
                                                    <td className="td-2"><span>{service.name}</span></td>
                                                    <td className="td-3"><span><input value="1" /></span></td>
                                                    <td className="td-4"><span>{showPrice(service.price).toString()}</span></td>
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
                                        <th>Tổng tiền thanh toán tạm tính</th>
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
export default CreateInvoices;
