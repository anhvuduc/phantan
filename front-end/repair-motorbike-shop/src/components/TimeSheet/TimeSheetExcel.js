/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TimeSheetsService from 'services/TimeSheets.js';
import FileSaver from 'file-saver';
import 'assets/css/timesheets/timesheetExportExcel.css'


function TimeSheetExcel(props) {
    const [month, setMonth] = useState();

    // eslint-disable-next-line react/prop-types
    const [id, setId] = useState(props.match.params.id);

    const changeMonth = (event) => {
        setMonth(event.target.value);
    };
    const downTimesheet = (e) => {
        e.preventDefault();
        let timesheet = { month }

        console.log("Month => " + JSON.stringify(timesheet));
        TimeSheetsService.postTimesheetExcel(timesheet)
            .then((response) => {
                console.log(response.data)
                var blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                FileSaver.saveAs(blob, "TimeSheet.xlsx");
            })
            .catch(function (error) {

            });
    };

    const cancel = () => {
        props.history.push("/admin/employees/time-sheets");
    };

    return (
        <div className="body-timesheet-excel">
            <div className="add-new-category">
                <div className="title">
                    <span>Tạo Bảng công</span>
                </div>
                <div className="card-body">
                    <form>
                        <div className="group">
                            <div className="group-main">
                                <div className="form-group">
                                    <label>Chọn tháng để xuất file excel</label>
                                    <br />
                                    <select value={month} onChange={changeMonth} className="month-choose">
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
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-success" id="click" onClick={downTimesheet}>
                            Tạo
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={cancel}
                            style={{ marginLeft: "10px" }}
                        >
                            Trở lại
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}


export default TimeSheetExcel

