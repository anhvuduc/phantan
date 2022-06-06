package com.sapo.dto.statistics;

import java.math.BigDecimal;

public class InputMaterialDTO {
    private int id;
    private String code;
    private String name;
    private BigDecimal inputPrice;
    private int quanity;
    private BigDecimal totalMoney;
    private long createAt;

    public InputMaterialDTO(int id, String code, String name, BigDecimal inputPrice, int quanity, BigDecimal totalMoney, long createAt) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.inputPrice = inputPrice;
        this.quanity = quanity;
        this.totalMoney = totalMoney;
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

    public BigDecimal getInputPrice() {
        return inputPrice;
    }

    public void setInputPrice(BigDecimal inputPrice) {
        this.inputPrice = inputPrice;
    }

    public int getQuanity() {
        return quanity;
    }

    public void setQuanity(int quanity) {
        this.quanity = quanity;
    }

    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    public long getCreateAt() {
        return createAt;
    }

    public void setCreateAt(long createAt) {
        this.createAt = createAt;
    }
}
