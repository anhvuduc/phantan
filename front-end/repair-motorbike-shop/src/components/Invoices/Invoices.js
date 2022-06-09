import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";

import "../../assets/css/invoices/invoices.css";
import FiltersForm from "../FiltersForm/SearchInvoice.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbars from 'components/Snackbar/Snackbar.js';

import { ArrowDropDown, Delete, NavigateBefore, NavigateBeforeSharp, NavigateNext, NextWeek, People, SettingsApplicationsRounded, SkipNext, Sort, SortByAlpha, SortByAlphaOutlined, SortTwoTone, ViewAgenda, ViewArrayOutlined, ViewList, ViewModuleTwoTone, Watch } from "@material-ui/icons";
import Edit from "@material-ui/icons/Edit";
import InvoicesService from "services/InvoicesService";
import InvoiceFilterStatus from "../../components/FiltersForm/InvoiceFilterStatus";

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

export default function Invoices(props) {
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
  const [fail, setFail] = React.useState(false);
  const [messageSuccess, setMessageSuccess] = useState('');
  const [messageError, setMessageError] = useState('');
  const [id, setId] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [warningModalClass, setWarningModalClass] = useState('');
  const [warningClass, setWarningClass] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttonOtherClass, setButtonOtherClass] = useState('');
  const showButtonOther = () => {
    if (buttonOtherClass == '') {
      setButtonOtherClass('content-button');
    } else {
      setButtonOtherClass('');
    }
  }
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 10,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: [1, 2, 3, 7],
    sort: 0,
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
  function hanleChangeInvoice(newStatus) {
    console.log("New Status: ", newStatus);
    setFilters({
      ...filters,
      page: 1,
      status: newStatus.statusList,
    });
  }
  const changeSort = () =>{
    if(filters.sort == 1){
      setFilters({
        ...filters,
        page: 1,
        sort: 2,
      });
    }else{
      setFilters({
        ...filters,
        page: 1,
        sort: 1,
      });
    }
    
  }
  const addInvoice = () => {
    props.history.push("/admin/invoices/add-invoice");
  }

  const payment = () => {
    props.history.push("/admin/invoices/payment");
  }



  useEffect(() => {
    async function fetchInvoicesList() {
      try {
        
        InvoicesService.getInvoices(filters).then((res) => {
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
    props.history.push(`/admin/invoices/edit-invoice/${id}`)
  }
  const viewInvoice = (id) => {
    props.history.push(`/admin/invoices/view-invoice/${id}`)
  }
  const listInvoiceNoFixer = () => {
    props.history.push('/admin/invoices/list-invoice/no-fixer')
  }
  const createInvoiceMaterial = () => {
    props.history.push("/admin/invoices/add-invoice-material");
  }
  const deleteInvoice = (id) => {
    if (warningModalClass == '') {
      setWarningModalClass('warning-modal');
      setId(id);
    }
  }
  //Xóa phiếu sửa chữa
  const back = () => {
    setWarningClass('');
    setWarningModalClass('');
  }
  const deleteI = (e) => {
    e.preventDefault();
    InvoicesService.deleteInvoice(id)
      .then(() => {
        setMessageSuccess('Xóa phiếu thành công!')
        setTl(true);
        // use this to make the notification autoclose
        setTimeout(
          function () {
            setTl(false)
          },
          3000
        );

        window.location.reload();
      })
      .catch(function (error) {
        if (error.response.data.status == 403) {
          alert("Không có quyền truy cập!")
        } else if (error.response.data.errors) {
          setWarningClass('');
          setWarningModalClass('');
          setMessageError(error.response.data.errors[0].defaultMessage)
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setFail(false)
            },
            3000
          );

        } else {
          setWarningClass('');
          setWarningModalClass('');
          setMessageError(error.response.data.message)
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setFail(false)
            },
            3000
          );

        }
      });
  }
  const colorStatusInvoice = status =>{
    if(status.localeCompare("Đang chờ thợ") == 0){
      return <span style={{color:"#3c91f1"}}>{status}</span>
    }else if(status.localeCompare("Đang xét duyệt") == 0){
      return <span style={{color:"#35df24"}}>{status}</span>
    }else if(status.localeCompare("Chờ xử lý") == 0){
      return <span style={{color:"#3c91f1"}}>{status}</span>
    }else if(status.localeCompare("Đang sửa") == 0){
      return <span style={{color:"red"}}>{status}</span>
    }
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <div className="list-invoices">
        <div className="title-invoices">
          <div className="name-title"><span>Danh sách phiếu sửa chữa</span></div>
          <div className="add-new-invoice"><button className="button-add" onClick={addInvoice}>Thêm phiếu</button></div>
        </div>
        <div id="warning-modal" className={warningModalClass}>
          <div id="warning" className={warningClass}>
            <div className="title-warning">
              <span>Xóa phiếu sửa chữa?</span>
            </div>
            <div className="content-warning">
              <div className="text-warning"><span>Bạn có chắc muốn xóa phiếu sửa chữa? Thao tác này không thể khôi phục.</span></div>
              <div className="button-warning">
                <button className="delete-permission" onClick={deleteI}><span>Xóa</span></button>
                <div className="back" onClick={back}><span>Thoát</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-invoices">
          <Snackbars
            place="tc"
            color="info"
            message={messageSuccess}
            open={tl}
            closeNotification={() => setTl(false)}
            close
          />
          <Snackbars
            place="tc"
            color="danger"
            message={messageError}
            open={fail}
            closeNotification={() => setFail(false)}
            close
          />
          <div className="filter">
            <FiltersForm onSubmit={handleFiltersChange} />
            <div className="action">
              <div className="select">
                <InvoiceFilterStatus onSubmit={hanleChangeInvoice} />
              </div>
              <div className="add-invoices">
                <button className="button-action" onClick={payment}>Thanh toán</button>
                <div className="button-other" onClick={showButtonOther}>
                  <div className="title-button">
                    <span>Khác</span>
                    <ArrowDropDown style={{ width: "15px" }} />
                  </div>
                  <div id="content-button" className={buttonOtherClass}>
                    <button className="button-action" onClick={createInvoiceMaterial}>Tạo phiếu bán</button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hight-table">
            <table className="table">
              <thead>
                <tr>
                  <th className="th-2">
                    <span>#</span>
                  </th>
                  <th className="th-3">
                    <span>Mã phiếu</span>
                  </th>
                  <th className="th-4">
                    <span>Biển số</span>
                  </th>
                  <th className="th-5">
                    <span>Nhân viên</span>
                  </th>
                  <th className="th-6">
                    <span>Trạng thái</span> <SortTwoTone onClick={changeSort} style={{ width: "15px", marginLeft:"5px", position: "absolute", cursor:"pointer"}} />
                  </th>
                  <th className="th-7">
                    <span></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="td-2">
                      <span>{invoice.id}</span>
                    </td>
                    <td className="td-3">
                      <span>{invoice.code}</span>
                    </td>
                    <td className="td-4">
                      <span>{invoice.licensePlate}</span>
                    </td>
                    <td className="td-5">
                      <span>{invoice.fixerName}</span>
                    </td>
                    <td className="td-6">
                      {colorStatusInvoice(invoice.status)}
                    </td>
                    <td className="td-7">
                      <button className="button-icon"
                        onClick={() => editInvoice(invoice.id)}
                      >
                        <Edit style={{ width: "15px" }} /><div className="info-button"><span>Sửa thông tin phiếu</span></div>
                      </button>
                      <button className="button-icon"
                        onClick={() => viewInvoice(invoice.id)}
                      >
                        <ViewModuleTwoTone style={{ width: "15px" }} /><div className="info-button"><span>Duyệt phiếu sửa chữa</span></div>
                      </button>
                      <button
                        className="button-icon"
                        onClick={() => deleteInvoice(invoice.id)}
                      >
                        <Delete style={{ width: "15px" }} /><div className="info-button"><span>Xóa phiếu sửa chữa</span></div>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-limit">
            <div className="limit">
              <span>Hiển thị </span><LimitPagination onSubmit={handleChangeLimit} /> <span style={{marginTop: "21px"}}> kết quả</span>
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
