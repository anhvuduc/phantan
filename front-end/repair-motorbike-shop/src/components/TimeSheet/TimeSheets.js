/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from 'react'
import FiltersForm from "../FiltersForm/search.js";
import Pagination from 'components/Pagination/pagination.js';
import TimeSheetsService from 'services/TimeSheets.js';
import '../../assets/css/timesheets/timesheets.css'

import Edit from "@material-ui/icons/Edit";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import MonthFilters from '../../components/FiltersForm/monthFilters.js';
import { ArrowDropDown, NavigateBefore, Equalizer, LocalCafe, People, Receipt, Store, Dashboard, Person, ViewWeek, ViewAgendaTwoTone, EditAttributesTwoTone, SortTwoTone } from "@material-ui/icons";
import Snackbars from 'components/Snackbar/Snackbar.js';
import LimitPagination from 'components/Pagination/limitPagination.js';

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

function TimeSheets(props) {
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
    const [timesheets, setTimesheets] = useState([]);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [buttonOtherClass, setButtonOtherClass] = useState('');
    const [modalTimeSheetClass, setModalTimeSheetClass] = useState('');
    const [month, setMonth] = useState('');

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [code, setCode] = useState();
    const [numberShiftsWork, setNumberShiftsWork] = useState();
    const [numberShiftsLateWork, setNumberShiftsLateWork] = useState();
    const [status, setStatus] = useState();
    const changeNumberShiftsWork = (event) => {
        setNumberShiftsWork(event.target.value);
    };
    const changeNumberShiftsLateWork = (event) => {
        setNumberShiftsLateWork(event.target.value);
    };

    const changeStatus = (event) => {
        if (event.target.value == 1) {
            setStatus(2)
        } else {
            setStatus(1)
        }
    }
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
        month: 1,
        sort: 0,
        column: 0,
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
            _page: 1,
            keyword: newFilters.keyword,
        });
    }
    function handleMonthFilters(newMonth) {
        console.log("New Month: ", newMonth);
        setFilters({
            ...filters,
            _page: 1,
            month: newMonth.month,
        });
    }
    function handleChangeLimit(newLimit) {
        console.log("New Month: ", newLimit);
        setFilters({
            ...filters,
            _page: 1,
            limit: newLimit.limit,
        });
    }
    const changeSort = (column) => {
        if (filters.sort == 1) {
            setFilters({
                ...filters,
                page: 1,
                sort: 2,
                column: column,
            })
        } else {
            setFilters({
                ...filters,
                page: 1,
                sort: 1,
                column: column,
            })
        }


    }

    // H??m l???y list c??ng c???a nh??n vi??n 
    useEffect(() => {
        async function fetchTimeSheet() {
            try {
                TimeSheetsService.getListTimesheet(filters).then((res) => {
                    const data = res.data.userTimeSheetDTOResponseList;
                    const pagination = res.data.pagination;

                    setPagination(pagination);
                    setIsLoaded(true);

                    setTimesheets(
                        data.map((timesheet) => {
                            return {
                                select: false,
                                id: timesheet.id,
                                code: timesheet.code,
                                name: timesheet.name,
                                numberShiftsWork: timesheet.numberShiftsWork,
                                numberShiftsLateWork: timesheet.numberShiftsLateWork,
                                month: timesheet.month,
                                salary: timesheet.salary,
                                status: timesheet.status
                            }
                        }))
                });


            } catch (error) {
                console.log("Failed to fetch timesheet list: ", error.message);
                setError(error);
            }
        }
        fetchTimeSheet();
    }, [filters]);

    // h??m onclick thay tr???ng th??i th??nh ???? tr??? l????ng
    const handleChangeStatus = (e) => {
        e.preventDefault();
        const ids = [];
        timesheets.forEach(timesheet => {
            if (timesheet.select) {
                ids.push(timesheet.id);
            }
        });

        if (ids.length != 0) {
            let timesheetId = { ids }
            TimeSheetsService.putStatusTimesheet(timesheetId)
                .then(() => {
                    setTimesheets(
                        timesheets.map(timesheet => {
                            timesheet.select = false;
                            return timesheet;
                        })
                    );
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error.response)
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
            console.log("ArrayID: " + timesheetId.ids)
        } else {
            alert("Kh??ng c?? l???a ch???n n??o! Vui l??ng ch???n l???i!")
        }
    }

    // H??m ??i???m danh ng??y ??i l??m mu???n
    const handleChangeWorkLate = (e) => {
        e.preventDefault();
        const ids = [];
        timesheets.forEach(timesheet => {
            if (timesheet.select) {
                ids.push(timesheet.id);
            }
        });

        if (ids.length != 0) {
            let timesheetId = { ids }
            TimeSheetsService.putWorkLateTimesheet(timesheetId)
                .then(() => {
                    setTimesheets(
                        timesheets.map(timesheet => {
                            timesheet.select = false;
                            return timesheet;
                        })
                    );
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error.response)
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
            console.log("ArrayID: " + timesheetId.ids)
        } else {
            alert("Kh??ng c?? l???a ch???n n??o! Vui l??ng ch???n l???i!")
        }
    }
    //H??m th??m 1 c??ng cho nh??n vi??n
    const attendance = (e) => {
        e.preventDefault();
        const ids = [];
        timesheets.forEach(timesheet => {
            if (timesheet.select) {
                ids.push(timesheet.id);
            }
        });

        if (ids.length != 0) {
            let timesheetId = { ids }
            TimeSheetsService.putWorkTimesheet(timesheetId)
                .then(() => {
                    setTimesheets(
                        timesheets.map(timesheet => {
                            timesheet.select = false;
                            return timesheet;
                        })
                    );
                    window.location.reload();
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
            console.log("ArrayID: " + timesheetId.ids)
        } else {
            alert("Kh??ng c?? l???a ch???n n??o! Vui l??ng ch???n l???i!")
        }

    }

    const showCreateTimesheet = () => {
        if (modalTimeSheetClass == '') {
            setModalTimeSheetClass('modal-timesheet')
        }
    }
    const saveTimesheet = (e) => {
        e.preventDefault();
        let timesheet = { month }
        console.log("Month => " + JSON.stringify(timesheet));
        TimeSheetsService.postTimesheet(timesheet)
            .then(() => {
                setModalTimeSheetClass('')
                setFilters({
                    ...filters,
                })
                setMessage("T???o b???ng c??ng th??ng " + month + " th??nh c??ng")
                setTl(true);
                // use this to make the notification autoclose
                setTimeout(
                    function () {
                        setTl(false)
                    },
                    3000
                );
            })
    }


    const editEmployee = (e) => {
        e.preventDefault();
        console.log(numberShiftsWork);
        console.log(numberShiftsLateWork);
        console.log(status);
        let timesheet = { numberShiftsWork, numberShiftsLateWork, status };
        console.log("employee => " + JSON.stringify(timesheet));
        TimeSheetsService.putTimesheet(id, timesheet)
            .then(() => {
                window.location.reload();
                setModalTimeSheetClass('')
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
    const exprortExcel = () => {
        props.history.push('/admin/employees/time-sheets/export-excel');
    }
    const addTimeSheet = () => {
        if (modalTimeSheetClass == '') {
            setModalTimeSheetClass('modal-timesheet')
        }
    }

    const editTimeSheet = (timesheet) => {
        setId(timesheet.id)
        TimeSheetsService.getTimesheetById(timesheet.id).then((res) => {
            let timesheet = res.data;
            console.log(timesheet);

            setCode(timesheet.code);
            setName(timesheet.name);
            setNumberShiftsWork(timesheet.numberShiftsWork);
            setNumberShiftsLateWork(timesheet.numberShiftsLateWork);
            setMonth(timesheet.month);
            setStatus(timesheet.status);
        });
        if (modalTimeSheetClass == '') {
            setModalTimeSheetClass('modal-edit-timesheet')
        }
    }

    const changeMonth = (e) => {
        setMonth(e.target.value)
    }

    const hiddenFormTimeSheet = () => {
        setCode();
        setName();
        setNumberShiftsWork();
        setNumberShiftsLateWork();
        setMonth();
        setStatus();
        setModalTimeSheetClass('')
    }

    const checkStatus = (status) => {
        if (status == 2) {
            return <input type="checkbox" checked name="status" value={status} onChange={changeStatus} />
        } else {
            return <input type="checkbox" name="status" value={status} onChange={changeStatus} />
        }
    }

    const cancel = () => {
        props.history.push('/admin/employees')
    }

    const classes = useStyles();

    const hiddenFormRole = () => {
        setModalTimeSheetClass('')
    }
    const changeCreateTimeSheet = (e) => {
        setMonth(e.target.value)
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading....</div>;
    } else {
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <div className="list-timesheets">
                        <div className="title-employees">
                            <div className="name-title">
                                <div
                                    className="button-cancel"
                                    onClick={cancel}
                                >
                                    <NavigateBefore style={{ width: "15px" }} /> <span>Quay l???i</span>
                                </div>
                                <div className="name-list"><span>Danh s??ch b???ng c??ng</span></div>
                            </div>
                            <div className="add-new-invoice"><button className="button-add" onClick={addTimeSheet}>T???o b???ng c??ng</button></div>
                        </div>

                        <div id="modal-timesheet" className={modalTimeSheetClass}>
                            <div className="create-timesheet">
                                <div className="title-add-timesheet"><div className="title-timesheet"><span >Th??m b???ng c??ng</span></div> <div className="close"><span onClick={hiddenFormTimeSheet}>&times;</span></div></div>
                                <select value={month} onChange={changeMonth}>
                                    <option value="1">Th??ng 1</option>
                                    <option value="2">Th??ng 2</option>
                                    <option value="3">Th??ng 3</option>
                                    <option value="4">Th??ng 4</option>
                                    <option value="5">Th??ng 5</option>
                                    <option value="6">Th??ng 6</option>
                                    <option value="7">Th??ng 7</option>
                                    <option value="8">Th??ng 8</option>
                                    <option value="9">Th??ng 9</option>
                                    <option value="10">Th??ng 10</option>
                                    <option value="11">Th??ng 11</option>
                                    <option value="12">Th??ng 12</option>
                                </select><br />
                                <button onClick={saveTimesheet}>T???o</button>
                            </div>
                        </div>

                        <div id="modal-edit-timesheet" className={modalTimeSheetClass}>
                            <div className="create-edit-timesheet">
                                <div className="title-add-edit-timesheet"><div className="title-edit-timesheet"><span >S???a th??ng tin c??ng c???a nh??n vi??n</span></div> <div className="close"><span onClick={hiddenFormTimeSheet}>&times;</span></div></div>
                                <div className="content-edit-timesheet">
                                    <div className="info-user">
                                        <table>
                                            <tr>
                                                <th>T??n </th>
                                                <td>: </td>
                                                <td>{name}</td>
                                            </tr>
                                            <tr>
                                                <th>M?? </th>
                                                <td>: </td>
                                                <td>{code}</td>
                                            </tr>
                                            <tr>
                                                <th>Th??ng </th>
                                                <td>: </td>
                                                <td>{month}</td>
                                            </tr>

                                        </table>
                                        <form>
                                            <div className="group">
                                                <div className="group-main">
                                                    <div className="form-group">
                                                        <label>S??? c??ng ???? l??m: </label>
                                                        <br />
                                                        <input
                                                            name="name"
                                                            type="text"
                                                            className="form-control"
                                                            value={numberShiftsWork}
                                                            onChange={changeNumberShiftsWork}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>S??? c??ng mu???n: </label>
                                                        <br />
                                                        <input
                                                            name="address"
                                                            className="form-control"
                                                            value={numberShiftsLateWork}
                                                            onChange={changeNumberShiftsLateWork}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="check-status">
                                                    {checkStatus(status)}
                                                    <label>???? tr??? l????ng</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <button onClick={editEmployee}>T???o</button>
                            </div>
                        </div>

                        <div className="content-employees">
                            <Snackbars
                                place="tc"
                                color="warning"
                                message={message}
                                open={tl}
                                closeNotification={() => setTl(false)}
                                close
                            />

                            <div className="filter">
                                <FiltersForm onSubmit={handleFiltersChange} />
                                <div className="action">
                                    <div className="select">
                                        <MonthFilters onSubmit={handleMonthFilters} />
                                    </div>
                                    <div className="add-invoices">
                                        <button className="button-action" onClick={attendance}>??i???m danh</button>
                                        <button className="button-action" onClick={handleChangeWorkLate}>????nh d???u ??i mu???n</button>
                                        <div className="button-other" onClick={showButtonOther}>
                                            <div className="title-button">
                                                <span>Kh??c</span>
                                                <ArrowDropDown style={{ width: "15px" }} />
                                            </div>
                                            <div id="content-button" className={buttonOtherClass}>
                                                <button className="button-action" onClick={handleChangeStatus}>Tr??? l????ng</button>
                                                <button className="button-action" onClick={exprortExcel}>Xu???t Excel</button>
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
                                                    setTimesheets(
                                                        timesheets.map(timesheet => {
                                                            timesheet.select = value;
                                                            return timesheet;
                                                        })
                                                    );
                                                }}
                                            ></input>
                                        </th>
                                        <th className="th-2">
                                            <span>#</span>
                                        </th>
                                        <th className="th-3">
                                            <span>M??</span>
                                        </th>
                                        <th className="th-4">
                                            <span>H??? v?? t??n</span>
                                        </th>
                                        <th className="th-5">
                                            <span>S??? c??ng ?????t ???????c</span> <SortTwoTone onClick={() => changeSort(1)} style={{ width: "15px", marginLeft: "5px", position: "absolute", cursor: "pointer" }} />
                                        </th>
                                        <th className="th-6">
                                            <span>S??? c??ng mu???n</span> <SortTwoTone onClick={() => changeSort(2)} style={{ width: "15px", marginLeft: "5px", position: "absolute", cursor: "pointer" }} />
                                        </th>
                                        <th className="th-7">
                                            <span>Th??ng</span>
                                        </th>
                                        <th className="th-8">
                                            <span>L????ng t???m t??nh</span>
                                        </th>
                                        <th className="th-9">
                                            <span>Tr???ng th??i</span>
                                        </th>
                                        <th className="th-10">
                                            <span></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {timesheets.map((timesheet) => (
                                        <tr key={timesheet.id}>
                                            <td className="td-1">
                                                <input
                                                    type="checkbox"
                                                    checked={timesheet.select}
                                                    onChange={e => {
                                                        let value = e.target.checked;
                                                        setTimesheets(
                                                            timesheets.map(timesheetCheck => {
                                                                if (timesheetCheck.id === timesheet.id) {
                                                                    timesheetCheck.select = value;
                                                                }
                                                                return timesheetCheck;
                                                            })
                                                        );
                                                    }}
                                                />
                                            </td>
                                            <td className="td-2">
                                                <span>{timesheet.id}</span>
                                            </td>
                                            <td className="td-3">
                                                <span>{timesheet.code}</span>
                                            </td>
                                            <td className="td-4">
                                                <span>{timesheet.name}</span>
                                            </td>
                                            <td className="td-5">
                                                <span>{timesheet.numberShiftsWork}</span>
                                            </td>
                                            <td className="td-6">
                                                <span>{timesheet.numberShiftsLateWork}</span>
                                            </td>
                                            <td className="td-7">
                                                <span>{timesheet.month}</span>
                                            </td>
                                            <td className="td-9">
                                                <span>{timesheet.salary}</span>
                                            </td>
                                            <td className="td-9">
                                                <span>{timesheet.status}</span>
                                            </td>
                                            <td className="td-10">
                                                <button
                                                    onClick={() => editTimeSheet(timesheet)}
                                                    className="button-icon"
                                                >
                                                    <Edit style={{ width: "15px" }} /><div className="info-button"><span>S???a th??ng tin c??ng nv</span></div>
                                                </button>
                                            </td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="pagination-limit">
                                <div className="limit">
                                    <span>Hi???n th??? </span><LimitPagination onSubmit={handleChangeLimit} /> <span style={{ marginTop: "21px" }}> k???t qu???</span>
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

export default TimeSheets

