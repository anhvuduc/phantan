package com.sapo.dto.invoices;

public class ServiceOrderRequestDTO {
    //id service
    private int id;
    private int serviceOrderId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getServiceOrderId() {
        return serviceOrderId;
    }

    public void setServiceOrderId(int serviceOrderId) {
        this.serviceOrderId = serviceOrderId;
    }
}
