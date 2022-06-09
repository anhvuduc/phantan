package com.sapo.dto.services;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class ServiceDTOUpdateRequest {
  @NotNull(message = "Tên không được để trống")
  @NotBlank(message = "Tên không được để trống")
  private String name;
  private String description;
  private BigDecimal price;
  private Integer status;
  
  public String getName() {
    return name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getDescription() {
    return description;
  }
  
  public void setDescription(String description) {
    this.description = description;
  }
  
  public BigDecimal getPrice() {
    return price;
  }
  
  public void setPrice(BigDecimal price) {
    this.price = price;
  }
  
  public Integer getStatus() {
    return status;
  }
  
  public void setStatus(Integer status) {
    this.status = status;
  }
}
