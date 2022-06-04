package com.sapo.dto.materials;

import java.math.BigDecimal;

public class MaterialDTOResponse {
    private int id;
    private String code;
    private String name;
    private String description;
    private Integer quantity;
    private String supplier;
    private String inputPrice;
    private String outputPrice;
    private String status;
    
    public MaterialDTOResponse(int id, String code, String name, String description, Integer quantity, String supplier, String inputPrice, String outputPrice, String status) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.supplier = supplier;
        this.inputPrice = inputPrice;
        this.outputPrice = outputPrice;
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
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public String getSupplier() {
        return supplier;
    }
    
    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }
    
    public String getInputPrice() {
        return inputPrice;
    }
    
    public void setInputPrice(String inputPrice) {
        this.inputPrice = inputPrice;
    }
    
    public String getOutputPrice() {
        return outputPrice;
    }
    
    public void setOutputPrice(String outputPrice) {
        this.outputPrice = outputPrice;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
}
