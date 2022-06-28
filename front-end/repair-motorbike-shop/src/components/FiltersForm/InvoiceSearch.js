import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useRef } from 'react';
import '../../assets/css/search/InvoiceSearch.css'
import { Search } from '@material-ui/icons';

InvoiceSearch.propTypes = {
    onSubmit: PropTypes.func,
}
InvoiceSearch.defaultProps = {
    onSubmit: null,
}
export default function InvoiceSearch(props) {

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
        <div className="search-customer">
            <form>
                <div className="search-invoice">
                    <Search className="icon-search" />
                    <input 
                        type="text"
                        value={keyword}

                        onChange={handleSearchTermChange}
                        placeholder="Tìm kiếm theo biển số xe"
                    />
                </div>
            </form>
            <div className="info-customers">
                <div className="license-plate"><span>AAAA</span></div>
                <div className="license-plate"><span>AAAA</span></div>
                <div className="license-plate"><span>AAAA</span></div>
                <div className="license-plate"><span>AAAA</span></div>
                <div className="license-plate"><span>AAAA</span></div>
                <div className="license-plate"><span>AAAA</span></div>
            </div>
        </div>
    )
}
