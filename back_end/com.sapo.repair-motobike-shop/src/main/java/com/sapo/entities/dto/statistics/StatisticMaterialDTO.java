package com.sapo.dto.statistics;

import java.math.BigDecimal;

public class StatisticMaterialDTO {
    private int id;
    private String name;
    private String code;
    private int numberInvoices;
    private int numberPurchases;
    private int numberInventory;
    private BigDecimal outPutPrice;
    private BigDecimal totalPurchased;
    private long createAt;

    public StatisticMaterialDTO(int id, String name, String code, int numberInvoices, int numberPurchases, int numberInventory, BigDecimal outPutPrice, BigDecimal totalPurchased, long createAt) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.numberInvoices = numberInvoices;
        this.numberPurchases = numberPurchases;
        this.numberInventory = numberInventory;
        this.outPutPrice = outPutPrice;
        this.totalPurchased = totalPurchased;
        this.createAt = createAt;
    }

    public BigDecimal getOutPutPrice() {
        return outPutPrice;
    }

    public void setOutPutPrice(BigDecimal outPutPrice) {
        this.outPutPrice = outPutPrice;
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

    public int getNumberInvoices() {
        return numberInvoices;
    }

    public void setNumberInvoices(int numberInvoices) {
        this.numberInvoices = numberInvoices;
    }

    public int getNumberPurchases() {
        return numberPurchases;
    }

    public void setNumberPurchases(int numberPurchases) {
        this.numberPurchases = numberPurchases;
    }

    public int getNumberInventory() {
        return numberInventory;
    }

    public void setNumberInventory(int numberInventory) {
        this.numberInventory = numberInventory;
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
