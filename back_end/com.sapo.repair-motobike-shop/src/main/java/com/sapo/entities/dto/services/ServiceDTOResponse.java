package com.sapo.dto.services;

import java.math.BigDecimal;

public class ServiceDTOResponse {
  private int id;
  private String code;
  private String name;
  private String description;
  private String price;
  private String status;


  public ServiceDTOResponse(int id, String code, String name, String description, String price, String status) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.price = price;
    this.status = status;
  }

  public String getPrice() {
    return price;
  }

  public void setPrice(String price) {
    this.price = price;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

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



  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
