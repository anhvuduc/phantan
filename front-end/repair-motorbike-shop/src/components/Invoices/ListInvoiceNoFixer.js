import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";

import "../../assets/css/employees/employee.css";
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
import { Equalizer, LocalCafe, People, Receipt, Store , Dashboard, Person} from "@material-ui/icons";
import Edit from "@material-ui/icons/Edit";
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

export default function ListInvoiceNoFixer(props) {
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
      page: 1,
      keyword: newFilters.keyword,
    });
  }
  function handleChangeLimit(newLimit) {
    // console.log("New Month: ", newLimit);
    setFilters({
      ...filters,
      page: 1,
      limit: newLimit.limit,
    });
  }

  useEffect(() => {
    async function fetchInvoicesList() {
      try {
          console.log("Filter; " +filters.page +filters.limit);
        InvoicesService.listInvoiceNoFixer(filters).then((res) => {
          let invoices = res.data.invoiceListResponseDTOS;
          let pagination = res.data.pagination;
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

  const receiptInvoice = (id) =>{
    props.history.push(`/admin/invoices/fixer-invoice/${id}`)
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
                Danh sách hóa đơn đang xử lý của cửa hàng
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

                  <Snackbars
                    place="tc"
                    color="info"
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
                        <span>#</span>
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
                            onClick={() => receiptInvoice(invoice.id)}
                          >
                            <Receipt style={{ width: "15px" }} />
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
