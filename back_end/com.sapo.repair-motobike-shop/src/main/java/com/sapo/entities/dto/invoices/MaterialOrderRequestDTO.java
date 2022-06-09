package com.sapo.dto.invoices;

import java.math.BigDecimal;

public class MaterialOrderRequestDTO {
    // id material
    private int id;
    private int materialOrderId;
    private int quantity;

    public MaterialOrderRequestDTO(int id, int materialOrderId, int quantity) {
        this.id = id;
        this.materialOrderId = materialOrderId;
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMaterialOrderId() {
        return materialOrderId;
    }

    public void setMaterialOrderId(int materialOrderId) {
        this.materialOrderId = materialOrderId;
    }

}
