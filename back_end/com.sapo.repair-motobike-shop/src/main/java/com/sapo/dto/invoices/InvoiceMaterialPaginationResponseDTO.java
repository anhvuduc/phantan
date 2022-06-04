package com.sapo.dto.invoices;

import com.sapo.dto.common.Pagination;

import java.util.List;

public class InvoiceMaterialPaginationResponseDTO {
    private List<InvoiceMaterialResponseDTO> invoiceMaterialResponseDTOS;
    private Pagination pagination;

    public InvoiceMaterialPaginationResponseDTO(List<InvoiceMaterialResponseDTO> invoiceMaterialResponseDTOS, Pagination pagination) {
        this.invoiceMaterialResponseDTOS = invoiceMaterialResponseDTOS;
        this.pagination = pagination;
    }

    public List<InvoiceMaterialResponseDTO> getInvoiceMaterialResponseDTOS() {
        return invoiceMaterialResponseDTOS;
    }

    public void setInvoiceMaterialResponseDTOS(List<InvoiceMaterialResponseDTO> invoiceMaterialResponseDTOS) {
        this.invoiceMaterialResponseDTOS = invoiceMaterialResponseDTOS;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}
