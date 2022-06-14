/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/employees/employee.css";
import FiltersForm from "../FiltersForm/search.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
import EmployeesService from "services/employees";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ArrowDropDown, Delete, DeleteForever, EditAttributesTwoTone } from "@material-ui/icons";
// material-ui icons
import Snackbars from 'components/Snackbar/Snackbar.js';
import Edit from "@material-ui/icons/Edit";
import EmployeeFilters from "components/FiltersForm/EmployeeFilters";
import RoleFilters from "components/FiltersForm/RoleFilters";
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
  const [id, setId] = useState();
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [salaryDay, setSalaryDay] = useState();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttonOtherClass, setButtonOtherClass] = useState('');
  const [modalTimeSheetClass, setModalTimeSheetClass] = useState('');
  const [modalSalaryDayClass, setModalSalaryDayClass] = useState('');
  const [warningClass, setWarningClass] = useState('');
  const [warningModalClass, setWarningModalClass] = useState('');
  const [month, setMonth] = useState('');
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
    totalRows: 12,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: 1,
    roleIds: [2, 3],
  });

  function handlePageChange(newPage) {
    console.log("new page: ", newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }
  function handleFiltersChange(newFilters) {
    console.log("New filters: ", newFilters);
    setFilters({
      ...filters,
      page: 1,
      keyword: newFilters.keyword,
    });
  }
  function handleChangeLimit(newLimit) {
    console.log("New Month: ", newLimit);
    setFilters({
      ...filters,
      page: 1,
      limit: newLimit.limit,
    });
  }
  function handleFiltersStatus(newStatus) {
    console.log("New Status: ", newStatus);
    setFilters({
      ...filters,
      page: 1,
      status: newStatus.status,
    });
  }
  function handleFiltersRole(newRole) {
    // console.log("New Status: ", newStatus);
    setFilters({
      ...filters,
      page: 1,
      roleIds: newRole.ids,
    });
  }
  const addEmployee = () => {
    props.history.push("/admin/employees/add-employee");
  };

  useEffect(() => {
    async function fetchEmployeeList() {
      try {
        EmployeesService.listEmployees(filters).then((res) => {
          const employees = res.data.userDTOS;
          const pagination = res.data.pagination;

          setEmployees(
            employees.map((employee) => {
              return {
                select: false,
                id: employee.id,
                code: employee.code,
                name: employee.name,
                phone: employee.phone,
                status: employee.status
              }
            }))
          setPagination(pagination);
          setIsLoaded(true);
        }).catch(function (error) {
          if (error.response.data.status == 403) {
            alert("Không có quyền truy cập!")
          }
        })
      } catch (error) {
        if (error.status == 401) {
          alert("Không quyền truy cập")
        }
        console.log("Failed to fetch employee list: ", error.message);
        setError(error);

      }
    }
    fetchEmployeeList();
  }, [filters]);

  const handleCreateTimeSheets = (e) => {
    e.preventDefault();
    const ids = [];
    employees.forEach(employee => {
      if (employee.select) {
        ids.push(employee.id);
      }
    });

    if (ids.length != 0) {
      let timesheets = { ids, month }
      EmployeesService.createTimeSheets(timesheets)
        .then(() => {
          setMessageSuccess("Tạo bảng công thành công")
            setTl(true);
            // use this to make the notification autoclose
            setTimeout(
              function () {
                setTl(false)
              },
              3000
            );
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
    } else {
      setMessageError("Không có lựa chọn nào! Vui lòng chọn lại!")
      setFail(true);
      // use this to make the notification autoclose
      setTimeout(
        function () {
          setFail(false)
        },
        3000
      );
    }
  }

  const putSalaryDay = (e) => {
    e.preventDefault();

    EmployeesService.changeSalaryDay(employeeId, filters)
      .then(() => {
        setFilters({
          ...filters
        })
        setMessageSuccess("Điều chỉnh lương thành công!")
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setTl(false)
            },
            3000
          );
        setModalSalaryDayClass('');
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          setMessageError(error.response.data.errors[0].defaultMessage)
          setTl(true);
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
  }
  const updateCategory = (id) => {
    props.history.push(`/admin/employees/update-employee/${id}`);
  };

  const changeSalaryDayAdjustment = (event) => {
    setFilters({
      ...filters,
      salary: event.target.value,
    });
  };

  const updateSalaryDay = (employee) => {
    setEmployeeId(employee.id);
    EmployeesService.getEmployeeById(employee.id).then((res) => {
      let user = res.data;
      console.log(user);
      setSalaryDay(user.salaryDay);
    });
    if (modalSalaryDayClass == '') {
      setModalSalaryDayClass('modal-salaryday')
    }
  }


  const timesheet = () => {
    props.history.push('/admin/employees/time-sheets')
  }
  const listRoles = () => {
    props.history.push('/admin/roles')
  }
  const classes = useStyles();

  const hiddenFormRole = () => {
    setModalTimeSheetClass('')
  }

  const hiddenFormSalaryDay = () => {
    setEmployeeId('')
    setSalaryDay('')
    setModalSalaryDayClass('')
  }

  const showCreateTimesheet = () => {
    if (modalTimeSheetClass == '') {
      setModalTimeSheetClass('modal-timesheet')
    }
  }

  const changeCreateTimeSheet = (e) => {
    setMonth(e.target.value)
  }

  const backconfirm = () => {
    setWarningClass('');
    setWarningModalClass('');
  }

  const deleteS = (id) => {
    if (warningModalClass == '') {
      setWarningModalClass('warning-modal')
      setId(id)
    }
  }

  //Xóa nhân viên
  const deleteEmployee = (e) => {
    EmployeesService.deleteEmployee(id)
      .then(() => {
        setFilters({
          ...filters
        })
        setWarningModalClass('')
        setMessageSuccess("Xóa thành công!")
        setTl(true);
        // use this to make the notification autoclose
        setTimeout(
          function () {
            setTl(false)
          },
          3000
        );
      })
      .catch(function (error) {
        console.log(error.response);
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
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <div className="list-employees">
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
        <div className="title-employees">
          <div className="name-title"><span>Danh sách nhân viên</span></div>
          <div className="add-new-invoice"><button className="button-add" onClick={addEmployee}>Thêm Nhân viên</button></div>
        </div>
        <div id="modal-timesheet" className={modalTimeSheetClass}>
          <div className="create-timesheet">
            <div className="title-add-timesheet"><div className="title-timesheet"><span >Thêm bảng công tháng mới</span></div> <div className="close"><span onClick={hiddenFormRole}>&times;</span></div></div>
            <select onChange={changeCreateTimeSheet}>
              <option value="1">Tháng 1</option>
              <option value="2">Tháng 2</option>
              <option value="3">Tháng 3</option>
              <option value="4">Tháng 4</option>
              <option value="5">Tháng 5</option>
              <option value="6">Tháng 6</option>
              <option value="7">Tháng 7</option>
              <option value="8">Tháng 8</option>
              <option value="9">Tháng 9</option>
              <option value="10">Tháng 10</option>
              <option value="11">Tháng 11</option>
              <option value="12">Tháng 12</option>
            </select><br />
            <button onClick={handleCreateTimeSheets}>Tạo</button>
          </div>
        </div>

        <div id="warning-modal" className={warningModalClass}>
          <div id="warning" className={warningClass}>
            <div className="title-warning">
              <span>Xóa nhân viên?</span>
            </div>
            <div className="content-warning">
              <div className="text-warning"><span>Bạn có chắc muốn xóa nhân viên này? Thao tác này không thể khôi phục.</span></div>
              <div className="button-warning">
                <button className="delete-permission" onClick={deleteEmployee}><span>Xóa</span></button>
                <div className="back" onClick={backconfirm}><span>Thoát</span></div>
              </div>
            </div>
          </div>
        </div>

        <div id="modal-salaryday" className={modalSalaryDayClass}>
          <div className="create-salaryday">
            <div className="title-salaryday"><div className="title-salaryday"><span >Điều chỉnh lương nhân viên</span></div> <div className="close"><span onClick={hiddenFormSalaryDay}>&times;</span></div></div>
            <div className="content-salaryday">
              <div className="form-group">
                <label>Lương hiện tại</label>
                <br />
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={salaryDay}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Lương điều chỉnh</label>
                <br />
                <input
                  placeholder="Lương Điều chỉnh"
                  name="address"
                  className="form-control"
                  onChange={changeSalaryDayAdjustment}
                />
              </div>
            </div>
            <button onClick={putSalaryDay}>Tạo</button>
          </div>
        </div>

        <div className="content-employees">
          <div className="filter">
            <FiltersForm onSubmit={handleFiltersChange} />
            <div className="action">
              <div className="select">
                <EmployeeFilters onSubmit={handleFiltersStatus} />
              </div>
              <div className="select">
                <RoleFilters onSubmit={handleFiltersRole} />
              </div>
              <div className="add-invoices">
                <button className="button-action" onClick={timesheet}>Bảng Công NV</button>
                {/* <button className="button-action" onClick={showCreateTimesheet}>Tạo bảng công</button> */}
                <div className="button-other" onClick={showButtonOther}>
                  <div className="title-button">
                    <span>Khác</span>
                    <ArrowDropDown style={{ width: "15px" }} />
                  </div>
                  <div id="content-button" className={buttonOtherClass}>
                    <button className="button-action" onClick={listRoles}>Chức vụ</button>
                  </div>
                </div>
              </div>
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
                      setEmployees(
                        employees.map(employee => {
                          employee.select = value;
                          return employee;
                        })
                      );
                    }}
                  ></input>
                </th>
                <th className="th-2">
                  <span>#</span>
                </th>
                <th className="th-3">
                  <span>Mã nhân viên</span>
                </th>
                <th className="th-4">
                  <span>Họ và tên</span>
                </th>
                <th className="th-5">
                  <span>Số điện thoại</span>
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
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="td-1">
                    <input
                      type="checkbox"
                      checked={employee.select}
                      onChange={e => {
                        let value = e.target.checked;
                        setEmployees(
                          employees.map(employeeCheck => {
                            if (employeeCheck.id === employee.id) {
                              employeeCheck.select = value;
                            }
                            return employeeCheck;
                          })
                        );
                      }}
                    />
                  </td>
                  <td className="td-2">
                    <span>{employee.id}</span>
                  </td>
                  <td className="td-3">
                    <span>{employee.code}</span>
                  </td>
                  <td className="td-4">
                    <span>{employee.name}</span>
                  </td>
                  <td className="td-5">
                    <span>{employee.phone}</span>
                  </td>
                  <td className="td-6">
                    <span>{employee.status}</span>
                  </td>
                  <td className="td-7">
                    <button
                      className="button-icon"
                      onClick={() => updateCategory(employee.id)}
                    >
                      <Edit style={{ width: "15px" }} /><div className="info-button"><span>Sửa thông tin nv</span></div>
                    </button>
                    <button
                      className="button-icon"
                      onClick={() => updateSalaryDay(employee)}
                    >
                      <EditAttributesTwoTone style={{ width: "15px" }} /><div className="info-button"><span>Điều chỉnh lương nv</span></div>
                    </button>
                    <button
                      className="button-icon"
                      onClick={() => deleteS(employee.id)}
                    >
                      <DeleteForever style={{ width: "15px" }} /><div className="info-button"><span>Xóa nhân viên</span></div>
                    </button>
                  </td>
                  <td></td>
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

    );
  }
}
