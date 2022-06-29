import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../../assets/css/pagination/limit.css'

LimitPagination.propTypes = {
    onSubmit: PropTypes.func,
}
LimitPagination.defaultProps = {
    onSubmit: null,
}

function LimitPagination(props) {
    const { onSubmit } = props;
    const [limit, setLimit] = useState();

    function handleChangeLimit(e) {
        const value = e.target.value;
        setLimit(value);
        const formValues = {
            limit: value,
        }
        onSubmit(formValues);
    }
    return (
        <div className="limit-pagination">
            <select value={limit} onChange={handleChangeLimit}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    )
}

LimitPagination.propTypes = {

}

export default LimitPagination

