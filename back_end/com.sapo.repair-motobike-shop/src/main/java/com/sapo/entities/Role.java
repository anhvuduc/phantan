package com.sapo.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_roles")
public class Role extends BaseEntity {
    @Column(name = "name", length = 50, nullable = true)
    private String name;

    @Column(name = "description", length = 200, nullable = true)
    private String description;

    @Column(name = "status", nullable = true)
    private int status;

    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "roles")
    private List<User> users = new ArrayList<User>();
    

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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

}
