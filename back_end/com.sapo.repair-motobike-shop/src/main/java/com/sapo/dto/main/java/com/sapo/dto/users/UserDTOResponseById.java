package com.sapo.dto.users;

import javax.persistence.Column;

public class UserDTOResponseById {
    private int id;
    private String code;
    private String username;
    private String name;
    private String address;
    private String email;
    private String phone;
    private String salaryDay;
    private int status;
    private String createDate;

    public UserDTOResponseById(int id, String code, String username, String name, String address, String email, String phone, String salaryDay, int status, String createDate) {
        this.id = id;
        this.code = code;
        this.username = username;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.salaryDay = salaryDay;
        this.status = status;
        this.createDate = createDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSalaryDay() {
        return salaryDay;
    }

    public void setSalaryDay(String salaryDay) {
        this.salaryDay = salaryDay;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }
}
