import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import '../../assets/css/search/InvoiceFilter.css'
import { ArrowDropDown } from '@material-ui/icons'

InvoiceFilterStatus.propTypes = {
  onSubmit: PropTypes.func,
}
InvoiceFilterStatus.defaultProps = {
  onSubmit: null,
}
function InvoiceFilterStatus(props) {
  const { onSubmit } = props;
  const [invoices, setInvoices] = useState([

  ]);
  const [invoiceClass, setInvoiceClass] = useState('');
  let listInvoice = [{
    select: false,
    id: 1,
    status: 1,
    name: "Chờ xử lý"
  },
  {
    select: false,
    id: 2,
    status: 2,
    name: "Đang chờ thợ"
  },
  {
    select: false,
    id: 3,
    status: 3,
    name: "Đang sửa"
  },
  {
    select: false,
    id: 4,
    status: 7,
    name: "Đang xét duyệt"
  }]
  useEffect(() => {
    async function fetchInvoice() {
      setInvoices(
        listInvoice.map((invoice) => {
          return {
            select: false,
            id: invoice.id,
            status: invoice.status,
            name: invoice.name,
          }
        }));
    }
    fetchInvoice();
  }, []);

  function hanleChangeInvoice() {
    const invoiceStatus = [];
    invoices.forEach(invoice => {
      if (invoice.select) {
        invoiceStatus.push(invoice.status);
      }
    });
    const formValues = {
      statusList: invoiceStatus,
    }
    onSubmit(formValues);
  }
  const showListStatus = () => {
    if (invoiceClass == '') {
      setInvoiceClass('button-content-filters-role')
    }
  }

  const hidenListStatus = () => {
    setInvoiceClass('')

  }


  return (
    <div className="button-select-invoices" onClick={showListStatus}>
      <div className="title-search"><span>Chọn trạng thái </span><ArrowDropDown style={{ marginTop: "5px" , width:"15px"}} /></div>
      <div id="button-content-filters-role" className={invoiceClass}>
        <div className="title-filters"><span className="filters-status">Lọc theo trạng thái</span><span onClick={hidenListStatus} className="close-filter">x</span></div>
        <table>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="td-1"><input
                className="input-1"
                type="checkbox"
                onChange={e => {
                  let value = e.target.checked;
                  setInvoices(
                    invoices.map(invoiceCheck => {
                      if (invoiceCheck.id === invoice.id) {
                        invoiceCheck.select = value;
                      }
                      return invoiceCheck;
                    })
                  );
                }} /></td>
              <td className="td-2"><span>{invoice.name}</span></td>
            </tr>
          ))}
        </table>
        <button onClick={hanleChangeInvoice}>Lọc</button>
      </div>
    </div>
  )
}


export default InvoiceFilterStatus

