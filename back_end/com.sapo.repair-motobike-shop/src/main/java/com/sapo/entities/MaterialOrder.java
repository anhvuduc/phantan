package com.sapo.entities;

import javax.persistence.*;

@Entity
@Table(name = "tbl_material_order")
public class MaterialOrder extends BaseEntity {
    @Column(name="material_id", nullable = true)
    private int materialId;

    @Column(name="quantity", nullable = true)
    private int quantity;

    @Column(name="status", nullable = true)
    private Integer status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "invoice_id") // tên field khoá ngoại
    private Invoice invoice;

    public int getMaterialId() {
        return materialId;
    }

    public void setMaterialId(int materialId) {
        this.materialId = materialId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
