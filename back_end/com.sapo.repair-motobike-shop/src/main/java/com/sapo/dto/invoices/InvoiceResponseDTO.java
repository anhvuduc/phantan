package com.sapo.dto.invoices;

public class InvoiceResponseDTO {
    private int id;
    private String code;
    private String licensePlate;
    private String fixerName;
    private String status;

    public InvoiceResponseDTO(int id, String code, String licensePlate, String fixerName, String status) {
        this.id = id;
        this.code = code;
        this.licensePlate = licensePlate;
        this.fixerName = fixerName;
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
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
}
