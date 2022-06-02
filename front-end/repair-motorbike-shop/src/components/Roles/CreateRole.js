/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import '../../assets/css/roles/CreateRole.css'
import RolesService from 'services/RoleService';

export default function CreateRole(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [permissionName, setPermissionName] = useState("");
    const [permissionDescription, setPermissionDescription] = useState("");
    const [permissionClass, setPermissionClass] = useState('');
    const [modalClass, setModalClass] = useState('');
    const [warningModalClass, setWarningModalClass] = useState('');
    const [warningClass, setWarningClass] = useState('');
    const [idPermission, setIdPermission] = useState();

    //Hàm lấy list quyền truy cập
    useEffect(() => {
        async function fetchPermission() {
            RolesService.getPermissionUsing()
                .then((res) => {
                    console.log("List permissions : " + res.data);
                    let permissions = res.data;
                    setPermissions(
                        permissions.map((permission) => {
                            return {
                                select: false,
                                id: permission.id,
                                code: permission.code,
                                name: permission.name,
                                description: permission.description,
                                status: permission.status
                            }
                        }));
                })
        }
        fetchPermission();
    }, []);

    //Truyền id vào API
    const deletePer = () => {
        console.log("ID: " + idPermission);
        let id = idPermission;
        let idPer = { id }
        RolesService.deletePermission(idPer).then(() => {
            window.location.reload();
        }).catch(function (error) {
            if (error.response.data.errors) {
                alert(error.response.data.errors[0].defaultMessage);
            } else {
                alert(error.response.data.message);
            }
        });
    }

    const displayCreatePermission = ()  => {
        if (permissionClass == '') {
            setPermissionClass('display-permission');
            setModalClass('display-modal');
            console.log("ROLE : " + permissionClass);
        } else {
            setPermissionClass('');
        }
    }

    const hiddenFormPermission = () => {
        if (permissionClass == '') {
            setPermissionClass('hidden-permission');
            setModalClass('hidden-modal');
            console.log("ROLE : " + permissionClass);
        } else {
            setPermissionClass('');
            setModalClass('');
        }
    }
    function deletePermission(id){
        setIdPermission(id)
        if (warningClass == '') {
            setWarningClass('warning');
            setWarningModalClass('warning-modal');
        } else {
            setWarningClass('');
            setWarningModalClass('');
        }
    }
    const back = () => {
        if (warningClass == '') {
            setWarningClass('warning');
            setWarningModalClass('warning-modal');
        } else {
            setWarningClass('');
            setWarningModalClass('');
        }
    }
    const changeName = (event) => {
        setName(event.target.value);
    };
    const changeDescription = (event) => {
        setDescription(event.target.value);
    };
    const changePermissionName = (event) => {
        setPermissionName(event.target.value);
    }
    const changePermissionDescription = (event) => {
        setPermissionDescription(event.target.value);
    }
    //Tạo permission mới
    const savePermission = (e) => {
        e.preventDefault();
        let permission = { permissionName, permissionDescription };
        console.log("role => " + JSON.stringify(permission));
        RolesService.postPermission(permission)
            .then(() => {
                window.location.reload();
            })
            .catch(function (error) {
                if (error.response.data.errors) {
                    alert(error.response.data.errors[0].defaultMessage);
                } else {
                    alert(error.response.data.message);
                }
            });
    }

    //Hàm lưu chức vụ
    const saveRole = (e) => {
        e.preventDefault();
        const permissionID = [];
        permissions.forEach(permission => {
            if (permission.select) {
                permissionID.push(permission.id);
            }
        });

        if (permissionID.length != 0) {
            console.log("ID: " + permissionID);
            let role = { name, description, permissionID };
            console.log("employee => " + JSON.stringify(role));
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
        } else { alert("Role không được để trống!") }

    };

    const cancel = () => {
        props.history.push("/admin/roles");
    };
    return (
        <div className="body">
            <div className="add-new-role">
                <div className="title">
                    <span>Tạo mới chức vụ</span>
                </div>
                <div className="card-body">
                    <form>
                        <div className="group">
                            <div className="group-main">
                                <div className="form-group">
                                    <label>Tên Quyền: </label>
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
                                    <label>Mô tả: </label>
                                    <br />
                                    <textarea
                                        placeholder="Mô tả"
                                        name="description"
                                        className="form-control-area"
                                        value={description}
                                        onChange={changeDescription}
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="add-permission">
                                        <div className="button-add-permission" onClick={displayCreatePermission}>
                                            <span>+ Thêm quyền truy cập mới</span>
                                        </div>
                                        <div id="modal" className={modalClass}>
                                            <div id="create-permission" className={permissionClass}>
                                                <div className="title-add-permission"><div className="title-permission"><span >Thêm mới chức vụ</span></div> <div className="close"><span onClick={hiddenFormPermission}>&times;</span></div></div>
                                                <div className="form-group-permission">
                                                    <label>Tên quyền </label>
                                                    <br />
                                                    <input
                                                        placeholder="Điền tên chức vụ mới"
                                                        name="permissionName"
                                                        className="form-control"
                                                        value={permissionName}
                                                        onChange={changePermissionName}
                                                    />
                                                </div>
                                                <div className="form-group-permission">
                                                    <label>Mô tả </label>
                                                    <br />
                                                    <textarea
                                                        placeholder="Mô tả"
                                                        name="permissionDescription"
                                                        className="form-control-2"
                                                        value={permissionDescription}
                                                        onChange={changePermissionDescription}
                                                    />
                                                </div>
                                                <button onClick={savePermission}>Tạo</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group-permission-list">
                                    {permissions.map((permission) => (
                                        <div key={permission.id} className="role-list">
                                            <input
                                                type="checkbox"
                                                checked={permission.select}
                                                onChange={e => {
                                                    let value = e.target.checked;
                                                    setPermissions(
                                                        permissions.map(permissionCheck => {
                                                            if (permissionCheck.id === permission.id) {
                                                                permissionCheck.select = value;
                                                            }
                                                            return permissionCheck;
                                                        })
                                                    );
                                                }} />
                                            <label>{permission.name} </label>
                                            <div className="delete">
                                                <span  onClick={() => deletePermission(permission.id)}>&times;</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div id="warning-modal" className={warningModalClass}>
                                        <div id="warning" className={warningClass}>
                                            <div className="title-warning">
                                                <span>Xóa quyền truy cập?</span>
                                            </div>
                                            <div className="content-warning">
                                                <div className="text-warning"><span>Bạn có chắc muốn xóa quyền truy cập? Thao tác này không thể khôi phục.</span></div>
                                                <div className="button-warning">
                                                    <button className="delete-permission" onClick={deletePer}><span>Xóa</span></button>
                                                    <div className="back" onClick={back}><span>Thoát</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-success"
                            onClick={saveRole}
                        >
                            Lưu
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={cancel}
                            style={{ marginLeft: "10px" }}
                        >
                            Trở Lại
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}
