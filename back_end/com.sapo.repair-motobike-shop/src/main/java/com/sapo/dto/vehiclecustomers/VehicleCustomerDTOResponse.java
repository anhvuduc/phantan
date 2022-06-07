package com.sapo.dto.vehiclecustomers;

import com.sapo.dto.customers.CustomerDTORequest;
import com.sapo.dto.customers.CustomerDTOResponse;

import java.util.List;

public class VehicleCustomerDTOResponse {
  private String licensePlace;
  private List<CustomerDTOResponse> customerDTOResponses;
  
  public VehicleCustomerDTOResponse(String licensePlace, List<CustomerDTOResponse> customerDTOResponses) {
    this.licensePlace = licensePlace;
    this.customerDTOResponses = customerDTOResponses;
  }
  
  public VehicleCustomerDTOResponse() {
  }
  
  public String getLicensePlace() {
    return licensePlace;
  }
  
  public void setLicensePlace(String licensePlace) {
    this.licensePlace = licensePlace;
  }
  
  public List<CustomerDTOResponse> getCustomerDTOResponses() {
    return customerDTOResponses;
  }
  
  public void setCustomerDTOResponses(List<CustomerDTOResponse> customerDTOResponses) {
    this.customerDTOResponses = customerDTOResponses;
  }
}
