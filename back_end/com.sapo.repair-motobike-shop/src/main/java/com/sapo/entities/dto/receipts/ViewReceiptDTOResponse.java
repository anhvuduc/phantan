package com.sapo.dto.receipts;

import java.util.List;

public class ViewReceiptDTOResponse {
    private int id;
    private String code;
    private String createDate;
    private String note;
    private String total;
    private List<ReceiptMaterialResponseDTO> receiptMaterialResponseDTOs;

    public ViewReceiptDTOResponse(int id, String code, String createDate, String note, String total, List<ReceiptMaterialResponseDTO> receiptMaterialResponseDTOs) {
        this.id = id;
        this.code = code;
        this.createDate = createDate;
        this.note = note;
        this.total = total;
        this.receiptMaterialResponseDTOs = receiptMaterialResponseDTOs;
    }

    public ViewReceiptDTOResponse() {

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

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public List<ReceiptMaterialResponseDTO> getReceiptMaterialResponseDTOs() {
        return receiptMaterialResponseDTOs;
    }

    public void setReceiptMaterialResponseDTOs(List<ReceiptMaterialResponseDTO> receiptMaterialResponseDTOs) {
        this.receiptMaterialResponseDTOs = receiptMaterialResponseDTOs;
    }
}
