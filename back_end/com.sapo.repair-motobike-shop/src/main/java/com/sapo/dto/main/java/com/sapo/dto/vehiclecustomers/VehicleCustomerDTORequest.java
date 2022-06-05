package com.sapo.dto.vehiclecustomers;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class VehicleCustomerDTORequest {
  private String name;
  
  @NotNull(message = "Số điện thoại không được để trống")
  @NotBlank(message = "Số điện thoại không được để trống")
  @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 chữ số")
  private String phone;
  
  @NotNull(message = "Biển số xe không được để trống")
  @NotBlank(message = "Biển số xe không được để trống")
  private String licensePlate;
  
  public VehicleCustomerDTORequest(String name, String phone, String licensePlate) {
    this.name = name;
    this.phone = phone;
    this.licensePlate = licensePlate;
  }
  
  public String getName() {
    return name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getPhone() {
    return phone;
  }
  
  public void setPhone(String phone) {
    this.phone = phone;
  }
  
  public String getLicensePlate() {
    return licensePlate;
  }
  
  public void setLicensePlate(String licensePlate) {
    this.licensePlate = licensePlate;
  }
}
