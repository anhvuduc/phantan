package com.sapo.dto.invoices;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

public class InvoiceBuyMaterialRequest {
    @NotNull(message = "Chưa có khách hàng! Xin hãy nhập thông tin khách hàng")
    private Integer customerId;

    private String note;

    private BigDecimal total;

    private int payMethod;

    private List<InvoiceMaterialOrderRequestDTO> materialDTOS;


    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
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
}
