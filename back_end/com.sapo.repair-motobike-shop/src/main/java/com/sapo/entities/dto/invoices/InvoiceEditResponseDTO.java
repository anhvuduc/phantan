package com.sapo.dto.invoices;

import java.math.BigDecimal;
import java.util.List;

public class InvoiceEditResponseDTO {
    private int id;
    private String note;
    private int payMethod;
    private BigDecimal total;
    private List<MaterialOrderResponseDTO> materialOrderResponseDTOS;
    private List<ServiceOrderResponseDTO> serviceOrderResponseDTOS;
    private InvoiceCustomerVehicleDTO customerVehicleDTO;
    private InvoiceUserResponseDTO userDTO;
    private String status;

    public InvoiceEditResponseDTO(int id, String note, int payMethod, BigDecimal total, List<MaterialOrderResponseDTO> materialOrderResponseDTOS, List<ServiceOrderResponseDTO> serviceOrderResponseDTOS, InvoiceCustomerVehicleDTO customerVehicleDTO, InvoiceUserResponseDTO userDTO, String status) {
        this.id = id;
        this.note = note;
        this.payMethod = payMethod;
        this.total = total;
        this.materialOrderResponseDTOS = materialOrderResponseDTOS;
        this.serviceOrderResponseDTOS = serviceOrderResponseDTOS;
        this.customerVehicleDTO = customerVehicleDTO;
        this.userDTO = userDTO;
        this.status = status;
    }

    public InvoiceEditResponseDTO() {

    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public int getPayMethod() {
        return payMethod;
    }

    public void setPayMethod(int payMethod) {
        this.payMethod = payMethod;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public List<MaterialOrderResponseDTO> getMaterialOrderResponseDTOS() {
        return materialOrderResponseDTOS;
    }

    public void setMaterialOrderResponseDTOS(List<MaterialOrderResponseDTO> materialOrderResponseDTOS) {
        this.materialOrderResponseDTOS = materialOrderResponseDTOS;
    }

    public List<ServiceOrderResponseDTO> getServiceOrderResponseDTOS() {
        return serviceOrderResponseDTOS;
    }

    public void setServiceOrderResponseDTOS(List<ServiceOrderResponseDTO> serviceOrderResponseDTOS) {
        this.serviceOrderResponseDTOS = serviceOrderResponseDTOS;
    }

    public InvoiceCustomerVehicleDTO getCustomerVehicleDTO() {
        return customerVehicleDTO;
    }

    public void setCustomerVehicleDTO(InvoiceCustomerVehicleDTO customerVehicleDTO) {
        this.customerVehicleDTO = customerVehicleDTO;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public InvoiceUserResponseDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(InvoiceUserResponseDTO userDTO) {
        this.userDTO = userDTO;
    }
}
