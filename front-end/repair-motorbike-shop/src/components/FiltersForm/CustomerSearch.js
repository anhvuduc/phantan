import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useRef } from 'react';
import '../../assets/css/search/search.css';

FiltersForm.propTypes = {
    onSubmit: PropTypes.func,
}
FiltersForm.defaultProps = {
    onSubmit: null,
}
function FiltersForm(props) {

    const { onSubmit } = props;
    const [keyword, setKeyword] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setKeyword(value);

        if (!onSubmit) return;

        //Set --100 --clear, set --300 -> submit
        //Set --300 --> submit
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                keyword: value,
            }
            onSubmit(formValues);
        }, 300);
    }

    return (
        <form>
            <input
                className="search"
                type="text"
                value={keyword}
                onChange={handleSearchTermChange}
                placeholder="Tìm kiếm theo mã, tên khách hàng, số điện thoại"
            />
        </form>
    )
}
export default FiltersForm;


