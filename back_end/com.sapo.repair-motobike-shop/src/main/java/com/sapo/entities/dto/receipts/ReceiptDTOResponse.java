package com.sapo.dto.receipts;


public class ReceiptDTOResponse {
    private int id;
    private String code;
    private String createDate;
    private String status;
    private String total;
    
    public ReceiptDTOResponse(int id, String code, String createDate, String status, String total) {
        this.id = id;
        this.code = code;
        this.createDate = createDate;
        this.status = status;
        this.total = total;
    }
    
    public ReceiptDTOResponse(int id, String code, String createDate, String status) {
        this.id = id;
        this.code = code;
        this.createDate = createDate;
        this.status = status;
    }
    
    public ReceiptDTOResponse() {
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }
    
    public String getTotal() {
        return total;
    }
    
    public void setTotal(String total) {
        this.total = total;
    }
}
