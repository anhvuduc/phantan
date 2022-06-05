package com.sapo.dto.invoices;

public class InvoiceVehicleResponseDTO {
    private Integer id;
    private String code;
    private String licensePlate;

    public InvoiceVehicleResponseDTO(Integer id, String code, String licensePlate) {
        this.id = id;
        this.code = code;
        this.licensePlate = licensePlate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
}
