package com.sapo.dto.customers;

public class CustomerDTOResponse {
  private int id;
  private String code;
  private String name;
  private String phone;
  public CustomerDTOResponse(int id, String code, String name, String phone) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.phone = phone;
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
  
  public String getPhone() {
    return phone;
  }
  
  public void setPhone(String phone) {
    this.phone = phone;
  }
}
