package com.sapo.dto.invoices;

public class InvoiceCustomerVehicleDTO {
    private InvoiceCustomerResponseDTO customerDTO;
    private InvoiceVehicleResponseDTO vehicleDTO;

    public InvoiceCustomerResponseDTO getCustomerDTO() {
        return customerDTO;
    }

    public void setCustomerDTO(InvoiceCustomerResponseDTO customerDTO) {
        this.customerDTO = customerDTO;
    }

    public InvoiceVehicleResponseDTO getVehicleDTO() {
        return vehicleDTO;
    }

    public void setVehicleDTO(InvoiceVehicleResponseDTO vehicleDTO) {
        this.vehicleDTO = vehicleDTO;
    }
}
