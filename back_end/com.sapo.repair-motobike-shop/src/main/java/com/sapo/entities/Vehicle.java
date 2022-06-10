package com.sapo.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_vehicles")
public class Vehicle extends BaseEntity {
  @Column(name = "license_plate", length = 50, nullable = true)
  private String licensePlate;
  
  public String getLicensePlate() {
    return licensePlate;
  }
  
  public void setLicensePlate(String licensePlate) {
    this.licensePlate = licensePlate;
  }
}
