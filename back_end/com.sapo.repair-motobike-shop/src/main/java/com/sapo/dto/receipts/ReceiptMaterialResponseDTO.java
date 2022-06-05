package com.sapo.dto.receipts;

import java.math.BigDecimal;

public class ReceiptMaterialResponseDTO {
    private int idMaterial;
    private String name;
    private String code;
    private int quantity;
    private String price;


    public ReceiptMaterialResponseDTO(int idMaterial, String name, String code, int quantity, String price) {
        this.idMaterial = idMaterial;
        this.name = name;
        this.code = code;
        this.quantity = quantity;
        this.price = price;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(int idMaterial) {
        this.idMaterial = idMaterial;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
