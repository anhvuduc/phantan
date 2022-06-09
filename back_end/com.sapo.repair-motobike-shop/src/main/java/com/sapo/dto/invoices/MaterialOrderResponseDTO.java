package com.sapo.dto.invoices;

import java.math.BigDecimal;

public class MaterialOrderResponseDTO {
    // id material
    private int id;
    private int materialOrderId;
    private String code;
    private String name;
    private BigDecimal outputPrice;
    private int quantity;
    private int quantityBuy;
    private String status;

    public MaterialOrderResponseDTO(int id, int materialOrderId, String code, String name, BigDecimal outputPrice, int quantity, int quantityBuy, String status) {
        this.id = id;
        this.materialOrderId = materialOrderId;
        this.code = code;
        this.name = name;
        this.outputPrice = outputPrice;
        this.quantity = quantity;
        this.quantityBuy = quantityBuy;
        this.status = status;
    }

    public int getMaterialOrderId() {
        return materialOrderId;
    }

    public void setMaterialOrderId(int materialOrderId) {
        this.materialOrderId = materialOrderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public BigDecimal getOutputPrice() {
        return outputPrice;
    }

    public void setOutputPrice(BigDecimal outputPrice) {
        this.outputPrice = outputPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getQuantityBuy() {
        return quantityBuy;
    }

    public void setQuantityBuy(int quantityBuy) {
        this.quantityBuy = quantityBuy;
    }

}
