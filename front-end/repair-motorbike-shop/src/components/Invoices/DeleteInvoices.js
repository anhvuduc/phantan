import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";

import "../../assets/css/employees/employee.css";
import 'assets/css/roles/CreateRole.css'
import '../../assets/css/search/InvoiceSearch.css'
import FiltersForm from "../FiltersForm/search.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbars from 'components/Snackbar/Snackbar.js';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DeleteIcon from '@material-ui/icons/Delete';
import InvoicesService from "services/InvoicesService";


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

function DeleteInvoice(props) {
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
  const [modalCustomerClass, setModalCustomerClass] = useState('');
  const [invoices, setInvoices] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [warningClass, setWarningClass] = useState('');
  const [warningModalClass, setWarningModalClass] = useState('');
  
  const [idInvoice, setIdInvoice] = useState();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 10,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: "",
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


  useEffect(() => {
    async function fetchInvoicesList() {
      try {
        InvoicesService.getInvoiceCanDelete(filters).then((res) => {
          let invoices = res.data.invoiceListResponseDTOS;
          console.log(res.data);
          setInvoices(
            invoices.map((invoice) => {
              return {
                select: false,
                id: invoice.id,
                code: invoice.code,
                licensePlate: invoice.licensePlate,
                fixerName: invoice.fixerName,
                status: invoice.status,
              }
            }))
          setPagination(pagination);
          console.log(pagination);
        });
        setIsLoaded(true);
      } catch (error) {
        console.log("Failed to fetch Invoicce list: ", error.message);
        setError(error);
      }
    }
    fetchInvoicesList();
  }, [filters]);

  function deleteInvoiceConfirm(id){
    setIdInvoice(id)
    if (warningClass == '') {
        setWarningClass('warning');
        setWarningModalClass('warning-modal');
    } else {
        setWarningClass('');
        setWarningModalClass('');
    }
  }

  const backFormConfirm = () => {
    if (warningClass == '') {
        setWarningClass('warning');
        setWarningModalClass('warning-modal');
    } else {
        setWarningClass('');
        setWarningModalClass('');
    }
  }

    const deleteInvoice = (id) =>{
        InvoicesService.deleteInvoice(id)
        .then(() => {
          window.location.reload();
        })
        .catch(function (error) {
            if (error.response.data.errors) {
                console.log(error.response.data.errors[0].defaultMessage);
            } else {
                console.log(error.response.data.message);
            }
        });
    }

    const back = () => {
        props.history.push('/admin/invoices');
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading....</div>;
    } else {
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Danh sách hóa đơn</h4>
                    <p className={classes.cardCategoryWhite}>
                        Danh sách hóa đơn có thể hủy
                    </p>
                    </CardHeader>
                    <CardBody>
                        <div>
                        <div className="filter">
                        <FiltersForm onSubmit={handleFiltersChange} />
                        <div className="select">

                        </div>
                        <div className="select-role">

                        </div>
                        <div className="add-employee">
                                <button className="button-payment-back" onClick={back}>Trở lại</button>
                        </div>
                        <Snackbars
                            place="tc"
                            color="warning"
                            message="Thành công!"
                            open={tl}
                            closeNotification={() => setTl(false)}
                            close
                        />
                        </div>
                        <table className="table">
                        <thead>
                            <tr>
                            <th>
                                <input
                                type="checkbox"
                                onChange={e => {
                                    let value = e.target.checked;
                                    setInvoices(
                                    invoices.map(invoice => {
                                        invoice.select = value;
                                        return invoice;
                                    })
                                    );
                                }}
                                ></input>
                            </th>
                            <th>
                                <span>Id</span>
                            </th>
                            <th>
                                <span>Mã hóa đơn</span>
                            </th>
                            <th>
                                <span>Biển số</span>
                            </th>
                            <th>
                                <span>Nhân viên</span>
                            </th>
                            <th>
                                <span>Trạng thái</span>
                            </th>
                            <th>
                                <span>Hoạt động</span>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <input
                                type="checkbox"
                                checked={invoice.select}
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
                                }}
                                />
                                <td>
                                <span>{invoice.id}</span>
                                </td>
                                <td>
                                <span>{invoice.code}</span>
                                </td>
                                <td>
                                <span>{invoice.licensePlate}</span>
                                </td>
                                <td>
                                <span>{invoice.fixerName}</span>
                                </td>
                                <td>
                                <span>{invoice.status}</span>                       
                                </td>
                                <td>
                                <button
                                    style={{ border: "0px" }}
                                    onClick={() => deleteInvoice(invoice.id)}
                                >
                                    <DeleteIcon style={{ width: "15px" }} />
                                </button>

                                </td>
                                <td></td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                        <LimitPagination onSubmit={handleChangeLimit} />
                        <Pagination
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        />
                    </div>
                    </CardBody>
                </Card>
                </GridItem>

            </GridContainer>
        );
    }
}
export default DeleteInvoice;