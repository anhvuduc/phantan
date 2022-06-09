package com.sapo.dto.invoices;

import java.math.BigDecimal;

public class ServiceOrderResponseDTO {
    //id services
    private int id;
    private int serviceOrderId;
    private String code;
    private String name;
    private String description;
    private BigDecimal price;
    private String status;

    public ServiceOrderResponseDTO(int id, int serviceOrderId, String code, String name, String description, BigDecimal price, String status) {
        this.id = id;
        this.serviceOrderId = serviceOrderId;
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.status = status;
    }

    public int getServiceOrderId() {
        return serviceOrderId;
    }

    public void setServiceOrderId(int serviceOrderId) {
        this.serviceOrderId = serviceOrderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
