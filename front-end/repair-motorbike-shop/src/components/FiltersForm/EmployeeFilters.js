import React,{useState} from 'react'
import PropTypes from 'prop-types'
import '../../assets/css/search/employeeFilters.css'
import { ArrowDropDown } from "@material-ui/icons";

EmployeeFilters.propTypes = {
    onSubmit: PropTypes.func,
}
EmployeeFilters.defaultProps = {
    onSubmit: null,
}
function EmployeeFilters(props) {
    const { onSubmit } = props;
    const [status, setStatus] = useState();


    function handleChangeStatus(e) {
        const value = e.target.value;
        
        console.log(status);
        setStatus(value);
        const formValues = {
            status: value,
        }
        onSubmit(formValues);
    }


    return (
        <div className="button-select-status">
            <div className="title-select"><span>Chọn Trạng thái</span> <ArrowDropDown style={{width: "15px"}}/></div>
            <div className="button-content">
                <span>Lọc theo trạng thái</span> 
                <table>
                    <tr>
                        <td><input name={status} className="input-1" type="radio" value="1" onChange={handleChangeStatus}/></td>
                        <td><label>NV đang làm</label></td>
                    </tr>
                    <tr>
                        <td><input name={status} className="input-2" type="radio" value="2" onChange={handleChangeStatus}/></td>
                        <td><label>NV đã nghỉ</label></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}


export default EmployeeFilters

