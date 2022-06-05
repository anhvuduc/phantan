package com.sapo.dto.services;

public class ServiceOrderDTO {
    private String code ;
    private int service_id;
    private int invoice_id;

    public ServiceOrderDTO() {
    }

    public ServiceOrderDTO(String code, int service_id, int invoice_id) {
        this.code = code;
        this.service_id = service_id;
        this.invoice_id = invoice_id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getService_id() {
        return service_id;
    }

    public void setService_id(int service_id) {
        this.service_id = service_id;
    }

    public int getInvoice_id() {
        return invoice_id;
    }

    public void setInvoice_id(int invoice_id) {
        this.invoice_id = invoice_id;
    }
}
