package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.dao.jpa.CustomerDAO;
import com.sapo.dao.jpa.VehicleCustomerDAO;
import com.sapo.dao.jpa.VehicleDAO;
import com.sapo.dto.customers.CustomerDTORequest;
import com.sapo.dto.customers.CustomerDTOResponse;
import com.sapo.dto.vehiclecustomers.VehicleCustomerDTORequest;
import com.sapo.dto.vehiclecustomers.VehicleCustomerDTOResponse;
import com.sapo.entities.Customer;
import com.sapo.entities.Vehicle;
import com.sapo.entities.VehicleCustomer;
import com.sapo.repositories.CustomerRepository;
import com.sapo.repositories.VehicleCustomerRepository;
import com.sapo.repositories.VehicleRepository;
import com.sapo.services.VehicleCustomerService;
import com.sapo.validate.InputValidate;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleCustomerServiceImpl implements VehicleCustomerService {
  private final VehicleCustomerDAO vehicleCustomerDAO;
  private final VehicleDAO vehicleDAO;
  private final CustomerDAO customerDAO;
  private final CustomerRepository customerRepository;
  private final VehicleRepository vehicleRepository;
  private final VehicleCustomerRepository vehicleCustomerRepository;
  
  private static final Logger LOGGER = LoggerFactory.getLogger(VehicleCustomerServiceImpl.class.toString());
  
  public VehicleCustomerServiceImpl(VehicleCustomerDAO vehicleCustomerDAO, VehicleDAO vehicleDAO, CustomerDAO customerDAO, CustomerRepository customerRepository, VehicleRepository vehicleRepository, VehicleCustomerRepository vehicleCustomerRepository) {
    this.vehicleCustomerDAO = vehicleCustomerDAO;
    this.vehicleDAO = vehicleDAO;
    this.customerDAO = customerDAO;
    this.customerRepository = customerRepository;
    this.vehicleRepository = vehicleRepository;
    this.vehicleCustomerRepository = vehicleCustomerRepository;
  }
  
  //hàm tạo VehicleCustomer
  @Override
  public void saveVehicleCustomer(VehicleCustomerDTORequest vehicleCustomerDTORequest){
    
    InputValidate.validatePhone(vehicleCustomerDTORequest.getPhone());
  
    Customer customer = new Customer();
    Vehicle vehicle = new Vehicle();
    VehicleCustomer vehicleCustomer = new VehicleCustomer();
    
    List<Vehicle> vehicles = vehicleDAO.findAllVehicleExist();
    List<Customer> customers = customerDAO.findAllCustomerExist();
    
    if (InputValidate.checkCustomerPhoneExist(vehicleCustomerDTORequest.getPhone(), customers)){
      customer.setCode(Common.GenerateCodeCustomer());
      customer.setName(vehicleCustomerDTORequest.getName());
      customer.setPhone(vehicleCustomerDTORequest.getPhone());
      customer.setCreatedAt();
      saveCustomerRepository(customer);
    } else {
      for (Customer customer1:  customers) {
        if (vehicleCustomerDTORequest.getPhone().compareTo(customer1.getPhone()) == 0){
          if (vehicleCustomerDTORequest.getName() != null && vehicleCustomerDTORequest.getName() != ""){
            customer1.setName(vehicleCustomerDTORequest.getName());
          }
          customer1.setUpdatedAt();
          saveCustomerRepository(customer1);
          break ;
        }
      }
    }
  
    if (InputValidate.checkLicensePlateExist(vehicleCustomerDTORequest.getLicensePlate(), vehicles)){
      vehicle.setCode(Common.GenerateCodeVehicle());
      vehicle.setLicensePlate(vehicleCustomerDTORequest.getLicensePlate());
      vehicle.setCreatedAt();
      saveVehicleRepository(vehicle);
    } else {
      for (Vehicle vehicle1:  vehicles) {
        if (vehicleCustomerDTORequest.getLicensePlate().compareTo(vehicle1.getLicensePlate()) == 0){
          vehicle1.setUpdatedAt();
          saveVehicleRepository(vehicle1);
          break ;
        }
      }
    }
  
    Integer vehicleId = findVehicleBylicensePlate(vehicleCustomerDTORequest.getLicensePlate()).getId();
    Integer customerId = findCustomerByPhone(vehicleCustomerDTORequest.getPhone()).getId();
    
    List<VehicleCustomer> vehicleCustomers = vehicleCustomerDAO.findVehicleCustomerByVehicleId(vehicleId);
  
    for (VehicleCustomer vehicleCustomer1:  vehicleCustomers) {
      if (vehicleCustomer1.getCustomerId() == customerId){
          return ;
      }
    }
    
    vehicleCustomer.setCustomerId(customerId);
    vehicleCustomer.setVehicleId(vehicleId);
    saveVehicleCustomerRepository(vehicleCustomer);
  }
  
  //lấy list customer bằng vehicleId
  @Override
  public VehicleCustomerDTOResponse findListCustomerByVehicleId(int id){
    List<VehicleCustomer> vehicleCustomers = vehicleCustomerRepository.findVehicleCustomerByVehicleId(id);
    VehicleCustomerDTOResponse vehicleCustomerDTOResponse = new VehicleCustomerDTOResponse();
    vehicleCustomerDTOResponse.setLicensePlace(vehicleRepository.findVehicleById(id).getLicensePlate());
  
    List<CustomerDTOResponse> customerDTOResponses = new ArrayList<>();
    
    vehicleCustomers.forEach(vehicleCustomer -> {
      Customer customer = customerRepository.findCustomerById(vehicleCustomer.getCustomerId());
      CustomerDTOResponse customerDTOResponse = new CustomerDTOResponse(customer.getId(), customer.getCode(), customer.getName(), customer.getPhone());
      customerDTOResponses.add(customerDTOResponse);
    });
  
    vehicleCustomerDTOResponse.setCustomerDTOResponses(customerDTOResponses);
    
    return vehicleCustomerDTOResponse;
  }
  
  //Hàm Tìm Customer bằng Phone
  private Customer findCustomerByPhone(String phone){
      return customerRepository.findCustomerByPhone(phone);
  }
  
  //Hàm Tìm vehicle bằng LicensePlate
  private Vehicle findVehicleBylicensePlate(String licensePlate){
    return vehicleRepository.findVehicleBylicensePlate(licensePlate);
  }
  //Hàm lưu Customer bằng CustomerRepository
  private void saveCustomerRepository(Customer customer){
    try{
      customerRepository.save(customer);
    }catch (Exception e){
      LOGGER.error("ERROR: {} | Save customer", customer);
    }
  }
  
  //Hàm lưu vehicle bằng VehicleRepository
  private void saveVehicleRepository(Vehicle vehicle){
    try{
      vehicleRepository.save(vehicle);
    }catch (Exception e){
      LOGGER.error("ERROR: {} | Save vehicle", vehicle);
    }
  }
  
  //Hàm lưu vehicleCustomer bằng VehicleCustomerRepository
  private void saveVehicleCustomerRepository(VehicleCustomer vehicleCustomer){
    try{
      vehicleCustomerRepository.save(vehicleCustomer);
    }catch (Exception e){
      LOGGER.error("ERROR: {} | Save vehicleCustomer", vehicleCustomer);
    }
  }
}
