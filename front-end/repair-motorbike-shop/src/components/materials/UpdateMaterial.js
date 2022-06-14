/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import MaterialService from "../../services/materialService";
import "../../assets/css/materials/updateMaterial.css";
import {NavigateBefore} from "@material-ui/icons";
import Snackbars from 'components/Snackbar/Snackbar.js';


function UpdateMaterial(props) {
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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [outputPrice, setOutputPrice] = useState("");
  const [inputPrice, setInputPrice] = useState("");


  // eslint-disable-next-line react/prop-types
  const [id, setId] = useState(props.match.params.id);

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };
  const changeSupplier = (event) => {
    setSupplier(event.target.value);
  };
  const changeOutputPrice = (event) => {
    setOutputPrice(event.target.value);
    console.log("changeInputPrice: " +event.target.value)
  };
  const changeInputPrice = (event) => {
    setInputPrice(event.target.value);
    console.log("changeInputPrice: " +event.target.value)
  };



  const updateMaterial = (e) => {
    e.preventDefault();
    let material = { name,description,supplier, quantity,inputPrice ,outputPrice};
    console.log("material => " + JSON.stringify(material));
    MaterialService.updateMaterial(id, material)
      .then(() => {
        props.history.push("/admin/materials");
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

  useEffect(() => {
    MaterialService.getMaterialId(id).then((res) => {
      let material = res.data;
      console.log(material);

      setName(material.name);
      setDescription(material.description);
      setSupplier(material.supplier);
      setQuantity(material.quantity);
      setOutputPrice(material.outputPrice);
      setInputPrice(material.inputPrice);
    });
  }, []);


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
