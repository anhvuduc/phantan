package com.sapo.entities;

import javax.persistence.*;

@Entity
@Table(name = "tbl_receipt_material")
public class ReceiptMaterial extends BaseEntity {
    @Column(name="quantity", nullable = true)
    private int quantity;

    @Column(name="material_id", nullable = true)
    private int materialId;



    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "receipt_id") // tên field khoá ngoại
    private Receipt receipt;


    public int getQuantity() {
        return quantity;
    }
    
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    public Receipt getReceipt() {
        return receipt;
    }
    
    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
    }

    public int getMaterialId() {
        return materialId;
    }

    public void setMaterialId(int materialId) {
        this.materialId = materialId;
    }

}
