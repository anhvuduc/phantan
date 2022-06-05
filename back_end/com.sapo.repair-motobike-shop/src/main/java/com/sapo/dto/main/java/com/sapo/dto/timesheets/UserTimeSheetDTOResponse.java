package com.sapo.dto.timesheets;

import com.sapo.common.Common;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;

public class UserTimeSheetDTOResponse {
    private int id;
    private String code;
    private String name;
    private int numberShiftsWork;
    private int numberShiftsLateWork;
    private int month;
    private double salary;
    private String status;

    public UserTimeSheetDTOResponse(int id, String code, String name, int numberShiftsWork, int numberShiftsLateWork, int month, double salary, String status) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.numberShiftsWork = numberShiftsWork;
        this.numberShiftsLateWork = numberShiftsLateWork;
        this.month = month;
        this.salary = salary;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumberShiftsWork() {
        return numberShiftsWork;
    }

    public void setNumberShiftsWork(int numberShiftsWork) {
        this.numberShiftsWork = numberShiftsWork;
    }

    public int getNumberShiftsLateWork() {
        return numberShiftsLateWork;
    }

    public void setNumberShiftsLateWork(int numberShiftsLateWork) {
        this.numberShiftsLateWork = numberShiftsLateWork;
    }


    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public String getSalary() {
        String s = Common.getStringPriceVN(salary);
        return s;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
