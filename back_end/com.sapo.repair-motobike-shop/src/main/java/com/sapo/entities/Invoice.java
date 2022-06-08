package com.sapo.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_invoices")
public class Invoice extends BaseEntity {
    @Column(name = "total", nullable = true)
    private BigDecimal total;
    
    @Column(name = "status", nullable = true)
    private int status;
    
    @Column(name = "pay_method", nullable = true)
    private int payMethod;
    
    @Column(name = "note", nullable = true)
    private String note;
    
    @Column(name = "fixer_id")
    private Integer fixerId;
    
    
    @Column(name = "vehicle_customer_id")
    private Integer vehicleCustomerId;
    
    public BigDecimal getTotal() {
        return total;
    }
    
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    
    public int getStatus() {
        return status;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }
    
    public int getPayMethod() {
        return payMethod;
    }
    
    public void setPayMethod(int payMethod) {
        this.payMethod = payMethod;
    }
    
    public String getNote() {
        return note;
    }
    
    public void setNote(String note) {
        this.note = note;
    }
    
    public Integer getFixerId() {
        return fixerId;
    }
    
    public void setFixerId(Integer fixerId) {
        this.fixerId = fixerId;
    }
    
    public Integer getVehicleCustomerId() {
        return vehicleCustomerId;
    }
    
    public void setVehicleCustomerId(Integer vehicleCustomerId) {
        this.vehicleCustomerId = vehicleCustomerId;
    }
}
