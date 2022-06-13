package com.sapo.services;


import com.sapo.dto.customers.*;
import com.sapo.entities.Customer;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public interface CustomerService {
  // Hàm lưu Customer
  @Transactional(rollbackOn = Exception.class)
  void saveCustomer(CustomerDTORequest customerDTO);

  //hàm lưu Customer
  @Transactional(rollbackOn = Exception.class)
  void saveCustomerByVehicle(CustomerVehicleDTORequest customerDTO);

  //Hàm lấy list khách hàng
  List<Customer> findAllListCustomer(String keyword,int idVehicle);

  //Hàm lấy list khách hàng
  List<Customer> findAllListCustomer(String keyword);

  //Hàm tìm Customer bằng id
  Customer findCustomerById(int id);
  
  //Hàm update Customer
  @Transactional(rollbackOn = Exception.class)
  void updateCustomer(int id, CustomerDTOUpdateRequest customerDTOUpdateRequest);
  
  //Hàm search Customer
  CustomerPaginationDTO searchCustomer(int page, int limit, String keyword);

  //Hàm tạo mới khách hàng không có phương tiện
  void saveCustomerNoVehicle(CustomerNewRequestDTO customerNewRequestDTO);

}
