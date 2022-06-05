package com.sapo.dto.receipts;


import com.sapo.dto.invoices.InvoiceMaterialOrderRequestDTO;

import java.util.List;

public class ReceiptDTORequest {
    private String note;
    private List<MaterialInputRequestDTO> materialDTOS;

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public List<MaterialInputRequestDTO> getMaterialDTOS() {
        return materialDTOS;
    }

    public void setMaterialDTOS(List<MaterialInputRequestDTO> materialDTOS) {
        this.materialDTOS = materialDTOS;
    }
}
