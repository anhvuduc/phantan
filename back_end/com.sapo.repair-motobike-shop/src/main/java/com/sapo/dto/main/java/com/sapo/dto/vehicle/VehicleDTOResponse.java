package com.sapo.dto.vehicle;

public class VehicleDTOResponse {
  private int id;
  private String code;
  private String licensePlate;
  
  public VehicleDTOResponse(int id, String code, String licensePlate) {
    this.id = id;
    this.code = code;
    this.licensePlate = licensePlate;
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
  
  public String getLicensePlate() {
    return licensePlate;
  }
  
  public void setLicensePlate(String licensePlate) {
    this.licensePlate = licensePlate;
  }
}
