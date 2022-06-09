package com.sapo.controllers.staff;


import com.sapo.dto.customers.*;
import com.sapo.dto.vehicle.VehiclePaginationDTO;
import com.sapo.entities.Customer;
import com.sapo.services.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/customers")
@PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
public class CustomerController {
  private final CustomerService customerService;
  
  public CustomerController(CustomerService customerService) {
    this.customerService = customerService;
  }
  
  // API Tìm tất cả Customer và phân trang
  @GetMapping("/list")
  public ResponseEntity<CustomerPaginationDTO> listCustomerPagination(@RequestParam int page, @RequestParam int limit, @RequestParam String keyword){
    CustomerPaginationDTO customerPaginationDTO = customerService.searchCustomer(page, limit, keyword);
    return ResponseEntity.ok(customerPaginationDTO);
  }

  //API lấy list customer
  @GetMapping
  public ResponseEntity<List<Customer>> listCustomer(@RequestParam String keyword, @RequestParam int idVehicle){
    List<Customer> customers = customerService.findAllListCustomer(keyword,idVehicle);
    return ResponseEntity.ok(customers);
  }

  // API Tạo Customer
  @PostMapping
  public ResponseEntity<Void> addCustomer(@Valid @RequestBody CustomerDTORequest customer){
    customerService.saveCustomer(customer);
    return ResponseEntity.ok().build();
  }

  
  //API tìm thông tin Customer bằng id
  @GetMapping("/{id}")
  public ResponseEntity<Customer> findCustomerById(@PathVariable("id") int id){
    Customer customer = customerService.findCustomerById(id);
    return ResponseEntity.ok(customer);
  }
  
  // API update Customer
  @PutMapping("/{id}")
  public ResponseEntity<CustomerDTOUpdateRequest> updateCustomer(@PathVariable("id") int id, @Valid @RequestBody CustomerDTOUpdateRequest customerDTOUpdateRequest) {
    customerService.updateCustomer(id, customerDTOUpdateRequest);
    return ResponseEntity.ok(customerDTOUpdateRequest);
  }

  // API Tạo Customer có sẵn vehicle
  @PostMapping("/vehicle")
  public ResponseEntity<Void> addCustomerByVehicle(@Valid @RequestBody CustomerVehicleDTORequest customerVehicleDTO){
    customerService.saveCustomerByVehicle(customerVehicleDTO);
    return ResponseEntity.ok().build();
  }


  //API lấy list customer
  @GetMapping("/list-customers")
  public ResponseEntity<List<Customer>> listCustomer(@RequestParam String keyword){
    List<Customer> customers = customerService.findAllListCustomer(keyword);
    return ResponseEntity.ok(customers);
  }

  //API tạo customer không có vehicle
  @PostMapping("/new")
  public ResponseEntity<Void> addCustomerByVehicle(@Valid @RequestBody CustomerNewRequestDTO customerNewDTO){
    customerService.saveCustomerNoVehicle(customerNewDTO);
    return ResponseEntity.ok().build();
  }
}
