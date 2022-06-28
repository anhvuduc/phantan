import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/css/pagination/pagination.css'
import { ArrowDropDown, NavigateBefore, NavigateBeforeSharp, NavigateNext, NextWeek, People, SkipNext } from "@material-ui/icons";

Pagination.prototype = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
}

Pagination.defaultProps = {
    onPageChange: null,
};

export default function Pagination(props) {
    const { pagination, onPageChange } = props;
    const { page, limit, totalRows } = pagination
    const totalPages = Math.ceil(totalRows / limit);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPages); i++) {
        pageNumbers.push(i)
    }

    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }


    return (
        <div style={{ display: "flex", width: "400px", margin: "auto" }}>
            <ul id="page-numbers">
                <li>
                    <button
                        disabled={page <= 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        <NavigateBefore style={{ width: "15px" }} />
                    </button>
                </li>
                {
                    pageNumbers.map(number => {
                        if (page === number) {
                            return (
                                <li key={number} id={number} className="active">
                                    <button style={{ background: "#bbbbbb" }}>{number}</button>
                                </li>
                            )
                        }
                        else {
                            return (
                                <li key={number} id={number} onClick={() => handlePageChange(number)} >
                                    <button>{number}</button>
                                </li>
                            )
                        }
                    })
                }
                <li>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        <NavigateNext style={{ width: "15px" }} />
                    </button>
                </li>
            </ul>
        </div>
    )
}
