package com.sapo.dto.statistics;

import java.math.BigDecimal;

public class StatisticServiceDTO {
    private int id;
    private String name;
    private String code;
    private BigDecimal price;
    private int numberInvoices;
    private BigDecimal totalPurchased;
    private long createAt;


    public StatisticServiceDTO(int id, String name, String code, BigDecimal price, int numberInvoices, BigDecimal totalPurchased, long createAt) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.price = price;
        this.numberInvoices = numberInvoices;
        this.totalPurchased = totalPurchased;
        this.createAt = createAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getNumberInvoices() {
        return numberInvoices;
    }

    public void setNumberInvoices(int numberInvoices) {
        this.numberInvoices = numberInvoices;
    }

    public BigDecimal getTotalPurchased() {
        return totalPurchased;
    }

    public void setTotalPurchased(BigDecimal totalPurchased) {
        this.totalPurchased = totalPurchased;
    }

    public long getCreateAt() {
        return createAt;
    }

    public void setCreateAt(long createAt) {
        this.createAt = createAt;
    }
}
