/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/materials/material.css";
import FiltersForm from "../FiltersForm/MaterialSearch.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
import MaterialService from "services/materialService";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons
import Snackbars from 'components/Snackbar/Snackbar.js';
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';

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

export default function Material(props) {
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

  const [id, setId] = useState('');

  const [materials, setMaterials] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [warningClass, setWarningClass] = useState('');
  const [warningModalClass, setWarningModalClass] = useState('');

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 12,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status:1
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

  const addMaterial = () => {
    props.history.push("/admin/materials/add-material");
  };
  
  const addReceipt = () => {
    props.history.push("/admin/receipts/add-receipt");
  };

  const listReceipt =() =>{
    props.history.push("/admin/receipts");
  }

  useEffect(() => {
    async function fetchMaterialList() {
      try {
        MaterialService.getAllMaterial(filters).then((res) => {
          const data = res.data.materialDTOS;
          const pagination = res.data.pagination;
        
        setMaterials(
          data.map((material) => {
            return {
              select: false,
              id: material.id,
              code: material.code,
              name: material.name,
              description: material.description,
              quantity: material.quantity,
              supplier: material.supplier,
              inputPrice: material.outputPrice,
              outputPrice: material.inputPrice,
              status: material.status,
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
        console.log("Failed to fetch material list: ", error.message);
        setError(error);
      }
    }
    fetchMaterialList();
  }, [filters]);

  const deleteMaterial = () =>{
    MaterialService.deleteMaterial(id)
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

  const deleteM = (id) =>{
    if(warningModalClass == ''){
      setWarningModalClass('warning-modal')
      setId(id)
    }
  }

  const backconfirm = () => {
    setWarningClass('');
    setWarningModalClass('');
  }


  const updateMaterial = (id) => {
    props.history.push(`/admin/materials/update-material/${id}`);
  };


  const classes = useStyles();



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <div className="list-materials">
        <div className="title-materials">
          <div className="name-title"><span>Danh sách phụ tùng</span></div>
          <div className="add-new-material"><button className="button-add" onClick={addMaterial}>Thêm mới</button></div>
        </div>

        <div id="warning-modal" className={warningModalClass}>
          <div id="warning" className={warningClass}>
              <div className="title-warning">
                  <span>Xóa dịch vụ?</span>
              </div>
              <div className="content-warning">
                  <div className="text-warning"><span>Bạn có chắc muốn xóa phụ tùng này? Thao tác này không thể khôi phục.</span></div>
                  <div className="button-warning">
                      <button className="delete-permission" onClick={deleteMaterial}><span>Xóa</span></button>
                      <div className="back" onClick={backconfirm}><span>Thoát</span></div>
                  </div>
              </div>
          </div>
        </div>

        <div className="content-materials">
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
              <div className="add-materials">
                <button className="button-action" onClick={listReceipt}>Danh sách phiếu nhập</button>
                <button className="button-action" onClick={addReceipt}>Nhập phụ tùng</button>
              </div>
            </div>
          </div>
          <div className="height-table">
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
                    <span>Mô tả</span>
                  </th>
                  <th>
                    <span>Số lượng</span>
                  </th>
                  <th>
                    <span>Nhà cung cấp</span>
                  </th>
                  <th>
                    <span>Giá bán</span>
                  </th>
                  <th>
                    <span>Giá nhập</span>
                  </th>
                  <th>
                    <span>Trạng thái</span>
                  </th>
                  <th className="th-7">
                    <span></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id}>
                    <td className="td-5">
                      <span>{material.id}</span>
                    </td>
                    <td className="td-5">
                      <span>{material.code}</span>
                    </td>
                    <td className="td-5">
                      <span>{material.name}</span>
                    </td>
                    <td className="td-5">
                      <span>{material.description}</span>
                    </td>
                    <td className="td-5">
                      <span>{material.quantity}</span>
                    </td>
                    <td className="td-5">
                      <span>{material.supplier}</span>
                    </td>
                    <td className="td-6">
                      <span>{material.outputPrice}</span>
                    </td>
                    <td className="td-6">
                      <span>{material.inputPrice}</span>
                    </td>
                    <td className="td-4">
                      <span>{material.status}</span>
                    </td>
                    <td className="td-7">
                        <button
                          className="button-icon"
                          onClick={() => updateMaterial(material.id)}
                        >
                          <Edit style={{ width: "15px" }} /><div  className="info-button"><span>Sửa thông tin PT</span></div>
                        </button>

                        <button
                              className="button-icon"
                              onClick={() => deleteM(material.id)}
                          >
                              <DeleteIcon style={{ width: "15px" }} /><div  className="info-button"><span>Xóa phụ tùng</span></div>
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
