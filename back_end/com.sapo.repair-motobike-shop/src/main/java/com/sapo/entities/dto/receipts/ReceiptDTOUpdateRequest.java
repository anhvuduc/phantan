package com.sapo.dto.receipts;


public class ReceiptDTOUpdateRequest {
    private int status;
    private Integer materialId;
    private int quantityMaterial;
    
    public int getStatus() {
        return status;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }
    
    public Integer getMaterialId() {
        return materialId;
    }
    
    public void setMaterialId(Integer materialId) {
        this.materialId = materialId;
    }
    
    public int getQuantityMaterial() {
        return quantityMaterial;
    }
    
    public void setQuantityMaterial(int quantityMaterial) {
        this.quantityMaterial = quantityMaterial;
    }
}
