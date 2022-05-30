/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/services/service.css";
import FiltersForm from "../FiltersForm/ServiceSearch.js";
import LimitPagination from 'components/Pagination/limitPagination.js';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons

import Snackbars from 'components/Snackbar/Snackbar.js';
import ServicesService from "services/ServicesService"
// core components

import DeleteIcon from '@material-ui/icons/Delete';
import Edit from "@material-ui/icons/Edit";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0",
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF",
        },
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1",
        },
    },
    spanRight: {
        textAlign: "right",
        marginRight: "0"
    }
};


const useStyles = makeStyles(styles);

export default function (props) {
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

    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const [tl, setTl] = React.useState(false);
    const [fail, setFail] = React.useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();


    const changeName = (event) => {
        setName(event.target.value);
    };
    const changeDescription = (event) => {
        setDescription(event.target.value);
    };
    const changePrice = (event) => {
        setPrice(event.target.value);
    };

    const [id, setId] = useState('');

    const [services, setServices] = useState([]);


    const [serviceId, setServiceId] = useState("");

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalServiceClass, setModalServiceClass] = useState('');

    const [warningClass, setWarningClass] = useState('');
    const [warningModalClass, setWarningModalClass] = useState('');

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalRows: 12,
    });
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        keyword: ""
    });

    function handlePageChange(newPage) {
        // console.log("new page: ", newPage);
        setFilters({
            ...filters,
            page: newPage,
        });
    }
    function handleFiltersChange(newFilters) {
        // console.log("New filters: ", newFilters);
        setFilters({
            ...filters,
            _page: 1,
            keyword: newFilters.keyword,
        });
    }
    function handleChangeLimit(newLimit) {
        // console.log("New Month: ", newLimit);
        setFilters({
            ...filters,
            _page: 1,
            limit: newLimit.limit,
        });
    }

    const pauseService = () => {
        props.history.push("/admin/services/pause-service");
    }

    const getlistServiceCanReturn = () => {
        props.history.push("/admin/services/return-service");
    }

    useEffect(() => {
        async function fetchServiceList() {
            try {
                ServicesService.getListService(filters).then((res) => {
                    const data = res.data.serviceDTOS;
                    const pagination = res.data.pagination;

                    setServices(
                        data.map((service) => {
                            return {
                                select: false,
                                id: service.id,
                                code: service.code,
                                name: service.name,
                                description: service.description,
                                price: service.price,
                                status: service.status,
                            }
                        }))
                    setPagination(pagination);
                    console.log(data);
                    console.log(pagination);
                    setIsLoaded(true);
                }).catch(function (error) {
                    console.log("ERROR: " + error.response.data.status)
                    if (error.response.data.status == 403) {
                        alert("Không có quyền truy cập!")
                    }
                })
            } catch (error) {
                console.log("Failed to fetch service list: ", error.message);
                setError(error);
            }
        }
        fetchServiceList();
    }, [filters]);



    const putService = (e) => {
        e.preventDefault();
        let service = { name, description, price };
        console.log("service => " + JSON.stringify(service));
        ServicesService.updateService(serviceId, service)
            .then(() => {
                window.location.reload();
                setModalServiceClass('');
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

    const deleteService = () => {
        ServicesService.deleteService(id)
            .then(() => {
                window.location.reload();
            })
            .catch(function (error) {
                if (error.response.data.errors) {
                    console.log(error.response.data.errors[0].defaultMessage);
                } else {
                    console.log(error.response.data.message);
                }
            });
    }

    const saveService = (e) => {
        e.preventDefault();

        let service = { name, description, price };
        console.log("service => " + JSON.stringify(service));
        ServicesService.postService(service)
            .then(() => {
                setFilters({
                    ...filters,
                })
                setModalServiceClass('');
            })
            .catch(function (error) {
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

    const updateService = (service) => {
        ServicesService.getServiceId(service.id)
            .then((res) => {
                setServiceId(res.data.id);
                setName(res.data.name);
                setDescription(res.data.description);
                setPrice(res.data.price);
            })
            .catch(function (error) {
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

        if (modalServiceClass == '') {
            setModalServiceClass('modal-update-service')
        }
    }

    const deleteS = (id) => {
        if (warningModalClass == '') {
            setWarningModalClass('warning-modal')
            setId(id)
        }
    }

    const backconfirm = () => {
        setWarningClass('');
        setWarningModalClass('');
    }

    const addService = () => {
        if (modalServiceClass == '') {
            setModalServiceClass('modal-service')
        }
    };

    const hiddenFormService = () => {
        setName("")
        setDescription("")
        setPrice("")
        setModalServiceClass('')
    }

    const classes = useStyles();



    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading....</div>;
    } else {
        return (
            <div className="list-services">
                <Snackbars
                    place="tc"
                    color="info"
                    message={messageSuccess}
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
                <div className="title-services">
                    <div className="name-title"><span>Danh sách dịch vụ</span></div>
                    <div className="add-new-service"><button className="button-add" onClick={addService}>Thêm mới</button></div>
                </div>

                <div id="warning-modal" className={warningModalClass}>
                    <div id="warning" className={warningClass}>
                        <div className="title-warning">
                            <span>Xóa dịch vụ?</span>
                        </div>
                        <div className="content-warning">
                            <div className="text-warning"><span>Bạn có chắc muốn xóa dịch vụ này? Thao tác này không thể khôi phục.</span></div>
                            <div className="button-warning">
                                <button className="delete-permission" onClick={deleteService}><span>Xóa</span></button>
                                <div className="back" onClick={backconfirm}><span>Thoát</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-services">

                    <Snackbars
                        place="tc"
                        color="warning"
                        message={messageSuccess}
                        open={tl}
                        closeNotification={() => setTl(false)}
                        close
                    />

                    <div id="modal-service" className={modalServiceClass}>
                        <div className="create-service">
                            <div className="title-add-service"><div className="title-service"><span >Thêm dịch vụ mới</span></div> <div className="close"><span onClick={hiddenFormService}>&times;</span></div></div>
                            <div className="content-service">
                                <div className="form-group">
                                    <label>Tên dịch vụ<span style={{ color: "red" }}>*</span></label>
                                    <br />
                                    <input
                                        placeholder="Điền tên dịch vụ"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={changeName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mô ta dịch vụ</label>
                                    <br />
                                    <input
                                        placeholder="Mô ta dịch vụ"
                                        name="description"
                                        className="form-control"
                                        value={description}
                                        onChange={changeDescription}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Giá</label>
                                    <br />
                                    <input
                                        placeholder="Điền giá dịch vụ"
                                        name="price"
                                        className="form-control"
                                        value={price}
                                        onChange={changePrice}
                                    />
                                </div>
                            </div>
                            <button onClick={saveService}>Tạo</button>
                        </div>
                    </div>

                    <div id="modal-update-service" className={modalServiceClass}>
                        <div className="create-update-service">
                            <div className="title-update-service"><div className="title-update-service"><span >Sửa thông tin dịch vụ</span></div> <div className="close"><span onClick={hiddenFormService}>&times;</span></div></div>
                            <div className="content-update-service">
                                <div className="form-group">
                                    <label>Tên dịch vụ<span style={{ color: "red" }}>*</span></label>
                                    <br />
                                    <input
                                        placeholder="Điền tên dịch vụ"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={changeName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mô ta dịch vụ</label>
                                    <br />
                                    <input
                                        placeholder="Mô ta dịch vụ"
                                        name="description"
                                        className="form-control"
                                        value={description}
                                        onChange={changeDescription}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Giá</label>
                                    <br />
                                    <input
                                        placeholder="Điền giá dịch vụ"
                                        name="price"
                                        className="form-control"
                                        value={price}
                                        onChange={changePrice}
                                    />
                                </div>
                            </div>
                            <button onClick={putService}>Tạo</button>
                        </div>
                    </div>

                    <div className="filter">
                        <FiltersForm onSubmit={handleFiltersChange} />
                        <div className="action">
                            <div className="add-services">
                                <button className="button-action" onClick={pauseService}>Ngưng dịch vụ</button>
                                <button className="button-action" onClick={getlistServiceCanReturn}>Tái dịch vụ</button>
                            </div>
                        </div>
                    </div>
                    <div className="height-table">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>
                                    <span>#</span>
                                </th>
                                <th>
                                    <span>Mã dịch vụ</span>
                                </th>
                                <th>
                                    <span>Tên dịch vụ</span>
                                </th>
                                <th>
                                    <span>Mô tả dịch vụ</span>
                                </th>
                                <th>
                                    <span >Giá</span>
                                </th>
                                <th>
                                    <span>Trạng thái</span>
                                </th>
                                <th className="th-7">
                                    <span></span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td className="td-2">
                                        <span>{service.id}</span>
                                    </td>
                                    <td className="td-3">
                                        <span>{service.code}</span>
                                    </td>
                                    <td className="td-4">
                                        <span>{service.name}</span>
                                    </td>
                                    <td className="td-5">
                                        <span>{service.description}</span>
                                    </td>
                                    <td className="td-6">
                                        <span>{service.price}</span>
                                    </td>
                                    <td className="td-6">
                                        <span>{service.status}</span>
                                    </td>
                                    <td className="td-7">
                                        <button
                                            className="button-icon"
                                            onClick={() => updateService(service)}
                                        >
                                            <Edit style={{ width: "15px" }} /><div className="info-button"><span>Sửa thông tin DV</span></div>
                                        </button>
                                        <button
                                            className="button-icon"
                                            onClick={() => deleteS(service.id)}
                                        >
                                            <DeleteIcon style={{ width: "15px" }} /><div className="info-button"><span>Xóa dịch vụ</span></div>
                                        </button>
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination-limit">
                        <div className="limit">
                            <span>Hiển thị </span><LimitPagination onSubmit={handleChangeLimit} /> <span style={{ marginTop: "21px" }}> kết quả</span>
                        </div>
                        <div className="pagination">
                            <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
