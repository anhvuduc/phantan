/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/materials/CreateReceipt.css";

import { Search } from '@material-ui/icons';
import '../../assets/css/search/ReceiptSearch.css'
import { showPrice } from "../../helper/function";
import Snackbars from 'components/Snackbar/Snackbar.js';
import '../../assets/css/invoices/InvoiceMaterialSearch.css'
import MaterialService from "services/materialService";
// import ServicesService from "services/ServicesService";
import '../../assets/css/invoices/InvoiceServiceSearch.css'
import InvoicesService from "services/InvoicesService";
import CustomerService from "services/CustomerService";

export default function CreateInvocieMaterial(props) {
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
    const [fail, setFail] = React.useState(false);
    const [messageSucsess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const [listCustomerVehicleClass, setListCustomerVehicleClass] = useState('');
    const [customers, setCustomers] = useState([]);
    const [materialChoose, setMaterialChoose] = useState([]);
    const [listMaterial, setListMaterial] = useState('');
    const [modalCustomerClass, setModalCustomerClass] = useState('');
    const [showInfoCustomerVehicle, setShowInfoCustomerVehicle] = useState('');
    const [materitals, setMaterials] = useState([]);
    const [sumMaterial, setSumMaterial] = useState(0);
    const typingTimeoutRef = useRef(null);
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [note, setNote] = useState('');

    const [customer, setCustomer] = useState({
        id: 0,
        code: '',
        name: '',
        phone: ''
    });
    const [payMethod, setPayMethod] = useState();
    const [total, setTotal] = useState('');
    const [filterSum, setFilterSum] = useState({
        sum: 0,
    });
    const [filters, setFilters] = useState({
        keyword: "",
    });

    const [checkQuantity, setCheckQuantity] = useState({
        id: 1,
        quantity: 0,
    });

    //Lấy list khách hàng
    useEffect(() => {
        async function fetchCustomerList() {
            try {
                CustomerService.getListCustomers(filters).then((res) => {
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
                    if (error.response.data.status == 403) {
                        alert("Không có quyền truy cập!")
                    } else if (error.response.data.errors) {
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


    useEffect(() => {
        async function fetchMaterialList() {
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
        fetchMaterialList();
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
    const back = () => {
        props.history.push('/admin/invoices');
    }

    const showListMaterial = () => {
        console.log(listMaterial)
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

    const changePayMethod = (e) => {
        setPayMethod(e.target.value);
    }


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

        }, 300);

    }
    const changeNote = (e) =>{
        setNote(e.target.value);
    }
    const formAddCustomerVehicle = () => {
        if (modalCustomerClass == '') {
            setModalCustomerClass('modal-customer');
            setListCustomerVehicleClass('')
        } else {
            setModalCustomerClass('')
        }
    }
    const chooseCustomer = (customer) => {
        setCustomer(customer);
        setListCustomerVehicleClass('');
        setShowInfoCustomerVehicle('info-customer')
    }
    const outFormAddCustomer = () => {
        if (modalCustomerClass == '') {
            setModalCustomerClass('modal-customer');
        } else {
            setModalCustomerClass('')
        }
    }
    const changeName = (e) => {
        setName(e.target.value);
    }
    const changePhone = (e) => {
        setPhone(e.target.value);
    }
    //Hàm thêm phương tiện và thông tin khách hàng
    const addCustomer = (e) => {
        e.preventDefault();

        let customerDTO = { name, phone };
        console.log("vehicleCustomerDTORequest => " + customerDTO.name + customerDTO.phone)

        CustomerService.postCustomerNoVehicle(customerDTO)
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
    const deleteCustomerVehicle = () => {
        setShowInfoCustomerVehicle('')
        setCustomer({})
    }
    const showListCustomerVehicle = () => {
        if (listCustomerVehicleClass == '') {
            setListCustomerVehicleClass('info-customer-vehicle')
        } else {
            setListCustomerVehicleClass('')
        }
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
        let invoice = {
            customerId: customer.id,
            vehicleId: 0,
            fixerId: 0,
            note: note,
            payMethod,
            total: 0,
            materialDTOS,
        };
        console.log("invoice => " + JSON.stringify(invoice));
        InvoicesService.postInvoiceMaterial(invoice)
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
    return (
        <div className="body-add-invoice-material">
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
            <div className="title-add-receipt">
                <div className="left-title-add-receipt">
                    <div className="back"><button className="cancel-button" onClick={back}><span>&lsaquo; </span>Quay lại</button></div>
                    <div className="name-page" ><span>Tạo phiếu bán phụ tùng</span></div>
                </div>
                <div className="right-title-add-receipt">
                    <button className="btn-add"onClick={addInvoice} >Tạo</button>
                </div>
            </div>
            <div className="content-add-receipt">
                <div className="top-invoice">
                    <div className="title-customer"><span>Thông tin khách hàng</span></div>
                    <div className="content-customer">
                        <div className="search-customer" >
                            <div className="search-customer-vehicle">
                                <form>
                                    <div className="search-invoice">
                                        <Search className="icon-search" />
                                        <input
                                            type="text"
                                            onChange={handleSearchTermChange}
                                            onClick={showListCustomerVehicle}
                                            placeholder="Tìm kiếm theo tên"
                                        />
                                    </div>
                                </form>
                                <div id="info-customer-vehicle" className={listCustomerVehicleClass}>
                                    <div className="license-plate" onClick={formAddCustomerVehicle}><span className="button-add-customers" >+ Thêm khách hàng</span></div>
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
                                                onClick={showListMaterial}
                                                onChange={handleSearchTermChange}
                                                placeholder="Tìm kiếm tên sản phẩm, mã ..."
                                            />
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
                                                            <td className="td-2">Số lượng trong kho: {materital.quantity}</td>
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
                                                <td className="th-4"><span>Giá thành</span></td>
                                                <td className="th-5"></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {materialChoose.map((materital) => (
                                                <tr key={materital.id}>
                                                    <td className="td-1"><span>{materital.code}</span></td>
                                                    <td className="td-2"><span>{materital.name}</span></td>
                                                    <td className="td-3"><span>
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
                                                    </span></td>
                                                    <td className="td-4"><span>{showPrice(materital.outputPrice).toString()}</span></td>
                                                    <td className="td-5 delete-material"><span onClick={() => deleteMaterialChoosed(materital)}>x</span></td>
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
                                            <td>{showPrice(sumMaterial).toString()}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-receipt">
                    <div className="left-receipt">
                        <div className="note-receipt">
                            <label style={{color: "black"}}>Ghi chú</label><br />
                            <textarea placeholder="Thông tin thêm về đơn hàng" name="noteInvoice"  value={note} onChange={changeNote}/>
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
                                    <tr className="total">
                                        <th>Tổng tiền thanh toán</th>
                                        <td>:</td>
                                        <td className="total-td">{showPrice(sumMaterial).toString()}</td>
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
