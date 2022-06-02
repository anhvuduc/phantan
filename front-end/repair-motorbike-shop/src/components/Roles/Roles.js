import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import '../../assets/css/roles/role.css'
import RolesService from "services/RoleService";
import { People, ArrowDropDown, NavigateBefore } from "@material-ui/icons";
import Edit from "@material-ui/icons/Edit";
import FiltersForm from "../FiltersForm/search.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
import Pagination from "components/Pagination/pagination";
import Snackbars from 'components/Snackbar/Snackbar.js';

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
};

const useStyles = makeStyles(styles);

export default function Roles(props) {
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
    const [roles, setRoles] = useState([]);
    const [id, setId] = useState();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [nameEdit, setNameEdit] = useState("");
    const [descriptionEdit, setDescriptionEdit] = useState("");
    const [modalRoleClass, setModalRoleClass] = useState('');
    const [modalEditRoleClass, setModalEditRoleClass] = useState('');
    const [buttonOtherClass, setButtonOtherClass] = useState('');
    const showButtonOther = () => {
        if (buttonOtherClass == '') {
            setButtonOtherClass('content-button');
        } else {
            setButtonOtherClass('');
        }
    }
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalRows: 10,
    });
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        keyword: "",
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

    useEffect(() => {
        async function fetchRoleList() {
            try {
                RolesService.getRoles(filters).then((res) => {
                    let roles = res.data.rolesResponseDTOS;
                    console.log(res.data.rolesResponseDTOS);
                    setRoles(
                        roles.map((role) => {
                            return {
                                select: false,
                                id: role.id,
                                code: role.code,
                                name: role.name,
                                description: role.description,
                                status: role.status,
                            }
                        }))
                    setPagination(pagination);
                    console.log(pagination);
                });
                setIsLoaded(true);
            } catch (error) {
                console.log("Failed to fetch role list: ", error.message);
                setError(error);
            }
        }
        fetchRoleList();
    }, [filters]);

    const hiddenFormRole = () => {
        setModalRoleClass('')
    }
    const hiddenFormEditRole = () => {
        setModalEditRoleClass('')
    }
    const showCreateRole = () => {
        if (modalRoleClass == '') {
            setModalRoleClass('modal-roles')
        }
    }
    const changeName = (event) => {
        setName(event.target.value);
    };
    const changeDescription = (event) => {
        setDescription(event.target.value);
    };
    const changeNameEdit = (event) => {
        setNameEdit(event.target.value);
    };
    const changeDescriptionEdit = (event) => {
        setDescriptionEdit(event.target.value);
    };
    //Hàm lưu chức vụ
    const saveRole = (e) => {
        e.preventDefault();
        let role = { name, description };
        RolesService.postRole(role)
            .then(() => {
                props.history.push("/admin/roles");
            })
            .catch(function (error) {
                if (error.response.data.errors) {
                    alert(error.response.data.errors[0].defaultMessage);
                } else {
                    alert(error.response.data.message);
                }
            });
    };
    
    const editRole = (e) => {
        e.preventDefault();
        let role = { id, name: nameEdit, description: descriptionEdit };
        console.log("role => " + JSON.stringify(role));
        RolesService.putRole(role, id)
            .then(() => {
                window.location.reload();
                setTl(true);
                // use this to make the notification autoclose
                setTimeout(
                    function () {
                        setTl(false)
                    },
                    6000
                );
            })
            .catch(function (error) {
                if (error.response.data.errors) {
                    alert(error.response.data.errors[0].defaultMessage);
                } else {
                    alert(error.response.data.message);
                }
            });
    }
    const getRole = (id) => {

        if (modalEditRoleClass == '') {
            setModalEditRoleClass('modal-edit-roles')
        }
        RolesService.getRoleById(id).then((res) => {
            console.log("ROle => " + res.data)
            let role = res.data;
            setNameEdit(role.name)
            setDescriptionEdit(role.description)
            setId(role.id)
        })
    }
    const cancel = () => {
        props.history.push('/admin/employees')
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading....</div>;
    } else {
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <div className="list-roles">
                        <div className="title-roles">
                            <div className="name-title">
                                <div
                                    className="button-cancel"
                                    onClick={cancel}
                                >
                                    <NavigateBefore style={{ width: "15px" }} /> <span>Quay lại</span>
                                </div>
                                <div className="name-list">
                                    <span>Danh sách chức vụ</span>
                                </div>
                            </div>
                            <div className="add-new-invoice"><button className="button-add" onClick={showCreateRole}>Thêm Chức vụ</button></div>
                        </div>
                        <Snackbars
                            place="tc"
                            color="info"
                            message="Thành công!"
                            open={tl}
                            closeNotification={() => setTl(false)}
                            close
                        />

                        <div id="modal-roles" className={modalRoleClass}>
                            <div className="create-roles">
                                <div className="title-add-roles"><div className="title-roles"><span >Thêm mới chức vụ</span></div> <div className="close"><span onClick={hiddenFormRole}>&times;</span></div></div>
                                <div className="content-roles">
                                    <div className="form-group">
                                        <label>Tên Quyền<span style={{color:"red"}}>*</span> </label>
                                        <br />
                                        <input
                                            placeholder="Tên chức vụ"
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={changeName}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả<span style={{color:"red"}}>*</span> </label>
                                        <br />
                                        <textarea
                                            placeholder="Mô tả"
                                            name="description"
                                            className="form-control-area"
                                            value={description}
                                            onChange={changeDescription}
                                        />
                                    </div>
                                </div>
                                <button onClick={saveRole}>Tạo</button>
                            </div>
                        </div>
                        <div id="modal-edit-roles" className={modalEditRoleClass}>
                            <div className="edit-roles">
                                <div className="title-add-roles"><div className="title-roles"><span >Sửa thông tin chức vụ</span></div> <div className="close"><span onClick={hiddenFormEditRole}>&times;</span></div></div>
                                <div className="content-roles">
                                    <div className="form-group">
                                        <label>Tên Quyền<span style={{color:"red"}}>*</span> </label>
                                        <br />
                                        <input
                                            placeholder="Tên chức vụ"
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            value={nameEdit}
                                            onChange={changeNameEdit}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả<span style={{color:"red"}}>*</span> </label>
                                        <br />
                                        <textarea
                                            placeholder="Mô tả"
                                            name="description"
                                            className="form-control-area"
                                            value={descriptionEdit}
                                            onChange={changeDescriptionEdit}
                                        />
                                    </div>
                                </div>
                                <button onClick={editRole}>Sửa</button>
                            </div>
                        </div>
                        <div className="content-roles">
                            <Snackbars
                                place="tc"
                                color="info"
                                message="Thành công!"
                                open={tl}
                                closeNotification={() => setTl(false)}
                                close
                            />
                            <Snackbars
                                place="tc"
                                color="danger"
                                message="Lưu thất bại!"
                                open={tl}
                                closeNotification={() => setTl(false)}
                                close
                            />
                            <div className="filter">
                                <FiltersForm onSubmit={handleFiltersChange} />
                                <div className="action">

                                    {/* <div className="add-invoices">

                                        <div className="button-other" onClick={showButtonOther}>
                                            <div className="title-button">
                                                <span>Khác</span>
                                                <ArrowDropDown style={{ width: "15px" }} />
                                            </div>
                                            <div id="content-button" className={buttonOtherClass}>

                                            </div>
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="th-1">
                                            <input
                                                type="checkbox"
                                                onChange={e => {
                                                    let value = e.target.checked;
                                                    setRoles(
                                                        roles.map(role => {
                                                            role.select = value;
                                                            return role;
                                                        })
                                                    );
                                                }}
                                            ></input>
                                        </th>
                                        <th className="th-2">
                                            <span>#</span>
                                        </th>
                                        <th className="th-3">
                                            <span>Mã CV</span>
                                        </th>
                                        <th className="th-4">
                                            <span>Tên CV</span>
                                        </th>
                                        <th className="th-5">
                                            <span>Mô tả</span>
                                        </th>
                                        <th className="th-6">
                                            <span>Trạng thái</span>
                                        </th>
                                        <th className="th-7">
                                            <span></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((role) => (
                                        <tr key={role.id}>
                                            <td className="td-1">
                                                <input
                                                    type="checkbox"
                                                    checked={role.select}
                                                    onChange={e => {
                                                        let value = e.target.checked;
                                                        setRoles(
                                                            roles.map(roleCheck => {
                                                                if (roleCheck.id === role.id) {
                                                                    roleCheck.select = value;
                                                                }
                                                                return roleCheck;
                                                            })
                                                        );
                                                    }}
                                                />
                                            </td>
                                            <td className="td-2">
                                                <span>{role.id}</span>
                                            </td>
                                            <td className="td-3">
                                                <span>{role.code}</span>
                                            </td>
                                            <td className="td-4">
                                                <span>{role.name}</span>
                                            </td>
                                            <td className="td-6">
                                                <span>{role.description}</span>
                                            </td>
                                            <td className="td-6">
                                                <span>{role.status}</span>
                                            </td>
                                            <td className="td-7">
                                                <button
                                                    className="button-icon"
                                                    onClick={() => getRole(role.id)}
                                                >
                                                    <Edit style={{ width: "15px" }} /><div className="info-button"><span>Sửa thông tin chức vụ</span></div>
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                </GridItem>
            </GridContainer >
        );
    }
}
