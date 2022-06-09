package com.sapo.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_customers")
public class Customer extends BaseEntity {
    @Column(name = "name", length = 50)
    private String name;
    @Column(name = "phone", length = 15)
    private String phone;
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
}
