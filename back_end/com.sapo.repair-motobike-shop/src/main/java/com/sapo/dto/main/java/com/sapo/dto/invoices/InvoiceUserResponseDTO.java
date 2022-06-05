package com.sapo.dto.invoices;

public class InvoiceUserResponseDTO {
    private int id;
    private String code;
    private String phone;
    private String name;

    public InvoiceUserResponseDTO(int id, String code, String phone, String name) {
        this.id = id;
        this.code = code;
        this.phone = phone;
        this.name = name;
    }

    public InvoiceUserResponseDTO() {

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
