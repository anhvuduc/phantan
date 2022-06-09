package com.sapo.dto.invoices;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

public class InvoiceAddRequestDTO {
    @NotNull(message = "Chưa có khách hàng! Xin hãy nhập thông tin khách hàng")
    private Integer vehicleId;
    private Integer customerId;
    private Integer fixerId;
    private String note;
    private BigDecimal total;
    private int payMethod;
    private List<InvoiceMaterialOrderRequestDTO> materialDTOS;
    private List<InvoiceServiceOrderRequestDTO> serviceDTOS;

    public InvoiceAddRequestDTO(Integer vehicleId, Integer customerId, Integer fixerId, String note, BigDecimal total, int payMethod, List<InvoiceMaterialOrderRequestDTO> materialDTOS, List<InvoiceServiceOrderRequestDTO> serviceDTOS) {
        this.vehicleId = vehicleId;
        this.customerId = customerId;
        this.fixerId = fixerId;
        this.note = note;
        this.total = total;
        this.payMethod = payMethod;
        this.materialDTOS = materialDTOS;
        this.serviceDTOS = serviceDTOS;
    }

    public Integer getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Integer vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getFixerId() {
        return fixerId;
    }

    public void setFixerId(Integer fixerId) {
        this.fixerId = fixerId;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public int getPayMethod() {
        return payMethod;
    }

    public void setPayMethod(int payMethod) {
        this.payMethod = payMethod;
    }

    public List<InvoiceMaterialOrderRequestDTO> getMaterialDTOS() {
        return materialDTOS;
    }

    public void setMaterialDTOS(List<InvoiceMaterialOrderRequestDTO> materialDTOS) {
        this.materialDTOS = materialDTOS;
    }

    public List<InvoiceServiceOrderRequestDTO> getServiceDTOS() {
        return serviceDTOS;
    }

    public void setServiceDTOS(List<InvoiceServiceOrderRequestDTO> serviceDTOS) {
        this.serviceDTOS = serviceDTOS;
    }
}
