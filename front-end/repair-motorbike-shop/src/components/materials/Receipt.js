import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/materials/receipt.css";
import FiltersForm from "../FiltersForm/ReceiptSearch.js";
import LimitPagination from 'components/Pagination/limitPagination.js';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons

import Snackbars from 'components/Snackbar/Snackbar.js';
import ReceiptsService from "services/ReceiptsService";
import {NavigateBefore} from "@material-ui/icons";


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
  
export default function Receipt(props) {
    const useStyles = makeStyles(styles);
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
      const classes = useStyles();
      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [receipts, setReceipts] = useState([]);
      const [modalReceiptClass, setModalReceiptClass] = useState('');
      const [listMaterialOrder, setListMaterialOrder] = useState([]);
      const [receiptCode, setReceiptCode] = useState('');
      const [receiptTotal, setReceiptTotal] = useState('');
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
      async function fetchReceiptList() {
        try {
          ReceiptsService.getReceipt(filters).then((res) => {
              let receipts = res.data.receiptDTOS;
              
              setReceipts(
                receipts.map((receipt) => {
                  return {
                    select: false,
                    id: receipt.id,
                    code: receipt.code,
                    createDate: receipt.createDate,
                    status: receipt.status,
                    total:receipt.total
                  }
                }))
              setPagination(pagination);
              console.log(pagination);
              setIsLoaded(true);
            }).catch(function (error) {
              console.log("ERROR: " +error.response.data.status)
              if(error.response.data.status == 403){
                alert("Không có quyền truy cập!")
              }
            })
        } catch (error) {
          console.log("Failed to fetch receipt list: ", error.message);
        }
      }
      fetchReceiptList();
    }, [filters]);

    const getListMaterialOrderByReceiptId = (receipt) => {
      setReceiptCode(receipt.code)
      if(modalReceiptClass == ''){
        setModalReceiptClass('modal-material-order')
      }
      async function fetchMaterialOrderList() {
        try {
          ReceiptsService.getReceiptById(receipt.id).then((res) => {
            setReceiptTotal(res.data.total)
            const data = res.data.receiptMaterialResponseDTOs;
            setListMaterialOrder(
              data.map((materialOrder) => {
                return {
                  select: false,
                  idMaterial: materialOrder.idMaterial,
                  name: materialOrder.name,
                  code: materialOrder.code,
                  quantity: materialOrder.quantity,
                  price: materialOrder.price
                }
              }))

            setIsLoaded(true);
          }).catch(function (error) {
            console.log("ERROR: " +error.response.data.status)
            if(error.response.data.status == 403){
              alert("Không có quyền truy cập!")
            }
          })
        } catch (error) {
          console.log("Failed to fetch material order list: ", error.message);
          setError(error);
        }
      }fetchMaterialOrderList();
    }
      
    const hiddenListMaterialOrder = () =>{
      setModalReceiptClass('')
    }

    const back = () => {
      props.history.push('/admin/materials');
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading....</div>;
    } else {
        return (
          <div className="list-receipts">
            <div className="title-receipts">
              <div className="name-title">
                <div className="button-cancel" onClick={back}>
                  <NavigateBefore style={{ width: "15px" }} /> <span>Quay lại</span>
                </div>
                <div className="name-list"><span>Danh sách hóa đơn nhập hàng</span></div>
              </div>
            </div>

            <div id="modal-material-order" className={modalReceiptClass}>
              <div className="create-material-order">
                  <div className="title-add-material-order"><div className="title-material-order"><span >Danh sách phụ tùng nhập của hóa đơn</span><span style={{ color: "red" }}>{receiptCode}</span></div> <div className="close"><span onClick={hiddenListMaterialOrder}>&times;</span></div></div>
                  <div className="content-material-order">
                    <div className="hight-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>
                              <span>#</span>
                            </th>
                            <th>
                              <span>Mã phụ tùng</span>
                            </th>
                            <th>
                              <span>Tên phụ tùng</span>
                            </th>
                            <th>
                              <span>Số lượng</span>
                            </th>
                            <th>
                              <span>Giá nhập	</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {listMaterialOrder.map((materialOrder) => (
                            <tr key={materialOrder.idMaterial}>
                              <td className="td-1">
                                <span>{materialOrder.idMaterial}</span>
                              </td>
                              <td className="td-2">
                                <span>{materialOrder.code}</span>
                              </td>
                              <td className="td-3">
                                <span>{materialOrder.name}</span>
                              </td>
                              <td className="td-4">
                                <span>{materialOrder.quantity}</span>
                              </td>
                              <td className="td-5">
                                <span>{materialOrder.price}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="title-material-order-total">
                    <span style={{ color: "black", fontWeight: "bold" }}>Tổng tiền thanh toán:</span>
                    <span style={{ color: "black", marginLeft: "269px"}}>{receiptTotal}</span>
                  </div>
              </div>
            </div>

            <div className="content-receipts">
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

              </div>
              <div className="hight-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <span>#</span>
                      </th>
                      <th>
                        <span>Mã hóa đơn</span>
                      </th>
                      <th>
                        <span>Thơi gian nhập</span>
                      </th>
                      <th>
                        <span>Trạng thái</span>
                      </th>
                      <th>
                        <span>Tổng thanh toán</span>
                      </th>
                      <th>
                        <span>Phụ tùng nhập</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map((receipt) => (
                      <tr key={receipt.id}>
                        <td className="td-2">
                          <span>{receipt.id}</span>
                        </td>
                        <td className="td-3">
                          <span>{receipt.code}</span>
                        </td>
                        <td className="td-4">
                          <span>{receipt.createDate}</span>
                        </td>
                        <td className="td-5">
                          <span>{receipt.status}</span>
                        </td>
                        <td className="td-5">
                          <span>{receipt.total}</span>
                        </td>
                        <td className="td-6">
                          <button  className="button-icon-customer" onClick={() => getListMaterialOrderByReceiptId(receipt)}>
                            Thông tin chi tiết
                            <div  className="info-button-customer"><span>Bấm để xem danh sách phụ tùng</span></div>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination-limit">
                <div className="limit">
                  <span>Hiển thị </span><LimitPagination onSubmit={handleChangeLimit} /> <span> kết quả</span>
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
