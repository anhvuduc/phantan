package com.sapo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "tbl_services")
public class Service extends BaseEntity {
    @Column(name = "name", length = 50, nullable = true)
    private String name;

    @Column(name = "description", length = 200, nullable = true)
    private String description;

    @Column(name = "price", nullable = true)
    private BigDecimal price;

    @Column(name = "status", nullable = true)
    private int status;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
