/* eslint-disable react/prop-types */
import React, { useState, useEffect,useRef } from "react";
import "../../assets/css/invoices/CreateInvoiceMaterial.css";
import ReceiptsService from "services/ReceiptsService";
import { Search } from '@material-ui/icons';
import '../../assets/css/search/ReceiptSearch.css'
import {showPrice} from "../../helper/function";
import Snackbars from 'components/Snackbar/Snackbar.js';
import '../../assets/css/invoices/InvoiceMaterialSearch.css'
import MaterialService from "services/materialService";
// import ServicesService from "services/ServicesService";
import '../../assets/css/invoices/InvoiceServiceSearch.css'

export default function CreateReceipt(props) {
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

    const [message, setMessage] = useState('');
    const [tl, setTl] = React.useState(false);

    const [materialChoose, setMaterialChoose] = useState([]);
    const [listMaterial, setListMaterial] = useState('');
    const [materitals, setMaterials] = useState([]);
    const [sumMaterial, setSumMaterial] = useState(0);
    const typingTimeoutRef = useRef(null);
    const [modalMaterialClass, setModalMaterialClass] = useState('');
    const [note, setNote] = useState('');
    const [payMethod, setPayMethod] = useState();
    const [nameMaterial, setNameMaterial] = useState();
    const [inputPrice, setInputPrice]= useState();
    const [outputPrice, setOutputPrice]= useState();
    const [description, setDescription]= useState();
    const [supplier, setSupplier] = useState();
    const [filterSum, setFilterSum] = useState({
        sum: 0,
    });
    const [filters, setFilters] = useState({
        keyword: "",
      });


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
                                inputPrice: materital.inputPrice,
                                quantity: materital.quantity,
                                quantityInput: 1,
                            }
                        }))
                });

            } catch (error) {
                console.log("Failed to fetch Invoicce list: ", error.message);
            }
        }
        fetchMaterialList();
    }, [filters]);

    const back = () => {
        props.history.push('/admin/materials');
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
    useEffect(() => {
        async function fetchMaterialList() {
            try {
                let currentSumMaterial = 0;
                materialChoose.map((data) => { 
                    currentSumMaterial += data.quantityInput * data.inputPrice;
                })
                setSumMaterial(currentSumMaterial);
            } catch (error) {
                console.log("Failed to fetch Service list: ", error.message);
            }
        }
        fetchMaterialList();
    }, [filterSum]);

    const chooseMaterial = (material) => {
        setListMaterial('');
        // if (material.quantity === 0) {
        //     return alert("Phụ kiện đã hết!")
        // } else {
        let materials = materialChoose;
        if (materials.length > 0) {
            let check = checkMaterial(material, materials);
            if (check !== 0) {
                var material1 = {
                    id: materials[check - 1].id,
                    code: materials[check - 1].code,
                    name: materials[check - 1].name,
                    inputPrice: materials[check - 1].inputPrice,
                    quantity: materials[check - 1].quantity,
                    quantityInput: materials[check - 1].quantityInput + 1,
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
            currentSumMaterial += data.quantityInput * data.inputPrice;
        })
        setSumMaterial(currentSumMaterial);
        setMaterialChoose(materials);
    }

    // }

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
        currentSum = currentSum - (material.quantityInput * material.inputPrice);
        setSumMaterial(currentSum);
    }

    //Hàm thêm phiếu nhập hàng mới
    const addReceipt = (e) => {
        e.preventDefault();
        let materialDTO = [];
        materialChoose.map((material) => {
            let material1 = {
                id: material.id,
                quantity: material.quantityInput,
            }
            materialDTO.push(material1)
        })
        let receiptDTO = { materialDTOS :  materialDTO, note : note}
        console.log("receipt => " + JSON.stringify(receiptDTO));
        ReceiptsService.postReceipt(receiptDTO)
            .then(() => {
                props.history.push("/admin/materials");
            })
            .catch(function (error) {
                if (error.response.data.errors) {
                    setMessage(error.response.data.errors[0].defaultMessage)
                    setTl(true);
                    // use this to make the notification autoclose
                    setTimeout(
                      function () {
                        setTl(false)
                      },
                      3000
                    );
                  } else {
                    setMessage(error.response.data.message)
                    setTl(true);
                    // use this to make the notification autoclose
                    setTimeout(
                      function () {
                        setTl(false)
                      },
                      3000
                    );
                  }
            });
    };
    const changePayMethod = (e) => {
        setPayMethod(e.target.value);
    }
    const changeNameMaterial = (e) => {
        setNameMaterial(e.target.value);
    }
    const changeDescription = (e) => {
        setDescription(e.target.value);
    }
    const changeInputPrice = (e) => {
        setInputPrice(e.target.value);
    }
    const changeOutputPrice = (e) => {
        setOutputPrice(e.target.value);
    }
    const changeSupplier = (e) => {
        setSupplier(e.target.value);
    }



    const outFormAddMaterial = () => {
        if (modalMaterialClass == '') {
            setModalMaterialClass('modal-material');
        } else {
            setModalMaterialClass('')
        }
    }
    const formAddMaterial = () => {
        if (modalMaterialClass == '') {
            setModalMaterialClass('modal-material');
            setListMaterial('')
        } else {
            setModalMaterialClass('')
        }
    }
    const addMaterial = (e) => {
        e.preventDefault();
        let material = {
            name: nameMaterial,
            description: description,
            inputPrice: inputPrice,
            outputPrice: outputPrice,
            supplier: supplier
        }
        console.log("material: " +material)
        MaterialService.postMaterialDTO(material).then(() => {
            window.location.reload()
        })
        .catch(function (error) {
            if (error.response.data.errors) {
            setMessage(error.response.data.errors[0].defaultMessage)
            setTl(true);
            // use this to make the notification autoclose
            setTimeout(
                function () {
                setTl(false)
                },
                3000
            );
            } else {
            setMessage(error.response.data.message)
            setTl(true);
            // use this to make the notification autoclose
            setTimeout(
                function () {
                setTl(false)
                },
                3000
            );
            }
        });
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
    return (
        <div className="body-add-receipt">
            <Snackbars
                place="tc"
                color="warning"
                message={message}
                open={tl}
                closeNotification={() => setTl(false)}
                close
            />
            <div className="title-add-receipt">
                <div className="left-title-add-receipt">
                    <div className="back"><button className="cancel-button" onClick={back}><span>&lsaquo; </span>Quay lại</button></div>
                    <div className="name-page" ><span>Tạo phiếu nhập phụ tùng</span></div>
                </div>
                <div className="right-title-add-receipt">
                    <button className="btn-add" onClick={addReceipt}>Nhập</button>
                </div>
            </div>
            <div className="content-add-receipt">
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
                                        <div className="material" onClick={formAddMaterial}><span className="button-add-materials">+ Thêm mới phụ kiện</span></div>
                                        {materitals.map((materital) => (
                                            <div key={materital.id}>
                                                <div className="info-detail" onClick={() => chooseMaterial(materital)}>
                                                    <table>
                                                        <tr>
                                                            <td className="td-1">{materital.name}</td>
                                                            <td className="td-2">{showPrice(materital.inputPrice).toString()}</td>
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
                                                <div className="close-form-add-material"><span onClick={outFormAddMaterial}>&Chi;</span></div>
                                            </div>
                                            <div className="content-add-material">
                                                <form>
                                                    <div className="form-group-top">
                                                        <div className="form-group">
                                                            <label>Tên phụ tùng</label><span className="attribute" style={{color: "red"}}>*</span><br />
                                                            <input type="text" className="input-material" name="nameMaterial" onChange={changeNameMaterial}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Giá nhập</label><span className="attribute" style={{color: "red"}}>*</span><br />
                                                            <input type="text" className="input-material" name="inputPrice" onChange={changeInputPrice}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group-top">
                                                        <div className="form-group">
                                                            <label>Nhà cung cấp</label><br />
                                                            <input type="text" className="input-material" name="supplier" onChange={changeSupplier}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Giá bán</label><br />
                                                            <input type="text" className="input-material" name="outputPrice" onChange={changeOutputPrice}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group-bot">
                                                        <label>Mô tả chi tiết</label><br />
                                                        <textarea type="text" className="input-material" name="description" onChange={changeDescription}/>
                                                    </div>
                                                </form>

                                                <div className="button-add-material">
                                                    <button className="btn-add"onClick={addMaterial} >Thêm</button>
                                                    <div className="btn-out" onClick={outFormAddMaterial}><span>Thoát</span></div>
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
                                                        <input value={materital.quantityInput}  onChange={e => {
                                                            setMaterialChoose(
                                                                materialChoose.map(materialCheck => {
                                                                    if (materialCheck.id === materital.id) {
                                                                        materialCheck.quantityInput = e.target.value;

                                                                    }
                                                                    setFilterSum({
                                                                        sum:0
                                                                    });
                                                                    return materialCheck;
                                                                })
                                                            )
                                                        }}/>
                                                    </span></td>
                                                    <td className="td-4"><span>{showPrice(materital.inputPrice).toString()}</span></td>
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
                            <textarea placeholder="Thông tin thêm về đơn hàng" name="noteInvoice"  value={note}/>
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
