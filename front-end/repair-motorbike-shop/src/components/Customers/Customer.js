/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/customers/customer.css";
import FiltersForm from "../FiltersForm/CustomerSearch.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
import {NavigateBefore} from "@material-ui/icons";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons

import Snackbars from 'components/Snackbar/Snackbar.js';

import Edit from "@material-ui/icons/Edit";
import CustomerService from "services/Customers";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
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
      lineHeight: "1",
    },
  },
};


const useStyles = makeStyles(styles);

export default function (props) {
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

  const [message, setMessage] = useState('');
  const [tl, setTl] = React.useState(false);

  const [customers, setCustomers] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [modalCustomerClass, setModalCustomerClass] = useState('');

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState();


  const changeName = (event) => {
    setName(event.target.value);
  };
  const changePhone = (event) => {
    setPhone(event.target.value);
  };

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 12,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: ""
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
    async function fetchCustomerList() {
      try {
        CustomerService.getlistCustomer(filters).then((res) => {
          const data = res.data.customerDTOS;
          const pagination = res.data.pagination;

          setCustomers(
            data.map((customer) => {
              return {
                select: false,
                id: customer.id,
                code: customer.code,
                name: customer.name,
                phone: customer.phone
              }
            }))
          setPagination(pagination);
          console.log(data);
          console.log(pagination);
          setIsLoaded(true);
        }).catch(function (error) {
          console.log("ERROR: " +error.response.data.status)
          if(error.response.data.status == 403){
            alert("Không có quyền truy cập!")
          }
        })
      } catch (error) {
        console.log("Failed to fetch customer list: ", error.message);
        setError(error);
      }
    }
    fetchCustomerList();
  }, [filters]);

  const putCustomer = (e) => {
    e.preventDefault();
    let customer = { name,phone};
    console.log("customer => " + JSON.stringify(customer));
    CustomerService.updateCustomer(id, customer)
      .then(() => {
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          setMessage(error.response.data.errors[0].defaultMessage)
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setTl(false)
            },
            3000
          );
        } else {
          setMessage(error.response.data.message)
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setTl(false)
            },
            3000
          );
        }
      });
    };

    const back = () => {
        props.history.push('/admin/customers');
    }

    const updateCustomer = (customer) => {
      setId(customer.id);
      setName(customer.name);
      setPhone(customer.phone);
      if(modalCustomerClass == ''){
        setModalCustomerClass('modal-customers')
      }
    }

    const hiddenFormCustomer = () =>{
      setModalCustomerClass('')
    }

    const classes = useStyles();



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <div className="list-customers">
        <div className="title-customers">
          <div className="name-title">
            <div className="button-cancel" onClick={back}>
                <NavigateBefore style={{ width: "15px" }} /> <span>Quay lại</span>
            </div>
            <div className="name-title"><span>Danh sách khách hàng</span></div>
          </div>
        </div>
        <div className="content-customers">
          <Snackbars
            place="tc"
            color="warning"
            message={message}
            open={tl}
            closeNotification={() => setTl(false)}
            close
          />
          <div id="modal-customers" className={modalCustomerClass}>
            <div className="create-customers">
              <div className="title-add-customers"><div className="title-customers"><span >Sửa thông tin khách hàng</span></div> <div className="close"><span onClick={hiddenFormCustomer}>&times;</span></div></div>
              <div className="content-customers">
                  <div className="form-group">
                    <label>Tên khách hàng</label>
                    <br />
                    <input
                      placeholder="Tên khách hàng"
                      name="name"
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={changeName}
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại<span style={{ color: "red" }}>*</span></label>
                    <br />
                    <input
                      placeholder="Điền số điện thoại của khách hàng"
                      name="phone"
                      className="form-control"
                      value={phone}
                      onChange={changePhone}
                    />
                  </div>
              </div>
              <button onClick={putCustomer}>Sửa</button>
            </div>
          </div>
          <div className="filter">
            <FiltersForm onSubmit={handleFiltersChange} />
          </div>
          <div className="hight-table">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <span>#</span>
                  </th>
                  <th>
                    <span>Mã khách hàng</span>
                  </th>
                  <th>
                    <span>Tên Khách hàng</span>
                  </th>
                  <th>
                    <span>Số điện thoại</span>
                  </th>
                  <th className="th-7">
                    <span></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="td-2">
                      <span>{customer.id}</span>
                    </td>
                    <td className="td-3">
                      <span>{customer.code}</span>
                    </td>
                    <td className="td-4">
                      <span>{customer.name}</span>
                    </td>
                    <td className="td-4">
                      <span>{customer.phone}</span>
                    </td>
                    <td className="td-7">
                        <button
                          className="button-icon"
                          onClick={() => updateCustomer(customer)}
                        >
                          <Edit style={{ width: "15px" }} /><div  className="info-button"><span>Sửa thông tin KH</span></div>
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
              <span>Hiển thị </span><LimitPagination onSubmit={handleChangeLimit} /> <span  style={{marginTop: "21px"}}> kết quả</span>
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
    );
  }
}
