package com.sapo.services.impl;


import com.sapo.common.Common;
import com.sapo.dao.jpa.CustomerDAO;
import com.sapo.dao.jpa.VehicleDAO;
import com.sapo.dto.common.Pagination;
import com.sapo.dto.customers.*;

import com.sapo.dto.customers.CustomerDTOResponse;
import com.sapo.dto.customers.CustomerDTOUpdateRequest;
import com.sapo.dto.customers.CustomerPaginationDTO;
import com.sapo.entities.Customer;
import com.sapo.entities.VehicleCustomer;
import com.sapo.repositories.CustomerRepository;
import com.sapo.repositories.VehicleCustomerRepository;
import com.sapo.services.CustomerService;
import com.sapo.validate.InputValidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
  private final CustomerRepository customerRepository;
  private final CustomerDAO customerDAO;
  private final VehicleDAO vehicleDAO;
  private final VehicleCustomerRepository vehicleCustomerRepository;
  
  private static final Logger LOGGER = LoggerFactory.getLogger(CustomerServiceImpl.class.toString());
  
  
  public CustomerServiceImpl(CustomerRepository customerRepository, CustomerDAO customerDAO, VehicleDAO vehicleDAO, VehicleCustomerRepository vehicleCustomerRepository) {
    this.customerRepository = customerRepository;
    this.customerDAO = customerDAO;
    this.vehicleDAO = vehicleDAO;
    this.vehicleCustomerRepository = vehicleCustomerRepository;
  }
  
  //Hàm tìm Customer bằng id
  @Override
  public Customer findCustomerById(int id){
    Customer customer = customerDAO.findCustomerById(id);
    return customer;
  }
  
  //Hàm search Customer
  @Override
  public CustomerPaginationDTO searchCustomer(int page, int limit, String keyword){
    CustomerPaginationDTO customerDTOsPagination = new CustomerPaginationDTO();
    List<Customer> customers = customerDAO.findCustomerByKeyword(keyword);
    System.out.println(customers);
    customerDTOsPagination = findAllCustomerDTO(page, limit, customers);
    return customerDTOsPagination;
  }
  

  //Tạo customer mới
  @Override
  public void saveCustomerByVehicle(CustomerVehicleDTORequest customerDTO){
      Customer customer = new Customer();
      customer.setPhone(customerDTO.getPhone());
      customer.setName(customerDTO.getName());
      customer.setCode(Common.GenerateCodeCustomer());
      customer.setCreatedAt();
      try{
        saveCustomerRepository(customer);
      }catch (Exception e){
        LOGGER.error("ERROR | Lỗi không lưu được customer | " + customer);
      }
      int idVehicle = vehicleDAO.findVehicleByLicensePlate(customerDTO.getLicensePlate()).getId();
      int idCustomer = customerDAO.findCustomerByCode(customer.getCode()).getId();
    VehicleCustomer vehicleCustomer = new VehicleCustomer();

    vehicleCustomer.setCustomerId(idCustomer);
    vehicleCustomer.setVehicleId(idVehicle);

    vehicleCustomerRepository.save(vehicleCustomer);
  }


  // tạo Customer mới
  @Override
  @Transactional(rollbackOn = Exception.class)
  public void saveCustomer(CustomerDTORequest customerDTO){
    Customer customer = new Customer();
    List<Customer> customers = customerDAO.findAllCustomerExist();
    InputValidate.validatePhone(customerDTO.getPhone());
//    InputValidate.validateLicensePlate(customerDTO.getLicensePlate(), customers);
    customer.setCode(Common.GenerateCodeCustomer());
    customer.setPhone(customerDTO.getPhone());
    customer.setName(customerDTO.getName());

    customer.setCreatedAt();
    saveCustomerRepository(customer);

  }
  
  // cập nhật Customer
  @Override
  @Transactional(rollbackOn = Exception.class)
  public void updateCustomer(int id, CustomerDTOUpdateRequest customerDTOUpdateRequest) {
    Customer customer = findCustomerById(id);
    InputValidate.validatePhone(customerDTOUpdateRequest.getPhone());
    if(customerDTOUpdateRequest.getName() != null){
      customer.setName(customerDTOUpdateRequest.getName());
    }
    if(customerDTOUpdateRequest.getPhone()!= null){
      customer.setPhone(customerDTOUpdateRequest.getPhone());
    }
    customer.setUpdatedAt();
    saveCustomerRepository(customer);
  }
  
  // Chuyển Customer sang CustomerDTO
  private List<CustomerDTOResponse> transferCustomerToCustomerDTO(List<Customer> customers){
    List<CustomerDTOResponse> customerDTOS = new ArrayList<>();
    
    customers.forEach(customer -> {
      if (customer.getName() == null ){
        customer.setName(" ");
      } else if (customer.getPhone() == null){
        customer.setPhone(" ");
      }
      CustomerDTOResponse customerDTO = new CustomerDTOResponse(customer.getId(), customer.getCode(), customer.getName() , customer.getPhone());
      customerDTOS.add(customerDTO);
    });
    return customerDTOS;
  }
  
  // Chuyển Customer sang CustomerDTO
  private CustomerPaginationDTO findAllCustomerDTO(int page, int limit, List<Customer> customers){
    List<CustomerDTOResponse> customerDTOS = transferCustomerToCustomerDTO(customers);
    CustomerPaginationDTO customerDTOsPagination = findAllCustomerPaginationDTO(page,  limit, customerDTOS);
    return customerDTOsPagination;
  }
  
  private CustomerPaginationDTO findAllCustomerPaginationDTO (int page, int limit, List<CustomerDTOResponse> customerDTOS){
    List<CustomerDTOResponse> customerDTOList = new ArrayList<CustomerDTOResponse>();
    if ((customerDTOS.size() - (page * limit - limit)) > limit) {
      for (int i = page * limit - limit; i < page * limit; i++) {
        customerDTOList.add(customerDTOS.get(i));
      }
    } else {
      for (int i = page * limit - limit; i < customerDTOS.size(); i++) {
        customerDTOList.add(customerDTOS.get(i));
      }
    }
    Pagination pagination = new Pagination(page, limit, customerDTOS.size());
    CustomerPaginationDTO customerPaginationDTO = new CustomerPaginationDTO(customerDTOList, pagination);
    return customerPaginationDTO;
  }
  
  
  
  //Hàm lưu Customer bằng CustomerRepository
  private void saveCustomerRepository(Customer customer){
    try{
      customerRepository.save(customer);
    }catch (Exception e){
      LOGGER.error("ERROR: {} | Save customer", customer);
    }
  }

  //Hàm lấy list khách hàng bằng repository
  @Override
  public List<Customer> findAllListCustomer(String keyword, int idVehicle){
    List<Customer> customers = customerDAO.findCustomerByKeywordAndIdVehicle(keyword, idVehicle);
    return customers;
  }

  @Override
  public List<Customer> findAllListCustomer(String keyword){
    List<Customer> customers = customerDAO.findCustomerByKeywordAndIdVehicle(keyword);
    return customers;
  }

  //Hàm tạo mới khách hàng không có phương tiện
  @Override
  @Transactional(rollbackOn = Exception.class)
  public void saveCustomerNoVehicle(CustomerNewRequestDTO customerNewRequestDTO){

    Customer customer = new Customer();
    List<Customer> customerChecks = customerRepository.findAll();
    InputValidate.checkCustomerPhoneExist(customerNewRequestDTO.getPhone(), customerChecks);
    customer.setCreatedAt();
    customer.setCode(Common.GenerateCodeInvoice());
    customer.setName(customerNewRequestDTO.getName());
    customer.setPhone(customerNewRequestDTO.getPhone());
    customerRepository.save(customer);
    Customer customerAdded = customerDAO.findCustomerByCode(customer.getCode());
    VehicleCustomer vehicleCustomer = new VehicleCustomer();

    vehicleCustomer.setCustomerId(customerAdded.getId());
    vehicleCustomerRepository.save(vehicleCustomer);
  }

}

