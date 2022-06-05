package com.sapo.entities;

import javax.persistence.*;

@Entity
@Table(name = "tbl_service_order")
public class    ServiceOrder extends BaseEntity {
    @Column(name = "service_id", length = 50, nullable = true)
    private int serviceId;

    @Column(name = "status",nullable = true)
    private Integer status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "invoice_id") // tên field khoá ngoại
    private Invoice invoice;

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
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
