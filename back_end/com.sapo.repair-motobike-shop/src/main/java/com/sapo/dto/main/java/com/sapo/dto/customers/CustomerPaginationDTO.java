package com.sapo.dto.customers;

import com.sapo.dto.common.Pagination;

import java.util.List;

public class CustomerPaginationDTO {
  private List<CustomerDTOResponse> customerDTOS;
  private Pagination pagination;
  
  public CustomerPaginationDTO(List<CustomerDTOResponse> customerDTOS, Pagination pagination) {
    this.customerDTOS = customerDTOS;
    this.pagination = pagination;
  }
  
  public CustomerPaginationDTO(){
  
  }
  
  public List<CustomerDTOResponse> getCustomerDTOS() {
    return customerDTOS;
  }
  
  public void setCustomerDTOS(List<CustomerDTOResponse> customerDTOS) {
    this.customerDTOS = customerDTOS;
  }
  
  public Pagination getPagination() {
    return pagination;
  }
  
  public void setPagination(Pagination pagination) {
    this.pagination = pagination;
  }
}
