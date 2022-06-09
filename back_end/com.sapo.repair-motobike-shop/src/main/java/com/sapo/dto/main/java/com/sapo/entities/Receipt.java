package com.sapo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_receipts")
public class Receipt extends BaseEntity {

    @Column(name = "note", length = 500, nullable = true)
    private String note;

    @Column(name = "status", nullable = true)
    private int status;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
