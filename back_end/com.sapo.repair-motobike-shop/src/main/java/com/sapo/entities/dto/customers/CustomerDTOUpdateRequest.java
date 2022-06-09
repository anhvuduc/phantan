package com.sapo.dto.customers;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CustomerDTOUpdateRequest {
  private String name;
  
  @NotNull(message = "Số điện thoại không được để trống")
  @NotBlank(message = "Số điện thoại không được để trống")
  @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 chữ số")
  private String phone;
  
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
}
