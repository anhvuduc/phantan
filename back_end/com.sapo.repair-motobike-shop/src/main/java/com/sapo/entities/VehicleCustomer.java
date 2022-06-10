package com.sapo.entities;

import javax.persistence.*;

@Entity
@Table(name = "tbl_vehicle_customer")
public class VehicleCustomer {
  @Id // xác định đây là khoá chính.
  @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment.
  @Column(name = "id")
  private Integer id; // primary-key
  
  @Column(name = "vehicle_id", nullable = false)
  private Integer vehicleId;

  @Column(name = "customer_id", nullable = false)
  private Integer customerId;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(Integer vehicleId) {
    this.vehicleId = vehicleId;
  }

  public Integer getCustomerId() {
    return customerId;
  }

  public void setCustomerId(Integer customerId) {
    this.customerId = customerId;
  }
}
