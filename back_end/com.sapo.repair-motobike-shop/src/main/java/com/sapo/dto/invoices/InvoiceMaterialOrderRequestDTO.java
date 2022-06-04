package com.sapo.dto.invoices;

public class InvoiceMaterialOrderRequestDTO {
    //id material
    private int id;
    private int quantity;

    public InvoiceMaterialOrderRequestDTO(int id, int quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
