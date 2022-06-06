package com.sapo.dto.statistics;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;

public class StatisticsCustomerDTO {
    private int id;
    private String code;
    private String name;
    private String phone;
    private String licensePlate;
    private BigDecimal totalPurchased;
    private int numberPurchases;
    private long createAt;

    public StatisticsCustomerDTO(int id, String code, String name, String phone, String licensePlate, BigDecimal totalPurchased, int numberPurchases, long createAt) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.phone = phone;
        this.licensePlate = licensePlate;
        this.totalPurchased = totalPurchased;
        this.numberPurchases = numberPurchases;
        this.createAt = createAt;
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

    public BigDecimal getTotalPurchased() {
        return totalPurchased;
    }

    public void setTotalPurchased(BigDecimal totalPurchased) {
        this.totalPurchased = totalPurchased;
    }

    public int getNumberPurchases() {
        return numberPurchases;
    }

    public void setNumberPurchases(int numberPurchases) {
        this.numberPurchases = numberPurchases;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public long getCreateAt() {
        return createAt;
    }

    public void setCreateAt(long createAt) {
        this.createAt = createAt;
    }
}
