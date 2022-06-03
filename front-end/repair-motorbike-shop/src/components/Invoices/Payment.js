import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";

import "../../assets/css/invoices/Payment.css";
import FiltersForm from "../FiltersForm/search.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbars from 'components/Snackbar/Snackbar.js';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { ArrowDropDown, NavigateBefore, Equalizer, LocalCafe, People, Receipt, Store, Dashboard, Person, ViewWeek, ViewAgendaTwoTone, EditAttributesTwoTone, Delete } from "@material-ui/icons";
import PaymentIcon from '@material-ui/icons/Payment';
import InvoicesService from "services/InvoicesService";
import InvoiceFilterPayment from "components/FiltersForm/InvoiceFilterPayment";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
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
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Payments(props) {
  const classes = useStyles();

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
  const [tl, setTl] = React.useState(false);

  const [invoices, setInvoices] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 10,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: [4]
  });
  function handlePageChange(newPage) {
    // console.log("new page: ", newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }
  function handleFiltersChange(newFilters) {
    // console.log("New filters: ", newFilters);
    setFilters({
      ...filters,
      _page: 1,
      keyword: newFilters.keyword,
    });
  }
  function handleChangeLimit(newLimit) {
    // console.log("New Month: ", newLimit);
    setFilters({
      ...filters,
      _page: 1,
      limit: newLimit.limit,
    });
  }
  function handleChangeInvoice(newStatus) {
    console.log("New Status: ", newStatus);
    setFilters({
      ...filters,
      page: 1,
      status: newStatus.statusList,
    });
  }

  useEffect(() => {
    async function fetchInvoicesList() {
      try {
        console.log("filters: " + filters.status)
        InvoicesService.getInvoiceInProcess(filters).then((res) => {
          let invoices = res.data.invoiceMaterialResponseDTOS;
          const pagination = res.data.pagination;
          console.log(res.data);
          setInvoices(
            invoices.map((invoice) => {
              return {
                select: false,
                id: invoice.id,
                code: invoice.code,
                licensePlate: invoice.licensePlate,
                fixerName: invoice.fixerName,
                name: invoice.name,
                phone: invoice.phone,
                status: invoice.status,
              }
            }))
          setPagination(pagination);
          console.log(pagination);
          setIsLoaded(true);
        }).catch(function (error) {
          console.log("ERROR: " + error.response.data.status)
          if (error.response.data.status == 403) {
            alert("Không có quyền truy cập!")
          }
        })
      } catch (error) {
        console.log("Failed to fetch Invoicce list: ", error.message);
        setError(error);
      }
    }
    fetchInvoicesList();
  }, [filters]);

  const editInvoice = (id) => {
    props.history.push(`/admin/invoices/edit-invoice-in-process/${id}`)
  }

  const paymentInvoice = (id) => {
    props.history.push(`/admin/invoices/payment/${id}`)
  }

  const paymentInvoiceBuyMaterial = () => {
    props.history.push('/admin/invoices-buy-material')
  }

  const back = () => {
    props.history.push('/admin/invoices');
  }

  const colorStatusInvoice = status => {
    if (status.localeCompare("Đã thanh toán") == 0) {
      return <span style={{ color: "#3c91f1" }}>{status}</span>
    } else if (status.localeCompare("Chờ thanh toán") == 0) {
      return <span style={{ color: "#35df24" }}>{status}</span>
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className="list-invoices-payment">
            <div className="title-invoices-payment">
              <div className="name-title">

                <div
                  className="button-cancel"
                  onClick={back}
                >
                  <NavigateBefore style={{ width: "15px" }} /> <span>Quay lại</span>
                </div>
                <div className="name-list"><span>Danh sách phiếu sửa chữa chờ thanh toán</span></div>

              </div>
            </div>

            <div className="content-invoices-payment">
              <Snackbars
                place="tc"
                color="info"
                message="Thành công!"
                open={tl}
                closeNotification={() => setTl(false)}
                close
              />
              <div className="filter">
                <FiltersForm onSubmit={handleFiltersChange} />
                <div className="action">
                  <div className="select">
                    <InvoiceFilterPayment onSubmit={handleChangeInvoice} />
                  </div>
                  
                </div>
                

              </div>
              <div className="hight-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="th-1">
                        <span>#</span>
                      </th>
                      <th className="th-2">
                        <span>Mã phiếu</span>
                      </th>
                      <th className="th-3">
                        <span>Biển số</span>
                      </th>
                      <th className="th-4">
                        <span>Nhân viên</span>
                      </th>
                      <th className="th-5">
                        <span>Tên KH</span>
                      </th>
                      <th className="th-5">
                        <span>Số điện thoại KH</span>
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
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="td-1">
                        <span>{invoice.id}</span>
                        </td>
                        <td className="td-2">
                          <span>{invoice.code}</span>
                        </td>
                        <td className="td-3">
                          <span>{invoice.licensePlate}</span>
                        </td>
                        <td className="td-4">
                          <span>{invoice.fixerName}</span>
                        </td>
                        <td className="td-5">
                          <span>{invoice.name}</span>
                        </td>
                        <td className="td-6">
                          <span>{invoice.phone}</span>
                        </td>
                        <td className="td-6">
                          {colorStatusInvoice(invoice.status)}
                        </td>
                        <td className="td-7">
                          <button
                            className="button-icon"
                            onClick={() => paymentInvoice(invoice.id)}
                          >
                            <PaymentIcon style={{ width: "15px" }} /><div className="info-button"><span>Thanh Toán</span></div>
                          </button>
                        </td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
        </GridItem>

      </GridContainer>
    );
  }
}
