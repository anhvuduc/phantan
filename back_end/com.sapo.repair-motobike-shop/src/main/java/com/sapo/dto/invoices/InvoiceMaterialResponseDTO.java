package com.sapo.dto.invoices;

public class InvoiceMaterialResponseDTO {
    private int id;
    private String code;
    private String licensePlate;
    private String fixerName;
    private String name;
    private String phone;
    private String status;

    public InvoiceMaterialResponseDTO(int id, String code, String licensePlate, String fixerName, String name, String phone, String status) {
        this.id = id;
        this.code = code;
        this.licensePlate = licensePlate;
        this.fixerName = fixerName;
        this.name = name;
        this.phone = phone;
        this.status = status;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getFixerName() {
        return fixerName;
    }

    public void setFixerName(String fixerName) {
        this.fixerName = fixerName;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
