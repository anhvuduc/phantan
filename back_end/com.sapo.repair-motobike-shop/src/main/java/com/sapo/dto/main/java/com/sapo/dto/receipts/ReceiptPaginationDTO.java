package com.sapo.dto.receipts;


import java.util.List;

public class ReceiptPaginationDTO {
    private List<ReceiptDTOResponse> receiptDTOS;
    private Pagination pagination;

    public ReceiptPaginationDTO(List<ReceiptDTOResponse> receiptDTOS, Pagination pagination) {
        this.receiptDTOS = receiptDTOS;
        this.pagination = pagination;
    }

    public ReceiptPaginationDTO() {
    }

    public List<ReceiptDTOResponse> getReceiptDTOS() {
        return receiptDTOS;
    }

    public void setReceiptDTOS(List<ReceiptDTOResponse> receiptDTOS) {
        this.receiptDTOS = receiptDTOS;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}

